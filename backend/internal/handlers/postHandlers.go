package handlers

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/qdarshan/GopherGram/internal/services"
)

type PostHandler struct {
	postService *services.PostService
}

func NewPostHandler(postService *services.PostService) *PostHandler {
	return &PostHandler{postService: postService}
}

func (ph *PostHandler) HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "welcome to the home feed")
}

func (ph *PostHandler) ComposePostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "compose your posts")
	slog.Error("Failed to save post")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(map[string]string{"error": "Failed to save post"})
}

func (ph *PostHandler) DeletePostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprintf(w, "delete your post: "+id)
}

func (ph *PostHandler) EditPostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprintf(w, "edit your post: "+id)
}

func (ph *PostHandler) ProfileHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	fmt.Fprintf(w, "username: "+username)
}

func (ph *PostHandler) ViewPostHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	id := r.PathValue("id")
	fmt.Fprintf(w, "view post username: "+username+" id: "+id)
}

func (ph *PostHandler) VoteHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	id := r.PathValue("id")
	fmt.Fprintf(w, "upvote username: "+username+" id: "+id)
}
