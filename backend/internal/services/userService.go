package services

import (
	"fmt"

	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/models"
	"golang.org/x/crypto/bcrypt"
)

type UserServie struct {
	userRepository *database.UserRepository
}

func NewUserService(userRepository *database.UserRepository) *UserServie {
	return &UserServie{userRepository: userRepository}
}

func (us *UserServie) CreateUser(user *models.User, profile *models.UserProfile) error {
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		return fmt.Errorf("hashing password: %w", err)
	}
	user.Password = hashedPassword

	if err := us.userRepository.CreateUser(user, profile); err != nil {
		return fmt.Errorf("creating user in database: %w", err)
	}

	return nil
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func VerifyPassword(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
