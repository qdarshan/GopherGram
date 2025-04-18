package bootstrap

import (
	"database/sql"
	"log/slog"

	"github.com/go-chi/chi/v5"
	"github.com/qdarshan/GopherGram/internal/config"
	"github.com/qdarshan/GopherGram/internal/database"
	"github.com/qdarshan/GopherGram/internal/handlers"
	"github.com/qdarshan/GopherGram/internal/server"
	"github.com/qdarshan/GopherGram/internal/services"
)

type App struct {
	DB          *sql.DB
	Router      *chi.Mux
	UserHandler *handlers.UserHandler
	PostHandler *handlers.PostHandler
}

func Bootstrap(configPath string) (*App, error) {
	if err := config.InitConfigPath(configPath); err != nil {
		slog.Error("Failed to initialize config", "error", err)
		return nil, err
	}

	if err := database.ConnectDB(); err != nil {
		slog.Error("Failed to connect to database", "error", err)
		return nil, err
	}
	if err := database.InitializeSchema(); err != nil {
		slog.Error("Failed to initialize schema", "error", err)
		return nil, err
	}

	userRepo := database.NewUserRepository(database.DB)
	postRepo := database.NewPostRepository(database.DB)

	userService := services.NewUserService(userRepo)
	postService := services.NewPostService(postRepo)

	userHandler := handlers.NewUserHandler(userService)
	postHandler := handlers.NewPostHandler(postService)

	handlers := &server.Handlers{
		UserHandler: userHandler,
		PostHandler: postHandler,
	}
	router := server.NewRouter(handlers)

	return &App{
		DB:          database.DB,
		Router:      router,
		UserHandler: userHandler,
		PostHandler: postHandler,
	}, nil
}

func (app *App) Close() error {
	if app.DB != nil {
		if err := app.DB.Close(); err != nil {
			slog.Error("Failed to close database connection", "error", err)
			return err
		}
		slog.Info("Database connection closed")
	}
	return nil
}
