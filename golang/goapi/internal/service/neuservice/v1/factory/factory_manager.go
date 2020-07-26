package factory

import (
	"sync"

	"github.com/Neudesic/NeuService/internal/service/neuservice/v1/interfaces"
)

type factoryManager struct {
	traceLogger interfaces.Logger
	errorLogger interfaces.Logger
}

var factoryManagerInstance *factoryManager
var once sync.Once

// NewFactoryManager creates an instance of factoryManager
func NewFactoryManager() interfaces.Factory {
	once.Do(func() {
		factoryManagerInstance = &factoryManager{}
	})
	return factoryManagerInstance
}

func (fm *factoryManager) SetTraceInstance(logger interfaces.Logger) {
	fm.traceLogger = logger
}

func (fm *factoryManager) SetErrorLoggerInstance(logger interfaces.Logger) {
	fm.errorLogger = logger
}

func (fm *factoryManager) GetLoggerInstance(mode string) interfaces.Logger {
	switch mode {
	case "trace":
		return fm.traceLogger
	case "error":
		return fm.errorLogger
	default:
		return nil // Can return a default logger here
	}
}
