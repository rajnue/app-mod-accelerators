package rest

import (
	"context"
	"fmt"
	"log"
	"mime"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/Neudesic/NeuService/internal/config"
	v1 "github.com/Neudesic/NeuService/pkg/api/neuservice/v1"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
)

func CustomMatcher(key string) (string, bool) {
	switch key {
	default:
		return key, true
	}
}

func RunServer(ctx context.Context, config *config.Config) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := http.NewServeMux()

	gwmux := runtime.NewServeMux(runtime.WithIncomingHeaderMatcher(CustomMatcher))

	//Dial options to connet to grpc service wihout credentials.
	//adds log interceptor to the dialer for logging the request and response
	opts := []grpc.DialOption{grpc.WithInsecure(), withClientUnaryInterceptor()}
	if err := v1.RegisterNeuServiceHandlerFromEndpoint(ctx, gwmux, "localhost:"+config.GRPCPort, opts); err != nil {
		log.Fatalf("failed to start HTTP gateway: %v", err)
	}

	mux.Handle("/", gwmux)

	err := serveSwagger(mux, config)
	if err != nil {
		return err
	}

	srv := &http.Server{
		Addr:    ":" + config.HTTPPort,
		Handler: setNeuUserAgent(allowCORS(mux)),
	}

	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	go func() {
		for range c {
			// sig is a ^C, handle it
		}

		_, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()

		_ = srv.Shutdown(ctx)
	}()

	log.Printf("starting HTTP/REST gateway at port %s ...\n", config.HTTPPort)
	return srv.ListenAndServe()
}

func serveSwagger(mux *http.ServeMux, config *config.Config) error {
	err := mime.AddExtensionType(".svg", "image/svg+xml")
	if err != nil {
		return err
	}

	// Expose files in third_party/swagger-ui/ on <host>/swagger-ui
	fileServer := http.FileServer(http.Dir(config.SwaggerUIPath))
	prefix := "/swagger-ui/"
	mux.Handle(prefix, http.StripPrefix(prefix, fileServer))

	mux.HandleFunc(config.SwaggerJSONURI, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, config.SwaggerJSONPath)
	})

	return nil
}

//Interceptor for logging the requests
func clientInterceptor(
	ctx context.Context,
	method string,
	req interface{},
	reply interface{},
	cc *grpc.ClientConn,
	invoker grpc.UnaryInvoker,
	opts ...grpc.CallOption,
) error {
	// Logic before invoking the invoker
	start := time.Now()
	// Calls the invoker to execute RPC
	err := invoker(ctx, method, req, reply, cc, opts...)
	// Logic after invoking the invoker
	log.Printf("Invoked RPC method=%s; Duration=%s; Error=%v; Request=%v; Reply=%v", method,
		time.Since(start), err, req, reply)
	return err
}

func withClientUnaryInterceptor() grpc.DialOption {
	return grpc.WithUnaryInterceptor(clientInterceptor)
}

// allowCORS allows Cross Origin Resoruce Sharing from any origin.
// Don't do this without consideration in production systems.
func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

// preflightHandler adds the necessary headers in order to serve
// CORS from any origin using the methods "GET", "HEAD", "POST", "PUT", "DELETE"
// We insist, don't do this without consideration in production systems.
func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept", "Authorization"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	log.Printf("preflight request for %s", r.URL.Path)
}

//User-Agent is overriden by the go-grpc in the metadata , this handler copies and stores the useragent in another key in metadata
func setNeuUserAgent(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%v", r.Header.Get("User-Agent"))
		r.Header.Set("neu-useragent", r.Header.Get("User-Agent"))
		h.ServeHTTP(w, r)
	})
}
