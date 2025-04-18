package server

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/spf13/viper"
)

type Server struct {
	httpServer *http.Server
}

func NewServer(port string, handler http.Handler) *Server {
	if port == "" {
		port = viper.GetString("PORT") // Default port
	} else if port[0] != ':' {
		port = ":" + port
	}
	return &Server{
		httpServer: &http.Server{
			Addr:    port,
			Handler: handler,
		},
	}
}

func (s *Server) Start() error {
	fmt.Println("Starting server on", s.httpServer.Addr)
	if err := s.httpServer.ListenAndServe(); err != http.ErrServerClosed {
		slog.Error("Server stopped", "error", err)
		return err
	}
	return nil
}

func (s *Server) Shutdown(ctx context.Context) error {
	fmt.Println("\nShutting down server...")
	if err := s.httpServer.Shutdown(ctx); err != nil {
		slog.Error("Server forced to shutdown", "error", err)
		return err
	}
	fmt.Println("Shutdown complete")
	return nil
}
