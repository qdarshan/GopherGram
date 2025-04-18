package config

import (
	"log/slog"

	"github.com/spf13/viper"
)

func InitConfigPath(path string) error {
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")
	viper.SetConfigType("env")
	if err := viper.ReadInConfig(); err != nil {
		slog.Error("Failed to read config file", "error", err)
		return err
	}
	slog.Info("Config file loaded", "path", viper.ConfigFileUsed())
	return nil
}
