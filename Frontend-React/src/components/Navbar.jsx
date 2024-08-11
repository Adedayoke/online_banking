import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <nav className="bg-cyan-500 text-sm text-stone-200 p-5 flex items-center justify-between">
      <div>Logo</div>
      {isLoggedIn ? (
        <ul className="hidden md:flex">
          <li className="mr-4">Habeeb</li>
          <li>Logout</li>
        </ul>
      ) : (
        <ul className="hidden md:flex items-center justify-betwee">
          <li className="mr-4">
            <Link to="/signup/one" className="px-4 py-3 bg-stone-700 rounded">
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-4 py-3 border border-stone-200 rounded"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
      <div className="md:hidden">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}
