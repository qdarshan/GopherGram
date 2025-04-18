package util

import (
	"github.com/spf13/viper"
)

func InitConfigPath(path string) {
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")
	viper.SetConfigType("env")
	viper.ReadInConfig()
}
