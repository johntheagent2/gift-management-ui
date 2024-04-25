import React from "react";
import { selectAuth } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import NotFound from "./notFound/NotFound";

const AuthenticatedPages = ({ children }) => {
  const isLogin = useSelector(selectAuth).isLogin;

  return isLogin ? children : <NotFound />; // Handle non-authenticated users
};

export default AuthenticatedPages;
