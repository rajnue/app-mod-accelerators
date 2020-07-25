# NeuService
-A service built to demonstrate GO API which runs on both REST and GRPC Protocols
-go mod implementation
-Reads configuration values from config.json
-Factory implementation to inject dependencies
-valdations at proto declaration using annotations
-swagger implementation at proto declaration using annotations
-unit tests implementation
-docker file and docker-compose config for running as container


# Prerequisites
Go Lang > 1.14
Protocol buffers for proto compilation > https://developers.google.com/protocol-buffers/docs/downloads
docker > https://docs.docker.com/desktop/

# Build and Run using Docker
Build > docker-compose build
Run > docker-compose up
Test > Open browser and enter http://localhost:5070/swagger-ui/  to see swagger ui

# Build and Run using VSCode
Run > Select "Go Launch" configuration under Debug to run the application
Test > Open browser and enter http://localhost:5070/swagger-ui/  to see swagger ui

# Possible Extensions
 - Add logger to write logs to external data source like grafana or some third party services
 - Add middleware to log request/response times/payloads
 - Deploy on kuberenetes

# VS Code Recommended Plugins
 VS Code is the editor of choice for most developers on this project. 
 VS Code Go extension is recommended plug in.
 As such, the .vscode/extensions.json file specifies recommended plugins for use on the project. VS Code should prompt the user to install these plugins.

# Contributors
 Please ping/mail to srikanth.gundala@neudesic.com for suggestions/comments/concerns/clarifications.
