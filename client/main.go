package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/percybolmer/grpcexample/interceptors"
	"github.com/percybolmer/grpcexample/pingpong"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
)

func main() {
	ctx := context.Background()
	// Load our TLS certificate and use grpc/credentials to create new transport credentials
	creds := credentials.NewTLS(loadTLSCfg())
	// Create a new connection using the transport credentials
	// Create a new pingCounter object that counts the pings the client performs
	pingCounter := interceptors.PingCounter{}
	// Create a connection and add our ClientPingCounter interceptor as a UnaryInterceptor to the connection
	conn, err := grpc.DialContext(ctx, "localhost:9990", grpc.WithTransportCredentials(creds), grpc.WithUnaryInterceptor(pingCounter.ClientPingCounter))

	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	// A new GRPC client to use
	client := pingpong.NewPingPongClient(conn)
	// Create a metadata header we can use.
	// This is needed so we can read the metadata that the response carries.
	// You can also append an Trailer if any service sends trailing metadata
	var header metadata.MD
	// Use grpc.Header to read the metadata
	_, err = client.Ping(ctx, &pingpong.PingRequest{}, grpc.Header(&header))
	if err != nil {
		log.Fatal(err)
	}
	// Get the ping counts from the Server and see how many of them that are done by this client
	pings := header.Get("ping-counts")
	if len(pings) != 0 {
		fmt.Printf("This client has performed %d out of %s pings\n", pingCounter.Pings, pings[0])
	}
}

// loadTLSCfg will load a certificate and create a tls config
func loadTLSCfg() *tls.Config {
	b, _ := ioutil.ReadFile("../cert/server.crt")
	cp := x509.NewCertPool()
	if !cp.AppendCertsFromPEM(b) {
		log.Fatal("credentials: failed to append certificates")
	}
	config := &tls.Config{
		InsecureSkipVerify: false,
		RootCAs:            cp,
	}
	return config
}
