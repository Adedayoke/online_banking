import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigationContainer from "./NavigationContainer";
import logo from '../assets/logo large2.png'
import logo2 from '../assets/logo sign.png'
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
import Logo from "./Logo";
import homeIcon from "../assets/home icon.png";
import cardsIcon from "../assets/cards icon.png";
import transactionIcon from "../assets/transaction icon.png";
import meIcon from "../assets/me icon.png";
import settingIcon from "../assets/settings icon.png";
import { Link } from "react-router-dom";

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
          transition: "all .5s ease-out",
        }}
        className="hidden md:block h-full absolute text-sm md:text-base left-0 md:top-0 bg-secondary text-white md:w-[10%] lg:w-[13%] z-40 overflow-y-auto sidebarScroll shadow-lg"
      >
        {" "}
        <div className="h-[10%] hidden py-4 p-2 lg:flex items-center justify-center text-secondary">
          <Logo imageSrc={logo} extraClass="w-[130px]" />
        </div>
        <div className="h-[10%] py-4 lg:hidden p-2 flex items-center justify-center text-secondary">
          <Logo imageSrc={logo2} extraClass="w-[50px]" />
        </div>
        <ul className="flex h-[70%] md:block items-center justify-between py-4 px-5 md:py-4 md:px-0">
          <NavigationContainer
            page="/bank"
            iconSelected={<img className="w-7" src={homeIcon} />}
            iconUnselected={<IoHomeOutline size={25} />}
          >
            Dashboard
          </NavigationContainer>
          <NavigationContainer
            page="/bank/transactions"
            iconSelected={<img className="w-7" src={transactionIcon} />}
            iconUnselected={<PiHandWithdrawLight size={25} />}
          >
            Transactions
          </NavigationContainer>
          <Link to="/bank/cards" className="md:cursor-pointer w-full">
            <div
              onClick={() => setLinkAcctState((c) => !c)}
              className="md:flex-row md:p-4 text-center md:text-left flex items-center flex-col text-sm md:py-4 md:px-2"
            >
              <span className="md:m-auto lg:ml-0 lg:mr-2">
              <img className="w-7" src={cardsIcon} />
              </span>
              <span className="md:hidden lg:block">Cards</span>
            </div>
          </Link>
          {/* <NavigationContainer
            page="/bank/about"
            iconSelected={<img className="w-7" src={meIcon} />}
            iconUnselected={<RiUserSmileLine size={25} />}
          >
            About us
          </NavigationContainer> */}
        </ul>
        <div className="absolute left-0 bottom-0 w-full h-[60px] text-center">
          <NavigationContainer
              page="/bank/settings"
              iconSelected={<img className="w-7" src={settingIcon} />}
              iconUnselected={<RiUserSmileLine size={25} />}
            >
              Settings
            </NavigationContainer>
        </div>
      </div>
    );
}
