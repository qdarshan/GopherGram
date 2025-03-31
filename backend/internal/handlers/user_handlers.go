package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"log"

	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/middleware"
	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/services"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Method not allowed"})
		return
	}

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

	userRepo := database.NewUserRepository(database.DB)
	userService := services.NewUserService(userRepo)

	err = userService.CreateUser(&user, &profile)
	if err != nil {
		log.Printf("Error creating user: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to create user"})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	tkn, _ := middleware.GenerateToken("1", "test")
	fmt.Fprintf(w, "login handler: "+tkn)
}
