import { createSlice } from "@reduxjs/toolkit";
import customCreateAsyncThunk from "./createCustomAsyncThunk";

const initialState = {
  data: null,
  error: null,
};

export const getMock = customCreateAsyncThunk.createAsyncThunkWithLoading(
  "user/home",
  "GET",
  "user/api/home"
);

const resetTestReducer = () => initialState;

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    resetTest: resetTestReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMock.pending, (state) => {
        state.error = null;
      })
      .addCase(getMock.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getMock.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetTest } = testSlice.actions;

const testApiReduced = testSlice.reducer;
export default testApiReduced;

export const selectTest = (state) => state.test;
