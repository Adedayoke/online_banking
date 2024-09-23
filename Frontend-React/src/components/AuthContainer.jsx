import React from "react";
import Overlay from "./Overlay";
import background from "../assets/signupBg.jpg"

export default function AuthContainer({ children }) {
  return (
    <div
      className=" relative items-center justify-center h-svh p-4"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
        <Overlay>
        <div className="rounded h-fit w-full md:w-1/2 lg:w-1/3">{children}</div>
        </Overlay>

    </div>
  );
}
