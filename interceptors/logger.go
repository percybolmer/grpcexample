package interceptors

import (
	"context"
	"fmt"

	"google.golang.org/grpc"
)

// LogRequest is a gRPC UnaryServerInterceptor that will log the API call to stdOut
func LogRequest(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (response interface{}, err error) {

	fmt.Printf("Request for : %s\n", info.FullMethod)
	// Last but super important, execute the handler so that the actualy gRPC request is also performed
	return handler(ctx, req)
}
