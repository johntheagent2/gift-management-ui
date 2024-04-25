import { createSlice } from "@reduxjs/toolkit";
import customCreateAsyncThunk from "./createCustomAsyncThunk";

export const authenticate = customCreateAsyncThunk.createAsyncThunkWithLoading(
  "auth/login",
  "POST",
  "api/auth"
);

export const logout = customCreateAsyncThunk.createAsyncThunkWithLoading(
  "auth/logout",
  "POST",
  "api/logout"
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    error: null,
    isLogin: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state) => {
        state.isLogin = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.error = null;
        state.isLogin = false;
      });
  },
});
const authReducer = authSlice.reducer;
export default authReducer;

export const selectAuth = (state) => state.auth;
