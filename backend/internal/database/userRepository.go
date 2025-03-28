package database

import (
	"database/sql"
	"fmt"

	"github.com/qdarshan/GopherGram/internal/models"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (userRepository *UserRepository) CreateUser(user *models.User, profile *models.UserProfile) error {
	tx, err := userRepository.db.Begin()
	if err != nil {
		return fmt.Errorf("beginning transaction: %w", err)
	}

	INSERT_USER_SQL := `
		INSERT INTO users (username, password) VALUES ($1, $2)
		RETURNING id
	`

	var userId string
	err = tx.QueryRow(INSERT_USER_SQL, user.Username, user.Password).Scan(&userId)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("inserting user: %w", err)
	}
	user.Id = userId

	INSERT_USER_PROFILE_SQL := `
		INSERT INTO user_profiles (user_id, name, email, bio, date_of_birth) VALUES ($1, $2, $3, $4, $5);
	`
	_, err = tx.Exec(INSERT_USER_PROFILE_SQL, userId, profile.Name, profile.Email, profile.Bio, profile.DateOfBirth)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("inserting user profile: %w", err)
	}
	profile.UserId = userId

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("committing transaction: %w", err)
	}
	return nil
}
