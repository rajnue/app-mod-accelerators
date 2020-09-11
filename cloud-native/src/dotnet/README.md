# Cloud-native dotnet core solution

## How to run application in docker environment

Use docker-compose to setup the whole solution in local docker environment. Use the `.env` file to update the necessary ports and configurations required.

- `docker-compose.yml` - Docker compose file 
- `webapi.dotnet/Dockerfile` - The main Dockerfile for running application in a hosted environment
- `webapi.dotnet/Dockerfile.debug` - The debug Dockerfile for local development environment
- `.env` - The runtime configurations for docker-compose 

```s
# Running docker-compose Using the main docker-compose
docker-compose up

# run again without using cached layers
docker-compose up --build
```

## Building and Pushing Images

Connect to the Docker registry and use the following commands to push images to the registry. 

```
docker build -t neuappmode/webapi:dev -f webapi.dotnet .

docker push neuappmode/webapi:dev
```

## Using Visual Studio

While developing using Visual studio, developer can use the launchsettings `docker` profile to setup their local development environment.

- `docker-compose.override.yml` - Subset of the main docker-compose file, to override default configuration
- `docker-compose.dcproj` - The visual studio project file for docker-compose environment

Use `docker-compose.override.yml` to override the runtime configurations while using Visual Studio

```
docker-compose up
```