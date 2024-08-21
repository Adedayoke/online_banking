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
        "md:bg-customGreen md:border-l-4 md:border-coolAsh"
      } ${
        pathname !== `/${page}` && "md:hover:bg-lightGreen"
      } ${
        page === "withdraw" || page === "deposit" ? "hidden md:block" : "block"
      } md:w-full md:p-4 md:text-left  md:cursor-pointer`}
    >
      <Link
        className="w-full md:flex-row text-center md:text-left flex items-center flex-col"
        to={page}
      >
        {pathname === `/${page}` ? (
          <span className="md:mr-4">{iconSelected}</span>
        ) : (
          <span className="md:mr-4 ">{iconUnselected}</span>
        )}
        <span
          className={`${
            pathname === `/${page}` ? "text-black font-semibold" : ""
          }  `}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
