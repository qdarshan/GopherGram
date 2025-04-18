package services

import "github.com/qdarshan/GopherGram/internal/database"

type PostService struct {
	postRepository *database.PostRepository
}

func NewPostService(repository *database.PostRepository) *PostService {
	return &PostService{postRepository: repository}
}
