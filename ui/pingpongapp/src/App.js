
import './App.css';
import React, {useState, useEffect } from 'react';
import { PingPongClient } from './proto/service_grpc_web_pb';
import { PingRequest } from './proto/service_pb';

  // We create a client that connects to the api
var client = new PingPongClient("https://localhost:8080");

function App() {
  // Create a const named status and a function called setStatus
  const [status, setStatus] = useState(false);
  // sendPing is a function that will send a ping to the backend
  const sendPing = () => {
    var pingRequest = new PingRequest();
    // use the client to send our pingrequest, the function that is passed
    // as the third param is a callback. 
    client.ping(pingRequest, null, function(err, response) {
      // serialize the response to an object 
      var pong = response.toObject();
      // call setStatus to change the value of status
       setStatus(pong.ok);
    }); 
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
      <p>Status: {status + ''}</p>
    </div>
  );


}


export default App;
