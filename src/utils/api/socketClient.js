import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL; // Replace with appropriate URL
const socket = io(socketUrl);

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Define functions to listen for specific socket events
// and dispatch actions to update the Redux store

export const listenForRealTimeData = (eventName, dispatchAction) => {
  socket.on(eventName, (data) => {
    dispatchAction(data); // Dispatch an action with received data
    console.log(data.payload);
  });
};

// You can add functions for sending messages to the server if needed

export default socket;
