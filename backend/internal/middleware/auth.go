package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/qdarshan/GopherGram/internal/util"
	"github.com/spf13/viper"
)

type Claims struct {
	UserId   string `json:"user_id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func GenerateToken(userId string, username string) (string, error) {
	var jwtSecret = []byte(viper.GetString("JWT_SECRET"))
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		UserId:   userId,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			Issuer:    "GopherGram",
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   username,
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func JWTMiddleware(next http.Handler) http.Handler {
	var jwtSecret = []byte(viper.GetString("JWT_SECRET"))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || strings.ToLower(tokenParts[0]) != "bearer" {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}

		tokenString := tokenParts[1]

		claims := &Claims{}
		tkn, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
			}

			return jwtSecret, nil
		})

		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if !tkn.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		fmt.Printf("Authenticated User ID: %s, Username: %s\n", claims.UserId, claims.Username)

		ctx := context.WithValue(r.Context(), util.UserIdKey, claims.UserId)
		ctx = context.WithValue(ctx, util.UsernameKey, claims.Username)
		next.ServeHTTP(w, r.WithContext(ctx))

	})
}
