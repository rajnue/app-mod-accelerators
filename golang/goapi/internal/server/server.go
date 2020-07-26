package server

import (
	"context"

	"github.com/Neudesic/NeuService/internal/config"
	"github.com/Neudesic/NeuService/internal/protocol/grpc"
	"github.com/Neudesic/NeuService/internal/protocol/rest"
	v1 "github.com/Neudesic/NeuService/internal/service/neuservice/v1"
	"github.com/Neudesic/NeuService/internal/service/neuservice/v1/factory"
	"github.com/Neudesic/NeuService/internal/service/neuservice/v1/interfaces"
	"github.com/Neudesic/NeuService/internal/service/neuservice/v1/interfaces/logging"
)

// RunServer runs gRPC server and HTTP gateway
func RunServer() error {
	ctx := context.Background()

	// get configuration
	cfg, err := config.ReadConfig()

	if err != nil {
		return err
	}

	factory, err := registerTypes(cfg)
	if err != nil {
		return err
	}

	server := v1.NewNeuServiceServer(cfg, factory)

	//run HTTP gateway
	go func() {
		_ = rest.RunServer(ctx, cfg)
	}()

	return grpc.RunServer(ctx, server, cfg.GRPCPort)
}

func registerTypes(config *config.Config) (interfaces.Factory, error) {
	factory := factory.NewFactoryManager()
	factory.SetTraceInstance(logging.NewTrace(config))
	factory.SetErrorLoggerInstance(logging.NewErrorLogger(config))
	return factory, nil
}
