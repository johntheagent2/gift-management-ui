import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route
              path="dashboard/*"
              element={
                <AuthenticatedPages>
                  <Dashboard />
                </AuthenticatedPages>
              }
            /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
