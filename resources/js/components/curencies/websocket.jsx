import React, { useEffect } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';

const MyComponent = () => {
  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket('ws://traders/websocket');

    // Event listener for when the connection is established
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Event listener for receiving messages
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    // Event listener for when the connection is closed
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return <div>My Component</div>;
};

export default MyComponent;
