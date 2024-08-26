import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import { ToastContainer } from "react-toastify";
import Overlay from "../components/Overlay";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
// import background from "./bg3.jpg";

export default function AppLayout() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  function handleMousemove(e) {
    if (x !== e.pageX && y !== e.pageY) {
      setX(e.pageX);
      setY(e.pageY);
    }
  }
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <div
      onMouseMove={handleMousemove}
      className="h-full relative overflow-x-hidden">
      {/* <Overlay> */}
        {/* <Navbar /> */}
        <Outlet />
        <Sidebar />
        {/* <Footer /> */}
      {/* </Overlay> */}
    </div>
  );
}
