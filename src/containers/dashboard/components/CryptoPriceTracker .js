const socketUrl = process.env.REACT_APP_SOCKET_URL;

const message = {
  type: "subscribe",
  // apikey: "4D04F210-0103-4CF4-83C3-6124028CCE3B",
  subscribe_data_type: ["trade"],
  subscribe_filter_symbol_id: [
    "BITSTAMP_SPOT_BTC_USD$",
    "BITSTAMP_SPOT_ETH_USD$",
  ],
};

const socketClient = {};

socketClient.subscribeToPriceUpdates = () => {
  const socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    socket.send(JSON.stringify(message));
  };

  socket.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

socketClient.unsubscribeFromPriceUpdates = (socket) => {
  if (socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = {
      type: "unsubcribe",
      ...message,
    };
    socket.send(JSON.stringify(unsubscribeMessage));
    socket.close();
  } else {
    console.error("WebSocket connection is not open.");
  }
};

export default socketClient;
