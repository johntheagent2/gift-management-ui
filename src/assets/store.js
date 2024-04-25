import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storageSession from "redux-persist/es/storage/session";
import registrationReducer from "../redux/slices/registrationSlice";
import loadingReducer from "../redux/slices/loadingSlice";
import authReducer from "../redux/slices/authSlice";
import { reducer as reduxFormReducer } from "redux-form";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  form: reduxFormReducer,
  auth: authReducer,
  registration: registrationReducer,
  loading: loadingReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store); // Create the persisted store

export { store, persistor };
