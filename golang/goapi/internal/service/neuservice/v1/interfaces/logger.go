package interfaces

import (
	"github.com/Neudesic/NeuService/internal/models"
)

// Logger - interface which is used to log message
type Logger interface {
	Log(errorInfo models.LogInfo)
}
