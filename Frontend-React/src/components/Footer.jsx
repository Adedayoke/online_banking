import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  if (isLoggedIn)return(
    <footer>
      <ul className="flex items-center justify-between p-4">
        <li>Home</li>
        <li>Withdraw</li>
        <li>Deposit</li>
        <li>Cards</li>
        <li>Me</li>
      </ul>
    </footer>
  )


    return (
      <footer className="bg-stone-700 h-40 text-stone-200 absolute left-0 bottom-0 w-full">
        my footer
      </footer>
    );
}
