package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/qdarshan/GopherGram/internal/bootstrap"
	"github.com/qdarshan/GopherGram/internal/server"
)

func main() {

	app, err := bootstrap.Bootstrap(".")
	if err != nil {
		slog.Error("Failed to bootstrap application", "error", err)
		os.Exit(1)
	}
	defer func() {
		if err := app.Close(); err != nil {
			os.Exit(1)
		}
	}()

	srv := server.NewServer("", app.Router)
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	go func() {
		if err := srv.Start(); err != nil {
			os.Exit(1)
		}
	}()

	<-ctx.Done()
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("Server shutdown failed", "error", err)
		os.Exit(1)
	}
}
