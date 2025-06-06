package database

import (
	"database/sql"
	"fmt"
	"log/slog"

	_ "github.com/lib/pq"
	"github.com/spf13/viper"
)

var DB *sql.DB

func ConnectDB() error {
	host := viper.GetString("DB_HOST")
	port := viper.GetString("DB_PORT")
	user := viper.GetString("DB_USER")
	password := viper.GetString("DB_PASSWORD")
	dbname := viper.GetString("DATABASE")

	psqlconn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	if err != nil {
		slog.Error("Error opening connection to db", "error", err)
		return fmt.Errorf("opening connection to db: %w", err)
	}

	err = db.Ping()
	if err != nil {
		slog.Error("Error pinging the db", "error", err)
		return fmt.Errorf("pinging the db: %w", err)
	}
	DB = db
	fmt.Println("Successfully connected to PostgreSQL!")
	return nil
}

func InitializeSchema() error {
	CREATE_USER_TABLE_SQL := `
		CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			username VARCHAR(50) UNIQUE NOT NULL,
			password TEXT NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS user_profiles (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			user_id UUID UNIQUE NOT NULL REFERENCES users(id),
			name VARCHAR(50),
			email VARCHAR(50) UNIQUE,
			bio TEXT,
			date_of_birth DATE
		);

		CREATE TABLE IF NOT EXISTS posts (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			user_id UUID NOT NULL REFERENCES users(id),
			title TEXT,
			content TEXT,
			visibility VARCHAR(10),
			upvote INTEGER DEFAULT 0,
			downvote INTEGER DEFAULT 0,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS votes (
			user_id UUID NOT NULL REFERENCES users(id),
			post_id UUID NOT NULL REFERENCES posts(id),
			vote_type VARCHAR(10) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (user_id, post_id)
		);
	`

	_, err := DB.Exec(CREATE_USER_TABLE_SQL)
	if err != nil {
		slog.Error("Error creating users table", "error", err)
		return fmt.Errorf("creating users table: %w", err)
	}
	return nil
}
