package logging

import (
	"github.com/Neudesic/NeuService/internal/config"
	"github.com/Neudesic/NeuService/internal/models"
)

// Trace - This logger is used to trace message
type Trace struct {
	config *config.Config
}

// NewTrace returns an instance of Trace
func NewTrace(config *config.Config) *Trace {
	return &Trace{config: config}
}

// Log function logs message to specified data source
func (t *Trace) Log(logInfo models.LogInfo) {
	// TODO: Log the information to any data source
}
