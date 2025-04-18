package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-chi/chi/v5"
	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/handlers"
	"github.com/qdarshan/GopherGram/internal/middleware"
	"github.com/qdarshan/GopherGram/internal/util"
)

func main() {
	util.InitConfigPath(".")

	err := database.ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	err = database.InitializeSchema()
	if err != nil {
		log.Fatalf("Failed to initialize schema: %v", err)
	}

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		fmt.Printf("Received signal: %v. Closing database connection...\n", sig)
		if err := database.DB.Close(); err != nil {
			log.Printf("Error closing database connection: %v", err)
		} else {
			fmt.Println("Database connection closed.")
		}
		os.Exit(0)
	}()

	r := chi.NewRouter()
	r.Use(middleware.LoggingMiddleware)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Route("/api/v1/users", func(r chi.Router) {
		r.Post("/register", handlers.CreateUserHandler)
		r.Post("/login", handlers.LoginHandler)
	})

	r.Get("/home", handlers.HomeHandler)
	r.With(middleware.JWTMiddleware).Post("/compose/post", handlers.ComposePostHandler)
	r.Delete("/delete/{id}", handlers.DeletePostHandler)
	r.Put("/edit/{id}", handlers.EditPostHandler)
	r.Get("/{username}", handlers.ProfileHandler)
	r.Get("/{username}/status/{id}", handlers.ViewPostHandler)
	r.Post("/{username}/upvote/{id}", handlers.UpvoteHandler)
	r.Post("/{username}/downvote/{id}", handlers.DownvoteHandler)

	fmt.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("HTTP server ListenAndServe: %v", err)
	}
}
