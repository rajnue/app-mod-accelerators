FROM golang:1.14  as builder

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN ls
RUN go get -v all
RUN ls
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o out/neuservice cmd/neuservice/main.go

FROM alpine

WORKDIR /app
COPY --from=builder /app/config.json .
COPY --from=builder /app/out/neuservice .
COPY --from=builder /app/third_party/swagger_ui/ /swagger_ui
COPY --from=builder /app/api/swagger/NeuService/v1/neuservice.swagger.json .
RUN chmod +x neuservice

EXPOSE 5010
EXPOSE 5070

ENTRYPOINT [ "/app/neuservice" ]