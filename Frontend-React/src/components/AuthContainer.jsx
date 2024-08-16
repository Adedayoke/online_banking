import React from "react";
import background from "./background.jpeg";
import Overlay from "./Overlay";

export default function AuthContainer({ children }) {
  return (
    <div
      className=" relative items-center justify-center h-svh p-4"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <Overlay>
        <div className="rounded h-fit w-4/5 md:w-1/2 lg:w-1/3">{children}</div>
        </Overlay>

    </div>
  );
}
