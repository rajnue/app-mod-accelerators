package config

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/koding/multiconfig"
)

const (
	defaultGRPCPort = "5000"
	defaultHTTPPort = "5070"
)

// Config is configuration for Server
type Config struct {
	// gRPC server start parameters section
	// gRPC is TCP port to listen by gRPC server
	GRPCPort        string
	HTTPPort        string
	SwaggerUIPath   string
	SwaggerJSONPath string
	SwaggerJSONURI  string
	ApplicationName string
}

// ReadConfig - Reads config from environment
func ReadConfig() (*Config, error) {
	configPath, err := filepath.Abs("config.json")

	if fileExists(configPath) == false {
		fmt.Printf("file not found")
		configPath, err = filepath.Abs("../../config.json")
	}
	m := multiconfig.NewWithPath(configPath)
	Conf := &Config{}
	//Populated the serverConf struct
	m.MustLoad(Conf) // Check for error

	//TO override by passing environment variables pass STRUCT_VARIABLE CONFIG_SWAGGERUIPATH
	Conf.SwaggerUIPath, err = filepath.Abs(Conf.SwaggerUIPath)
	Conf.SwaggerJSONPath, err = filepath.Abs(Conf.SwaggerJSONPath)
	if err != nil {
		fmt.Printf(err.Error())
	}

	fmt.Printf("%+v\n", Conf)
	return Conf, nil
}

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}
