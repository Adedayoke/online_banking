import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer";

export default function Signup() {
  const { pathname } = useLocation();

  return (
    <AuthContainer>
      <Navigate to="/signup/one" />
      <Outlet />
    </AuthContainer>
  );
}
