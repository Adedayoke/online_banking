import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigationContainer from "./NavigationContainer";
import {
  IoCard,
  IoCardOutline,
  IoHomeOutline,
  IoHomeSharp,
  IoAddCircleOutline,
} from "react-icons/io5";
import {
  PiHandDepositFill,
  PiHandDepositLight,
  PiHandWithdrawFill,
  PiHandWithdrawLight,
} from "react-icons/pi";
import { RiUserSmileFill, RiUserSmileLine } from "react-icons/ri";
import Carousel from "./Carousel";

export default function Sidebar() {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [translateSidebar, setTranslateSidebar] = useState("-100%");
  const [opacity, setopacity] = useState("0");
  const [linkAcctState, setLinkAcctState] = useState(true);
  useEffect(function () {
    setTranslateSidebar("0");
    setopacity("1");
  }, []);
  if (isLoggedIn)
    return (
      <div
        style={{
          transform: `translateX(${translateSidebar})`,
          opacity: `${opacity}`,
          transition: "all 1s",
        }}
        className="hidden md:block h-full absolute text-sm md:text-base left-0 md:top-0 bg-white w-1/5 z-40 overflow-y-auto sidebarScroll"
      >
        {" "}
        <div className="h-[30%] p-2 text-secondary">
          <div className="border h-full rounded-lg p-2 border-customGreen">
            <Carousel />
          </div>
        </div>
        <ul className="flex h-[70%] md:block items-center justify-between py-4 px-5 md:py-4 md:px-0">
          <NavigationContainer
            page="bank"
            iconSelected={<IoHomeSharp size={25} />}
            iconUnselected={<IoHomeOutline size={25} />}
          >
            My Bank
          </NavigationContainer>
          <NavigationContainer
            page="bank/transfer"
            iconSelected={<PiHandWithdrawFill size={25} />}
            iconUnselected={<PiHandWithdrawLight size={25} />}
          >
            Rewards
          </NavigationContainer>
          <NavigationContainer
            page="bank/deposit"
            iconSelected={<PiHandDepositFill size={25} />}
            iconUnselected={<PiHandDepositLight size={25} />}
          >
            Auto Insurance
          </NavigationContainer>
          <li className="md:cursor-pointer w-full border-b-2">
            <div
              onClick={() => setLinkAcctState((c) => !c)}
              className="md:flex-row md:p-4 text-center md:text-left flex items-center flex-col md:hover:bg-lightgray"
            >
              <span className="md:mr-4">
                <IoCard size={25} />
              </span>
              <span>Linked Accounts</span>
            </div>
            <ul
              className="pl-10"
              style={{
                transform: linkAcctState
                  ? "translateY(-20px)"
                  : "translateY(0)",
                display: linkAcctState ? "none" : "block",
                opacity: linkAcctState ? "0" : "1",
                transition: "all .1s",
              }}
            >
              <li className="md:flex-row flex p-4 text-center md:text-left items-center justify-between md:hover:bg-lightgray text-sm font-semibold">
                <img
                  className="h-8 w-8 rounded-full bg-secondary"
                  src=""
                  alt=""
                />
                <span className="">Debit Card</span>
                <span className="">***1234</span>
              </li>
              <li className="md:flex-row p-4 text-center md:text-left items-center flex-col md:hover:bg-lightgray flex">
                <span className="md:mr-4">
                  <IoAddCircleOutline size={23} />
                </span>
                <span>Link an account</span>
              </li>
            </ul>
          </li>
          <NavigationContainer
            page="bank/cards"
            iconSelected={<IoCard size={25} />}
            iconUnselected={<IoCardOutline size={25} />}
          >
            Support
          </NavigationContainer>
          <NavigationContainer
            page="bank/me"
            iconSelected={<RiUserSmileFill size={25} />}
            iconUnselected={<RiUserSmileLine size={25} />}
          >
            Me
          </NavigationContainer>
        </ul>
      </div>
    );
}
