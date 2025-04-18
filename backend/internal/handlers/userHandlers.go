package handlers

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/middleware"
	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/services"
	"github.com/qdarshan/GopherGram/internal/util"
)

type UserHandler struct {
	userService *services.UserService
}

func NewUserHandler(userService *services.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (uh *UserHandler) CreateUserHandler(w http.ResponseWriter, r *http.Request) {

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
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Invalid request body"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}

	if req.Username == "" || req.Password == "" {
		logger.Warn("Missing required fields")
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Username and password are required"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}
	if len(req.Username) < 3 || len(req.Username) > 50 {
		logger.Warn("Invalid username length", "username", req.Username)
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Username must be 3-50 characters"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}
	if len(req.Password) < 6 {
		logger.Warn("Password too short")
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Password must be at least 6 characters"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}
	if req.Email != "" && !strings.Contains(req.Email, "@") {
		logger.Warn("Invalid email format", "email", req.Email)
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Invalid email format"), logger)
		util.LogFnDuration(logger, startTime)
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

	if err := uh.userService.CreateUser(ctx, user, profile); err != nil {
		var duplicateErr *database.ErrDuplicateEntry
		if errors.As(err, &duplicateErr) {
			logger.Warn("Duplicate entry conflict", "field", duplicateErr.Field, "value", duplicateErr.Value, "error", err)
			WriteJSON(w, http.StatusConflict, NewErrorResponse(duplicateErr.Error()), logger)
		} else {
			logger.Error("Failed to create user due to internal error", "username", req.Username, "error", err)
			WriteJSON(w, http.StatusInternalServerError, NewErrorResponse("An internal error occurred. Please try again later."), logger)
		}
		util.LogFnDuration(logger, startTime)
		return
	}

	logger.Info("User created", "username", req.Username)
	createdUserData := map[string]string{
		"id":       user.Id,
		"username": user.Username,
	}
	WriteJSON(w, http.StatusCreated, NewSuccessResponse("User created successfully", "", createdUserData), logger)
	util.LogFnDuration(logger, startTime)
}

func (uh *UserHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()

	ctx := r.Context()
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "handler"),
		slog.String("method", "handlers.LoginHandler"),
	)

	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		logger.Warn("Invalid request body", "error", err)
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Invalid request body"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}

	if user.Username == "" || user.Password == "" {
		logger.Warn("Missing required fields")
		WriteJSON(w, http.StatusBadRequest, NewErrorResponse("Username and password are required"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}

	isValid, loggedInUser, err := uh.userService.VerifyUser(ctx, user)
	if err != nil {
		logger.Error("Failed to verify user", "username", user.Username, "error", err)
		WriteJSON(w, http.StatusInternalServerError, NewErrorResponse("Internal server error"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}

	if !isValid || loggedInUser == nil {
		logger.Warn("Invalid login attempt", "username", user.Username)
		WriteJSON(w, http.StatusUnauthorized, NewErrorResponse("Invalid username or password"), logger)
		util.LogFnDuration(logger, startTime)
		return
	}

	tkn, err := middleware.GenerateToken(loggedInUser.Id, loggedInUser.Username)

	if err != nil {
		logger.Error("Failed to generate token", "username", user.Username, "error", err)
		WriteJSON(w, http.StatusInternalServerError, NewErrorResponse("Failed to generate token"), logger)
		return
	}
	logger.Info("user logged in successfully", "user", loggedInUser.Username, "userId", loggedInUser.Id)
	WriteJSON(w, http.StatusOK, NewSuccessResponse(
		"Login successful",
		tkn,
		nil,
	), logger)

	util.LogFnDuration(logger, startTime)

}

func (uh *UserHandler) GetUserPostsHandler(w http.ResponseWriter, r *http.Request) {

}
func (uh *UserHandler) GetUserProfileHandler(w http.ResponseWriter, r *http.Request) {

}
