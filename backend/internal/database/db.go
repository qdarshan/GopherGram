package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var DB *sql.DB

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "gophergram"
)

func ConnectDB() error {
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	CheckError("Error opening connection to db", err)
	err = db.Ping()
	CheckError("Error pinging the db", err)
	DB = db
	fmt.Println("Successfully connected to PostgreSQL!")
	return nil
}

func CheckError(msg string, err error) error {
	if err != nil {
		return fmt.Errorf("%s:%w", msg, err)
	}
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
	CheckError("Error creating users table", err)
	return nil
}
