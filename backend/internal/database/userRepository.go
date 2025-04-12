package database

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"

	"github.com/qdarshan/GopherGram/internal/models"
	"github.com/qdarshan/GopherGram/internal/util"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (userRepository *UserRepository) CreateUser(ctx context.Context, user *models.User, profile *models.UserProfile) error {
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "data"),
		slog.String("method", "database.CreateUser"),
	)
	tx, err := userRepository.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("beginning transaction: %w", err)
	}
	defer tx.Rollback()

	INSERT_USER_SQL := `
		INSERT INTO users (username, password) VALUES ($1, $2)
		RETURNING id
	`

	var userId string
	err = tx.QueryRowContext(ctx, INSERT_USER_SQL, user.Username, user.Password).Scan(&userId)
	if err != nil {
		logger.Error("Failed to insert user", "error", err)
		return fmt.Errorf("inserting user: %w", err)
	}
	user.Id = userId
	logger.Debug("User inserted", "userId", userId, "username", user.Username)

	INSERT_USER_PROFILE_SQL := `
		INSERT INTO user_profiles (user_id, name, email, bio, date_of_birth) VALUES ($1, $2, $3, $4, $5);
	`
	_, err = tx.ExecContext(ctx, INSERT_USER_PROFILE_SQL, userId, profile.Name, profile.Email, profile.Bio, profile.DateOfBirth)
	if err != nil {
		logger.Error("Failed to insert user profile", "error", err)
		return fmt.Errorf("inserting user profile: %w", err)
	}
	profile.UserId = userId
	logger.Debug("User profile inserted", "userId", userId)

	if err := tx.Commit(); err != nil {
		logger.Error("Failed to commit transaction", "error", err)
		return fmt.Errorf("committing transaction: %w", err)
	}
	return nil
}

func (userRepository *UserRepository) GetUserByUsername(ctx context.Context, username string) (models.User, error) {
	logger := util.LoggerFromContext(ctx).With(
		slog.String("category", "data"),
		slog.String("method", "database.GetUserByUsername"),
		slog.String("username", username),
	)
	// defer util.LogFnDuration(logger, time.Now())

	SELECT_USER_SQL := `SELECT id, username, password FROM users WHERE username = $1`
	var user models.User
	err := userRepository.db.QueryRowContext(ctx, SELECT_USER_SQL, username).Scan(&user.Id, &user.Username, &user.Password)
	if err != nil {
		logger.Debug("Failed to select user", "error", err)
		return models.User{}, err
	}

	logger.Info("User retrieved successfully")
	return user, nil
}
