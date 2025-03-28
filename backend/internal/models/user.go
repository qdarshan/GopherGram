package models

import "time"

type User struct {
	Id        string    `db:"id"`
	Username  string    `db:"username"`
	Password  string    `db:"password"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type UserProfile struct {
	Id          string `db:"id"`
	UserId      string `db:"user_id"`
	Email       string `db:"email"`
	Name        string `db:"name"`
	DateOfBirth string `db:"date_of_birth"`
	Bio         string `db:"bio"`
}
