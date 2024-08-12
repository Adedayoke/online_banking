import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContainer from "../../components/AuthContainer";

export default function Signup() {
  const { pathname } = useLocation();

  return (
    <AuthContainer>
      <p className="text-center text-xl font-bold p-4">
        Signup Step {pathname.includes("/signup/one") ? 1 : 2} of 2
      </p>
      <Outlet />
    </AuthContainer>
  );
}
