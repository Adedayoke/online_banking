import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const {isLoggedIn} = useSelector((state)=>state.userAuth);
  if(!isLoggedIn) return(<Navigate to="/login" />)
  return (
    <div>
      <h1 className="">
        Hello there
      </h1>
    </div>
  );
}
