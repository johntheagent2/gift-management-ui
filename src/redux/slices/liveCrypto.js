// import { createSlice } from "@reduxjs/toolkit";
// import customCreateAsyncThunk from "./createCustomAsyncThunk";
// import apiClient from "../../utils/api";

// const initialState = {
//   data: null,
//   error: null,
// };

// // WebSocket action creators
// export const subscribeToUpdates = (callback) => () => {
//   apiClient.subscribeToUpdates(callback);
// };

// export const unsubscribeFromUpdates = () => () => {
//   apiClient.unsubscribeFromUpdates();
// };

// const resetSocketApi = () => initialState;

// const socketApi = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     resetSocket: resetSocketApi,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(subscribeToUpdates.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(subscribeToUpdates.fulfilled, (state, action) => {
//         state.error = null;
//         state.data = action.payload;
//         console.log(action.payload + " liveCrypto");
//       })
//       .addCase(subscribeToUpdates.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(unsubscribeFromUpdates.fulfilled, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(unsubscribeFromUpdates.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { socketReset } = socketApi.actions;

// const socketApiReduce = socketApi.reducer;
// export default socketApiReduce;

// export const selectSocket = (state) => state.data;
