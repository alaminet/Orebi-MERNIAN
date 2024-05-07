import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoggedOutUser = () => {
  const user = useSelector((user) => user.loginSlice.login);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default LoggedOutUser;
