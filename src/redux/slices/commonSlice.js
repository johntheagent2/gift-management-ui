import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    redirectNotFound: false,
    redirectAccessForbidden: false,
  },
  reducers: {
    redirectNotFound: (state) => {
      state.redirectNotFound = true;
    },
    redirectNotFoundDone: (state) => {
      state.redirectNotFound = true;
    },
    redirectAccessForbidden: (state) => {
      state.redirectAccessForbidden = true;
    },
    resetRedirectAccessForbidden: (state) => {
      state.redirectAccessForbidden = false;
    },
  },
});

export const {
  redirectNotFound,
  redirectNotFoundDone,
  redirectAccessForbidden,
  resetRedirectAccessForbidden,
} = commonSlice.actions;

const commonReducer = commonSlice.reducer;
export default commonReducer;

export const selectCommon = (state) => state.common;
