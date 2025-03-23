package server

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

func Server() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
			return
		}

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	reader := bufio.NewReader(conn)
	for {
		message, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Connection closed by client")
			return
		}
		fmt.Printf("Message received: %s", message)

		_, err = conn.Write([]byte("Server received: " + message))
		if err != nil {
			fmt.Println("Error sending response")
			return
		}
	}
}
