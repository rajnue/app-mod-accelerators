FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["webapi.dotnet.csproj", ""]
RUN dotnet restore "./webapi.dotnet.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "webapi.dotnet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "webapi.dotnet.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "webapi.dotnet.dll"]