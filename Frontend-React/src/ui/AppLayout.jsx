import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Overlay from "../components/Overlay";
import background from "./bg3.jpg";

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
      className="h-svh bg-radial-custom relative overflow-x-hidden overflow-y-auto"
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <Overlay>
        <Navbar />
        <Outlet />
        <Footer />
      </Overlay>
      
      {/* <div
        style={{
          // position: "absolute",
          // top: `${y}px`,
          // left: `${x}px`,
          width: "30%",
          height: "30%",
          transform: "translate(-50%, -50%)",
          transition: "all .1s",
          backgroundImage:
            "radial-gradient(triangle, #83d13a4d, transparent, transparent)",
          zIndex: 10,
        }}
      /> */}
      {/* <div className="absolute left-0 top-0 h-full w-full bg-radial-pseudo-custom z-60"  /> */}
    </div>
  );
}
