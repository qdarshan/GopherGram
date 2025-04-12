package database

import (
	"database/sql"
)

type PostRepository struct {
	db *sql.DB
}

func NewPostRepository(db *sql.DB) *PostRepository {
	return &PostRepository{db: db}
}

// func (r *PostRepository) CreatePost(post *models.Post) error {
// 	tx, err := r.db.Begin()
// 	if err != nil {
// 		return fmt.Errorf("beginning transaction: %w", err)
// 	}

// 	INSERT_POST_SQL := `
// 		INSERT INTO posts (user_id, title, content, visibility) VALUES ($1, $2, $3, $4)
// 	`

// }
