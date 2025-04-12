package util

import (
	"context"
	"log/slog"
	"time"
)

type contextKey string

const TransactionIDKey = contextKey("transactionID")
const LoggerKey = contextKey("logger")
const UserIdKey = contextKey("userID")
const UsernameKey = contextKey("username")

func LoggerFromContext(ctx context.Context) *slog.Logger {
	logger, ok := ctx.Value(LoggerKey).(*slog.Logger)
	if !ok {
		return slog.Default()
	}
	return logger
}

func LogFnDuration(logger *slog.Logger, startTime time.Time) {
	duration := time.Since(startTime).Milliseconds()
	logger.Info("completed",
		"duration", duration,
	)
}
