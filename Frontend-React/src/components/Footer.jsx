import React from "react";
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
  if (isLoggedIn)
    return (
      <footer className="absolute text-sm md:text-base left-0 w-full bottom-0 md:top-14 bg-stone-100 md:w-1/4">
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
      </footer>
    );

  // return (
  //   <footer className="bg-stone-700 h-40 text-stone-200 w-full">
  //     my footer
  //   </footer>
  // );
}
