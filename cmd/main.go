package main

import (
	"fmt"
	"os"

	"github.com/qdarshan/GopherGram/internal/client"
	"github.com/qdarshan/GopherGram/internal/server"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please specify 'server' or 'client' as an argument")
		fmt.Println("Example: go run . server")
		os.Exit(1)
	}

	mode := os.Args[1]
	switch mode {
	case "server":
		fmt.Println("Starting GopherGram server...")
		server.Server()
	case "client":
		fmt.Println("Starting GopherGram client...")
		client.Client()
	default:
		fmt.Println("Unknown mode. Use 'server' or 'client'")
	}
}
