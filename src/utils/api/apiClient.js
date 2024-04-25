import axios from "axios";
// import io from "socket.io-client";

const defaultParams = () => ({
  headers: {},
});

const apiClient = {};

const api = axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_URL,
  withCredentials: true,
});

// const socket = io(process.env.REACT_APP_SOCKET_URL);

apiClient.deleteMethod = async (url, params, header) => {
  try {
    const response = await api.delete(url, {
      ...(header || defaultParams()),
      ...params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

apiClient.getMethod = async (url, params) => {
  try {
    const response = await api.get(url, { ...defaultParams(), ...params });
    return response;
  } catch (e) {
    return e.response;
  }
};

apiClient.patchMethod = async (url, body, params, header) => {
  try {
    const response = await api.patch(url, body, {
      ...(header || defaultParams()),
      ...params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

apiClient.postMethod = async (url, body, params, header) => {
  try {
    const response = await api.post(url, body, {
      ...(header || defaultParams()),
      ...params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

apiClient.putMethod = async (url, body, params, header) => {
  try {
    const response = await api.put(url, body, {
      ...(header || defaultParams()),
      ...params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

// WebSocket event listeners
// socket.on("connect", () => {
//   console.log("Connected to WebSocket server");
// });
// socket.on("disconnect", () => {
//   console.log("Disconnected from WebSocket server");
// });

// // WebSocket API methods
// apiClient.subscribeToUpdates = (callback) => {
//   socket.on("update", callback);
// };

// apiClient.unsubscribeFromUpdates = () => {
//   socket.off("update");
// };

export default apiClient;
