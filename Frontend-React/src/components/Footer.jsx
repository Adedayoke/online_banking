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

export default function Footer() {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [translateSidebar, setTranslateSidebar] = useState("-100%")
  const [opacity, setopacity] = useState("0")
  useEffect(function(){
    setTranslateSidebar("0")
    setopacity("1")
  }, [])
  if (isLoggedIn)
    return (
      <footer style={{transform: `translateX(${translateSidebar})`, opacity: `${opacity}`, transition: 'all 1s'}} className="block md:hidden absolute text-sm md:text-base left-0 w-full bottom-0  bg-coolAsh z-40 border-t md:border-r border-customGreen">
        <ul className="flex h-full items-center justify-between py-4 px-5">
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
      </footer>
    );

  // return (
  //   <footer className="bg-stone-700 h-40 text-stone-200 w-full">
  //     my footer
  //   </footer>
  // );
}
