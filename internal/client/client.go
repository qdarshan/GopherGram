package client

import (
	"fmt"
	"log"
	"net"
)

func Client() {
	conn, err := net.Dial("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	go handleReceive(conn)
	handleSend(conn)
}

func handleReceive(conn net.Conn) {
	buffer := make([]byte, 1024)
	n, err := conn.Read(buffer)
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println("Received data:", string(buffer[:n]))
}

func handleSend(conn net.Conn) {
	messages := []string{
		"user1: Hello from client!",
		"user1: How's it going?",
		"user1: Bye for now.",
	}

	for _, msg := range messages {
		_, err := conn.Write([]byte(msg + "\n")) // Added newline delimiter
		if err != nil {
			log.Fatal(err)
			return
		}
		fmt.Println("Sent:", msg)

		buffer := make([]byte, 1024)
		n, err := conn.Read(buffer)
		if err != nil {
			log.Fatal(err)
			return
		}
		fmt.Println("Received from server:", string(buffer[:n]))
	}
}
