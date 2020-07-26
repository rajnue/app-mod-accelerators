package interfaces

// Factory - interface which is used to set and get instances
type Factory interface {
	SetTraceInstance(logger Logger)
	SetErrorLoggerInstance(logger Logger)
	GetLoggerInstance(mode string) Logger
}
