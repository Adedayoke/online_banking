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
        "md:bg-cyan-200 md:border-l-4 md:border-cyan-500"
      } ${
        pathname !== `/${page}` && "md:hover:bg-stone-200"
      } ${
        page === "withdraw" || page === "deposit" ? "hidden md:block" : "block"
      } text-cyan-500 md:w-full md:p-4 md:text-left  md:cursor-pointer`}
    >
      <Link
        className="w-full md:flex-row   text-center md:text-left flex items-center flex-col  "
        to={page}
      >
        {pathname === `/${page}` ? (
          <span className="md:mr-4">{iconSelected}</span>
        ) : (
          <span className="md:mr-4">{iconUnselected}</span>
        )}
        <span
          className={`${
            pathname === `/${page}` && "text-cyan-500"
          } text-stone-700 `}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
