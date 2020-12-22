package main

import (
	"context"

	"github.com/percybolmer/grpcexample/proto/pingpong"
)

// Server is the Logic handler for the server
// It has to fullfill the GRPC schema generated Interface
// In this case its only 1 function called Ping
type Server struct {
}

// Ping fullfills the requirement for PingPong Server interface
func (s *Server) Ping(ctx context.Context, ping *pingpong.PingRequest) (*pingpong.PongResponse, error) {
	return pingpong.PongResponse{
		Ok: true,
	}, nil
}
