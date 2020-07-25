package main

import (
	"fmt"
	"os"

	"github.com/Neudesic/NeuService/internal/server"
)

func main() {
	if err := server.RunServer(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}
