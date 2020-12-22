package main

import (
	"log"
	"net"

	"github.com/percybolmer/grpcexample/proto/pingpong"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {

	// We Generate a TLS grpc API
	apiserver, err := GenerateTLSApi("cert/server.crt", "cert/server.key")
	if err != nil {
		log.Fatal(err)
	}
	// Start listening on a TCP Port
	lis, err := net.Listen("tcp", "127.0.0.1:9990")
	if err != nil {
		log.Fatal(err)
	}
	// We need to tell the code WHAT TO do on each request, ie. The business logic.
	// In GRPC cases, the Server is acutally just an Interface
	// So we need a struct which fulfills the server interface
	// see server.go
	s := Server{}
	// Register the API server as a PingPong Server
	// The register function is a generated piece by protoc.
	pingpong.RegisterPingPongServer(apiserver, s)

	// Start serving
	log.Fatal(apiserver.Serve(lis))
}

// GenerateTLSApi will load TLS certificates and key and create a grpc server with those.
func GenerateTLSApi(pemPath, keyPath string) (*grpc.Server, error) {
	cred, err := credentials.NewServerTLSFromFile(pemPath, keyPath)
	if err != nil {
		return nil, err
	}

	s := grpc.NewServer(
		grpc.Creds(cred),
	)
	return s, nil
}
