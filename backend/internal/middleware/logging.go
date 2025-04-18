package middleware

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/qdarshan/GopherGram/internal/util"
	"github.com/spf13/viper"
)

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		transactionId := uuid.New().String()
		w.Header().Set("X-Transaction-ID", transactionId)

		jsonLogHandler := slog.NewJSONHandler(os.Stdout, nil)
		requestLogger := slog.New(jsonLogHandler).With(
			slog.String("transactionId", transactionId),
			slog.String("service", "gopherGram"),
			slog.String("version", viper.GetString("VERSION")),
		)

		ctx := context.WithValue(r.Context(), util.TransactionIDKey, transactionId)
		ctx = context.WithValue(ctx, util.LoggerKey, requestLogger)

		r = r.WithContext(ctx)
		lrw := &loggingResponseWriter{w, http.StatusOK}
		next.ServeHTTP(lrw, r)
		duration := time.Since(start).Milliseconds()

		logger := util.LoggerFromContext(r.Context())
		logger.Info("request",
			"path", r.URL.Path,
			"httpMethod", r.Method,
			"status", lrw.statusCode,
			"duration", duration,
		)
	})
}
