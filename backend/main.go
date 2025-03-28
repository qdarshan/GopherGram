package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/handlers"
)

func main() {
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

	http.HandleFunc("/home", handlers.HomeHandler)
	http.HandleFunc("/compose/post", handlers.ComposePostHandler)
	http.HandleFunc("/delete/{id}", handlers.DeletePostHandler)
	http.HandleFunc("/edit/{id}", handlers.EditPostHandler)
	http.HandleFunc("/{username}", handlers.ProfileHandler)
	http.HandleFunc("/{username}/status/{id}", handlers.ViewPostHandler)
	http.HandleFunc("/{username}/upvote/{id}", handlers.UpvoteHandler)
	http.HandleFunc("/{username}/downvote/{id}", handlers.DownvoteHandler)
	http.HandleFunc("/user/add", handlers.CreateUserHandler)

	fmt.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("HTTP server ListenAndServe: %v", err)
	}
}
