package models

import "time"

type Post struct {
	Id         string    `db:"id"`
	Owner      string    `db:"user_id"`
	Title      string    `db:"title"`
	Content    string    `db:"content"`
	Visibility string    `db:"visibility"`
	Upvote     int       `db:"upvote"`
	Downvote   int       `db:"downvote"`
	CreatedAt  time.Time `db:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"`
}
