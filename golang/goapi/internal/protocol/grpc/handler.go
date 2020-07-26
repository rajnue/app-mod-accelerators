package grpc

import (
	"context"
	"log"
	"net"
	"os"
	"os/signal"

	v1 "github.com/Neudesic/NeuService/pkg/api/neuservice/v1"
	"google.golang.org/grpc"
)

// RunServer - Runs the grpc protocol server
func RunServer(ctx context.Context, V1API v1.NeuServiceServer, port string) error {
	listen, err := net.Listen("tcp", ":"+port)

	if err != nil {
		return err
	}

	// register service
	server := grpc.NewServer()
	v1.RegisterNeuServiceServer(server, V1API)

	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for range c {
			// sig is a ^C, handle it
			log.Println("shutting down gRPC server...")

			server.GracefulStop()

			<-ctx.Done()
		}
	}()

	// start gRPC server
	log.Printf("starting gRPC server on port %s... \n", port)
	return server.Serve(listen)
}
