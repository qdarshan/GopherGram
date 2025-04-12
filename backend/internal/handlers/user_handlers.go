package handlers

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/qdarshan/GopherGram/internal/middleware"
	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/services"
	"github.com/qdarshan/GopherGram/internal/util"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "handler"),
		slog.String("method", "handlers.CreateUserHandler"),
	)
	var requestData struct {
		Username    string `json:"username"`
		Password    string `json:"password"`
		Email       string `json:"email"`
		Name        string `json:"name"`
		DateOfBirth string `json:"date_of_birth"`
		Bio         string `json:"bio"`
	}

	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		logger.Error("Error decoding request body", "error", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	var user models.User
	var profile models.UserProfile

	user.Username = requestData.Username
	user.Password = requestData.Password
	profile.Name = requestData.Name
	profile.Email = requestData.Email
	profile.Bio = requestData.Bio
	profile.DateOfBirth = requestData.DateOfBirth

	userService := services.NewUserService()

	err = userService.CreateUser(ctx, &user, &profile)
	if err != nil {
		logger.Error("Error creating user", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to create user"})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "handler"),
		slog.String("method", "handlers.LoginHandler"),
	)
	// defer util.LogFnDuration(logger, time.Now())

	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	userService := services.NewUserService()
	isValid, loggedInUser, err := userService.VerifyUser(ctx, user)
	if err != nil {
		logger.Error("Login verification error", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	if !isValid {
		logger.Warn("Invalid login attempt", "user", user.Username)
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	} else {
		logger.Info("user logged in successfully", "user", loggedInUser.Username, "userId", loggedInUser.Id)
		tkn, err := middleware.GenerateToken(loggedInUser.Id, loggedInUser.Username)

		if err != nil {
			logger.Error("Error generating token", "error", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": tkn})
	}
}
