package v1

import (
	"context"

	"github.com/Neudesic/NeuService/internal/config"
	"github.com/Neudesic/NeuService/internal/service/neuservice/v1/interfaces"
	v1 "github.com/Neudesic/NeuService/pkg/api/neuservice/v1"
)

type neuServiceServer struct {
	config  *config.Config
	factory interfaces.Factory
}

// NewNeuServer returns the instance of NeuServiceServer
func NewNeuServiceServer(config *config.Config, factory interfaces.Factory) v1.NeuServiceServer {
	return &neuServiceServer{config: config, factory: factory}
}

func (s *neuServiceServer) GetHelloText(ctx context.Context, request *v1.NeuRequest) (*v1.NeuResponse, error) {

	err := request.Validate()
	if err != nil {
		// log error
		return nil, err
	}

	response := &v1.NeuResponse{
		ReponseText: "Hello " + request.InputText,
	}
	return response, nil
}
