package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/qdarshan/GopherGram/internal/handlers"
	"github.com/qdarshan/GopherGram/internal/middleware"
)

type Handlers struct {
	UserHandler *handlers.UserHandler
	PostHandler *handlers.PostHandler
}

func NewRouter(h *Handlers) *chi.Mux {

	r := chi.NewRouter()
	r.Use(middleware.LoggingMiddleware)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Route("/api/v1/users", func(r chi.Router) {
		r.Post("/register", h.UserHandler.CreateUserHandler)
		r.Post("/login", h.UserHandler.LoginHandler)
		r.Get("/{username}", h.UserHandler.GetUserProfileHandler)
		r.Get("/{username}/posts", h.UserHandler.GetUserPostsHandler)
	})

	r.Route("/api/v1/posts", func(r chi.Router) {
		r.With(middleware.JWTMiddleware).Post("/", h.PostHandler.ComposePostHandler)
		r.Get("/", h.PostHandler.HomeHandler)
		r.Get("/{postID}", h.PostHandler.ViewPostHandler)
		r.With(middleware.JWTMiddleware).Put("/{postID}", h.PostHandler.EditPostHandler)
		r.With(middleware.JWTMiddleware).Delete("/{postID}", h.PostHandler.DeletePostHandler)
		r.With(middleware.JWTMiddleware).Post("/{postID}/vote", h.PostHandler.VoteHandler)
	})

	return r
}
