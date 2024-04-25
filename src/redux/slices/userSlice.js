import { createSlice } from "@reduxjs/toolkit";
import customCreateAsyncThunk from "./createCustomAsyncThunk";

const initialState = {
  data: null,
  error: null,
};

export const getEmail = customCreateAsyncThunk.createAsyncThunkWithLoading(
  "user/home",
  "GET",
  "user/api/email"
);

const resetUserReducer = () => initialState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: resetUserReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmail.pending, (state) => {
        state.error = null;
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getEmail.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;

const userReduced = userSlice.reducer;
export default userReduced;

export const selectUser = (state) => state.user;
