import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Registration from "./containers/registration/Registration";
import { store, persistor } from "./assets/store";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./containers/login/Login";
import AuthenticatedPages from "./containers/AuthenticatedPages";
import Dashboard from "./containers/dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="register" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route
              path="/*"
              element={
                <AuthenticatedPages>
                  <Dashboard />
                </AuthenticatedPages>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
