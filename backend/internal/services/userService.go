package services

import (
	"context"
	"errors"
	"fmt"
	"log/slog"

	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/util"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	userRepository *database.UserRepository
}

func NewUserService(repository *database.UserRepository) *UserService {
	return &UserService{userRepository: repository}
}

func (us *UserService) CreateUser(ctx context.Context, user *models.User, profile *models.UserProfile) error {
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "service"),
		slog.String("method", "services.CreateUser"),
	)
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		logger.Error("failed to hash password", "error", err)
		return fmt.Errorf("hashing password: %w", err)
	}

	user.Password = hashedPassword
	if err := us.userRepository.CreateUser(ctx, user, profile); err != nil {
		return fmt.Errorf("creating user in database: %w", err)
	}

	return nil
}

func (us *UserService) VerifyUser(ctx context.Context, user models.User) (bool, *models.User, error) {
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "service"),
		slog.String("method", "services.VerifyUser"),
		slog.String("username", user.Username),
	)
	// defer util.LogFnDuration(logger, time.Now())
	logger.Debug("verifying user credentials")
	dbUser, err := us.userRepository.GetUserByUsername(ctx, user.Username)
	if err != nil {
		if errors.Is(err, database.ErrNotFound) {
			logger.Warn("user not found during verification")
			return false, nil, nil
		}
		logger.Error("failed to get user by username during verification", "error", err)
		return false, nil, fmt.Errorf("database error during verification: %w", err)
	}

	if verifyPassword(user.Password, dbUser.Password) {
		logger.Info("user verified")
		return true, &dbUser, nil
	}
	logger.Warn("Password mismatch")
	return false, nil, nil
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func verifyPassword(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
