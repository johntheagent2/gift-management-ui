import { createSlice } from "@reduxjs/toolkit";
import customCreateAsyncThunk from "./createCustomAsyncThunk";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const registration = customCreateAsyncThunk.createAsyncThunkWithLoading(
  "api/registration",
  "POST",
  "public/api/register"
);

const resetRegistrationReducer = () => initialState;

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistration: resetRegistrationReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = { message: "You have been successfully registered" };
      })
      .addCase(registration.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { resetRegistration } = registrationSlice.actions;

const registrationReducer = registrationSlice.reducer;
export default registrationReducer;

export const selectRegistration = (state) => state.registration;
