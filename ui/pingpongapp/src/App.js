
import './App.css';
import React, {useState, useEffect } from 'react';
import { PingPongClient } from './proto/service_grpc_web_pb';
import { PingRequest } from './proto/service_pb';



 // We create a client that connects to the api
var client = new PingPongClient("https://localhost:8080");

function App() {
  // Create a const named status and a function called setStatus
  const [status, setStatus] = useState(false);
  // create a const named pingCount 
  const [pingCounter, setPingCounter] = useState(0); 
  // serverPings is a counter for how many ping the server has
  const [serverPings, setServerPings] = useState(0); 
  // sendPing is a function that will send a ping to the backend
  const sendPing = () => {
    var pingRequest = new PingRequest();
    // use the client to send our pingrequest, the function that is passed
    // as the third param is a callback. 
    var metadata;
    // I store the request since we want to listen on metadata exchanges
    var request = client.ping(pingRequest, metadata, function(err, response) {
      // serialize the response to an object 
      var pong = response.toObject();
      // set our JS clients ping counter to +1
      setPingCounter(prevPingCounter => prevPingCounter +1);
      // call setStatus to change the value of status
      setStatus(pong.ok);
    });
    // lets bind a function to change the counter based on the metadata field
    request.on('metadata', function(status) {
      // pingCounts are stored in Metadata, and metadata is a key value map
      setServerPings(status['ping-counts']);
    })
  }

  useEffect(() => {
    // Start a interval each 3 seconds which calls sendPing. 
    const interval = setInterval(() => sendPing(), 3000)
    return () => {
      // reset timer
      clearInterval(interval);
    }
  },[status]);
  
  // we will return the HTML. Since status is a bool
  // we need to + '' to convert it into a string
  return (
    <div className="App">
      <p>Status: {status + ''}</p><br/>
      <p>Requests: This client has performed {pingCounter} out of {serverPings}</p>
    </div>
  );


}

export default App;
