/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.main = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.main.PingPongClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.main.PingPongPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.PingRequest,
 *   !proto.main.PongResponse>}
 */
const methodDescriptor_PingPong_Ping = new grpc.web.MethodDescriptor(
  '/main.PingPong/Ping',
  grpc.web.MethodType.UNARY,
  proto.main.PingRequest,
  proto.main.PongResponse,
  /**
   * @param {!proto.main.PingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.PongResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.main.PingRequest,
 *   !proto.main.PongResponse>}
 */
const methodInfo_PingPong_Ping = new grpc.web.AbstractClientBase.MethodInfo(
  proto.main.PongResponse,
  /**
   * @param {!proto.main.PingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.PongResponse.deserializeBinary
);


/**
 * @param {!proto.main.PingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.main.PongResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.PongResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.PingPongClient.prototype.ping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.PingPong/Ping',
      request,
      metadata || {},
      methodDescriptor_PingPong_Ping,
      callback);
};


/**
 * @param {!proto.main.PingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.PongResponse>}
 *     Promise that resolves to the response
 */
proto.main.PingPongPromiseClient.prototype.ping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.PingPong/Ping',
      request,
      metadata || {},
      methodDescriptor_PingPong_Ping);
};


module.exports = proto.main;

