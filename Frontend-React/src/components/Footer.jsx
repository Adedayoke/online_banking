import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigationContainer from "./NavigationContainer";
import {
  IoHomeOutline,
  IoHomeSharp,
  IoCard,
  IoCardOutline,
} from "react-icons/io5";
import { RiUserSmileFill, RiUserSmileLine } from "react-icons/ri";
import {
  PiHandWithdrawLight,
  PiHandWithdrawFill,
  PiHandDepositLight,
  PiHandDepositFill,
} from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/home icon.png";
import cardsIcon from "../assets/cards icon.png";
import transactionIcon from "../assets/transaction icon.png";
import meIcon from "../assets/me icon.png";
import settingIcon from "../assets/settings icon.png";

export default function Footer() {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [translateSidebar, setTranslateSidebar] = useState("-100%");
  const [opacity, setopacity] = useState("0");
  useEffect(function () {
    setTranslateSidebar("0");
    setopacity("1");
  }, []);
  const { pathname } = useLocation();
  if (isLoggedIn)
    return (
      <footer
        style={{
          transform: `translateX(${translateSidebar})`,
          opacity: `${opacity}`,
          transition: "all 1s",
        }}
        className="block h-[9%] md:hidden fixed text-xs md:text-base left-0 w-full bottom-0  text-white bg-secondary z-30"
      >
        <ul className="flex h-full items-center justify-between py-2 px-5">
          <li
            className={`${
              pathname === `/bank` &&
              "md:border-l-4 md:border-b-0 md:border-l-primary md:bg-lightGreen"
            } md:w-full md:p-4 md:text-left  md:cursor-pointe`}
          >
            <Link
              className={`w-full md:flex-row text-center md:text-left flex items-center flex-col ${
                pathname === "/bank"
                  ? "bg-secondary p-4 rounded-full text-primary -translate-y-6 border-[6px] border-white transition-all"
                  : "bg-none p-0"
              }`}
              to={"/bank"}
            >
              <span className="md:m-auto lg:ml-0 lg:mr-4">
                  <img className="w-7" src={homeIcon} />
                </span>
              <span
                className={`${
                  pathname === `/bank` ? "hidden font-semibold text-xs" : ""
                }  `}
              >
                Home
              </span>
            </Link>
          </li>
          <li className={`md:w-full md:p-4 md:text-left  md:cursor-pointer `}>
            <Link
              to="/bank/cards"
              className={`${
                pathname === "/bank/cards"
                  ? "bg-secondary p-4 rounded-full text-white -translate-y-6 border-[6px] border-white transition-all"
                  : "bg-none p-0"
              } w-full md:flex-row text-center md:text-left flex items-center flex-col`}
            >
              <div className="md:flex-row md:p-4 text-center md:text-left flex items-center flex-col text-xs md:py-4 md:px-2">
                <span className="md:m-auto lg:ml-0 lg:mr-4">
                  <img className="w-7" src={cardsIcon} />
                </span>
                <span
                  className={`${
                    pathname === `/bank/cards` ? "hidden font-semibold text-xs" : ""
                  }  `}
                >
                  Cards
                </span>
              </div>
            </Link>
          </li>
          <li className={`md:w-full md:p-4 md:text-left  md:cursor-pointer `}>
            <Link
              to="/bank/transactions"
              className={`${
                pathname === "/bank/transactions"
                  ? "bg-secondary p-4 rounded-full text-primary -translate-y-6 border-[6px] border-white transition-all"
                  : "bg-none p-0"
              } w-full md:flex-row text-center md:text-left flex items-center flex-col`}
            >
              <div className="md:flex-row md:p-4 text-center md:text-left flex items-center flex-col text-xs md:py-4 md:px-2">
              <span className="md:m-auto lg:ml-0 lg:mr-4">
              <img className="w-7" src={transactionIcon} />
                </span>
                <span
                  className={`${
                    pathname === `/bank/transactions` ? "hidden font-semibold text-xs" : ""
                  }  `}
                >
                  Transactions
                </span>
              </div>
            </Link>
          </li>
          <li className={`md:w-full md:p-4 md:text-left  md:cursor-pointer `}>
            <Link
              to="/bank/settings"
              className={`${
                pathname === "/bank/settings"
                  ? "bg-secondary p-4 rounded-full text-primary -translate-y-6 border-[6px] border-white transition-all"
                  : "bg-none p-0"
              } w-full md:flex-row text-center md:text-left flex items-center flex-col`}
            >
              <div className="md:flex-row md:p-4 text-center md:text-left flex items-center flex-col text-xs md:py-4 md:px-2">
               <span className="md:m-auto lg:ml-0 lg:mr-4">
                  <img className="w-7" src={settingIcon} />
                </span>
                <span
                  className={`${
                    pathname === `/bank/me` ? "hidden font-semibold text-xs" : ""
                  }  `}
                >
                  Settings
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </footer>
    );

  // return (
  //   <footer className="bg-stone-700 h-40 text-stone-200 w-full">
  //     my footer
  //   </footer>
  // );
}
