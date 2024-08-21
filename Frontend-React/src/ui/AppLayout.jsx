import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import { ToastContainer } from "react-toastify";
import Overlay from "../components/Overlay";
import Sidebar from "../components/Sidebar";
// import background from "./bg3.jpg";

export default function AppLayout() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function handleMousemove(e) {
    if (x !== e.pageX && y !== e.pageY) {
      setX(e.pageX);
      setY(e.pageY);
    }
  }

  return (
    <div
      onMouseMove={handleMousemove}
      className="h-svh bg-lightgray relative overflow-x-hidden overflow-y-auto">
      <Overlay>
        <Navbar />
        <Outlet />
        <Sidebar />
        <Footer />
      </Overlay>
    </div>
  );
}
