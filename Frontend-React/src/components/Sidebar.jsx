import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigationContainer from "./NavigationContainer";
import {
  IoCard,
  IoCardOutline,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import {
  PiHandDepositFill,
  PiHandDepositLight,
  PiHandWithdrawFill,
  PiHandWithdrawLight,
} from "react-icons/pi";
import { RiUserSmileFill, RiUserSmileLine } from "react-icons/ri";

export default function Sidebar() {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [translateSidebar, setTranslateSidebar] = useState("-100%");
  const [opacity, setopacity] = useState("0");
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
        className="hidden md:block h-full absolute text-sm md:text-base left-0 md:top-0 bg-white w-1/5 z-40"
      >
        {" "}
        <ul className="flex h-full md:block items-center justify-between py-4 px-5 md:py-4 md:px-0">
          <NavigationContainer
            page=""
            iconSelected={<IoHomeSharp />}
            iconUnselected={<IoHomeOutline />}
          >
            Home
          </NavigationContainer>
          <NavigationContainer
            page="withdraw"
            iconSelected={<PiHandWithdrawFill />}
            iconUnselected={<PiHandWithdrawLight />}
          >
            Withdraw
          </NavigationContainer>
          <NavigationContainer
            page="deposit"
            iconSelected={<PiHandDepositFill />}
            iconUnselected={<PiHandDepositLight />}
          >
            Deposit
          </NavigationContainer>
          <NavigationContainer
            page="cards"
            iconSelected={<IoCard />}
            iconUnselected={<IoCardOutline />}
          >
            Cards
          </NavigationContainer>
          <NavigationContainer
            page="me"
            iconSelected={<RiUserSmileFill />}
            iconUnselected={<RiUserSmileLine />}
          >
            Me
          </NavigationContainer>
        </ul>
      </div>
    );
}
