import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies";
export const GuestRoute = () => {
  return <Outlet />;

  // return tokenValid(refreshToken!, accessToken) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/" />
  // );
};
