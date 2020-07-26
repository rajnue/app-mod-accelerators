package logging

import (
	"github.com/Neudesic/NeuService/internal/config"
	"github.com/Neudesic/NeuService/internal/models"
)

// ErrorLogger - This logger is used to log error message
type ErrorLogger struct {
	config *config.Config
}

// NewErrorLogger returns an instance of ErrorLogger
func NewErrorLogger(config *config.Config) *ErrorLogger {
	return &ErrorLogger{config: config}
}

// Log function logs error message to specified data source
func (el *ErrorLogger) Log(logInfo models.LogInfo) {
	// TODO: Log the information to any data source like DB
}
