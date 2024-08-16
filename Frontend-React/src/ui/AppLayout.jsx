import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Overlay from "../components/Overlay";

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
      className="h-svh bg-black relative overflow-x-hidden overflow-y-auto"
    >
      <Overlay>
        <ToastContainer />
        <Navbar />
        <Outlet />
        <Footer />
      </Overlay>
      <div
        style={{
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
          width: "30%",
          height: "30%",
          transform: "translate(-50%, -50%)",
          transition: "all .1s",
          backgroundImage:
            "radial-gradient(circle, #83d13a, transparent, transparent)",
          zIndex: 10,
        }}
      />
    </div>
  );
}
