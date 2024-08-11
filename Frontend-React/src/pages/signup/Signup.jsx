import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Signup() {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center justify-center h-4/5 p-4 bg-stone-200">
      <div className=" bg-stone-100 rounded shadow-md h-full w-4/5 md:w-1/2 lg:w-1/3" >
        <p className="text-center text-xl font-bold">Step {pathname === "/signup/one" ? 1 : 2} of 2</p>
        <Outlet />
      </div>
    </div>
  );
}
