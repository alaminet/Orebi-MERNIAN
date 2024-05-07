import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import LoggedOutUser from "./LoggedOutUser";

const LoggedInUser = () => {
  const user = useSelector((user) => user.loginSlice.login);
  return user ? <Outlet /> : <Login />;
};

export default LoggedInUser;
