package handlers

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/qdarshan/GopherGram/internal/middleware"
	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/services"
	"github.com/qdarshan/GopherGram/internal/util"
)

type errorResponse struct {
	Error string `json:"error"`
}

type successResponse struct {
	Message string `json:"message,omitempty"`
	Token   string `json:"token,omitempty"`
}

func writeJSON(w http.ResponseWriter, status int, data any, logger *slog.Logger) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		logger.Error("Failed to encode JSON response", "error", err)
	}
}

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "handler"),
		slog.String("method", "handlers.CreateUserHandler"),
	)
	startTime := time.Now()

	var req struct {
		Username    string `json:"username"`
		Password    string `json:"password"`
		Email       string `json:"email"`
		Name        string `json:"name"`
		DateOfBirth string `json:"date_of_birth"`
		Bio         string `json:"bio"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		logger.Warn("Invalid request body", "error", err)
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Invalid request body"}, logger)
		return
	}

	if req.Username == "" || req.Password == "" {
		logger.Warn("Missing required fields")
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Username and password are required"}, logger)
		return
	}
	if len(req.Username) < 3 || len(req.Username) > 50 {
		logger.Warn("Invalid username length", "username", req.Username)
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Username must be 3-50 characters"}, logger)
		return
	}
	if len(req.Password) < 6 {
		logger.Warn("Password too short")
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Password must be at least 6 characters"}, logger)
		return
	}
	if req.Email != "" && !strings.Contains(req.Email, "@") {
		logger.Warn("Invalid email format", "email", req.Email)
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Invalid email format"}, logger)
		return
	}

	user := &models.User{
		Username: req.Username,
		Password: req.Password,
	}

	profile := &models.UserProfile{
		Name:        req.Name,
		Email:       req.Email,
		Bio:         req.Bio,
		DateOfBirth: req.DateOfBirth,
	}

	userService := services.NewUserService()

	if err := userService.CreateUser(ctx, user, profile); err != nil {
		logger.Error("Failed to create user", "username", req.Username, "error", err)
		writeJSON(w, http.StatusInternalServerError, errorResponse{Error: "Failed to create user"}, logger)
		return
	}

	logger.Info("User created", "username", req.Username)
	writeJSON(w, http.StatusCreated, successResponse{Message: "User created successfully"}, logger)

	util.LogFnDuration(logger, startTime)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()
	ctx := r.Context()
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "handler"),
		slog.String("method", "handlers.LoginHandler"),
	)

	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		logger.Warn("Invalid request body", "error", err)
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Invalid request body"}, logger)
		return
	}

	if user.Username == "" || user.Password == "" {
		logger.Warn("Missing required fields")
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Username and password are required"}, logger)
	}

	userService := services.NewUserService()
	isValid, loggedInUser, err := userService.VerifyUser(ctx, user)
	if err != nil {
		logger.Error("Failed to verify user", "username", user.Username, "error", err)
		writeJSON(w, http.StatusInternalServerError, errorResponse{Error: "Internal server error"}, logger)
		return
	}

	if !isValid || loggedInUser == nil {
		logger.Warn("Invalid login attempt", "username", user.Username)
		writeJSON(w, http.StatusUnauthorized, errorResponse{Error: "Invalid username or password"}, logger)
		return
	}

	tkn, err := middleware.GenerateToken(loggedInUser.Id, loggedInUser.Username)

	if err != nil {
		logger.Error("Failed to generate token", "username", user.Username, "error", err)
		writeJSON(w, http.StatusInternalServerError, errorResponse{Error: "Failed to generate token"}, logger)
		return
	}
	logger.Info("user logged in successfully", "user", loggedInUser.Username, "userId", loggedInUser.Id)
	writeJSON(w, http.StatusOK, successResponse{
		Message: "Login successful",
		Token:   tkn,
	}, logger)

	util.LogFnDuration(logger, startTime)

}
