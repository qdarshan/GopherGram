package models

import "time"

type Vote struct {
	UserID    string    `db:"user_id"`
	PostID    string    `db:"post_id"`
	VoteType  string    `db:"vote_type"`
	CreatedAt time.Time `db:"created_at"`
}
