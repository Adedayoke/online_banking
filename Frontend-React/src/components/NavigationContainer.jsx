import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavigationContainer({
  children,
  page,
  iconSelected,
  iconUnselected,
}) {
  const { pathname } = useLocation();
  return (
    <li
      className={`${
        pathname === `/${page}` &&
        "md:border-l-4 md:border-b-0 md:border-l-primary"
      } ${
        pathname !== `/${page}` && ""
      } ${
        page === "withdraw" || page === "deposit" ? "hidden md:block" : "block"
      } md:w-full text-sm md:py-4 md:px-2 md:text-left  md:cursor-pointer`}
    >
      <Link
        className="w-full md:flex-row text-center md:text-left flex items-center flex-col"
        to={page}
      >
          <span className="md:m-auto lg:ml-0 lg:mr-2">{iconSelected}</span>
        <span
          className={`${
            pathname === `/${page}` ? "text-black font-semibold" : ""
          } md:hidden lg:block` }
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
