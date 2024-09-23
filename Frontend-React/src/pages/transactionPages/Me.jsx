import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slice/authUserSlice";
import card1 from "../../assets/card_background.png";
import logoGen from "../../assets/logo sign.png";
import Logo from "../../components/Logo";
import settingIcon from "../../assets/settings icon.png";

export default function Me() {
  const { currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const reversedTransactions = [...transactions].reverse();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="z-20 w-full h-full left-0 md:absolute md:left-[10%] lg:left-[13%] md:w-[90%] lg:w-[87%]">
      In development
      {/* <div className="w-full h-[85%] md:h-full overflow-y-auto md:overflow-y-visible md:w-[70%] px-2 md:px-4">
        <div className="py-4 flex items-center justify-between">
          <div className="pl-4">
            <span></span>
            <span className="font-semibold text-2xl">
              {currentUser?.userName}
            </span>
          </div>
          <div
            onClick={() => navigate("/bank/me/settings")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <img className="w-7" src={settingIcon} />
          </div>
        </div>
        <div className="w-full cursor-pointer font-semibold p-4 rounded-lg mt-3 flex items-center justify-between">
          <div
            className="rounded-xl h-[200px] bigCard min-w-[100px] sm:min-w-[48%] md:min-w-[48%] relative flex items-center justify-between flex-col"
            style={{
              backgroundImage: `url(${card1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Logo
              imageSrc={logoGen}
              extraClass="absolute w-[20px] left-3 top-2"
            />
            <p className="text-white text-lg md:text-lg lg:text-xl font-semibold  absolute right-3 top-2">
              <span className="text-primary">$</span>
              {currentUser?.balance.toFixed(3)}
            </p>
            <div className="h-[30%] w-full"></div>
            <div className="h-[30%] px-2 md:px-2 lg:px-4 w-full text-right text-lg md:text-lg lg:text-xl text-white">
              <p>
                <span className="mr-2">
                  {currentUser?.accnumber.toString().split("").slice(0, 4).join("")}
                </span>
                <span className="mr-2">
                  {currentUser?.accnumber.toString().split("").slice(4, 8).join("")}
                </span>
                <span className="mr-2">
                  {currentUser?.accnumber.toString().split("").slice(8, 11).join("")}
                </span>
              </p>
            </div>
            <div className="h-[40%] w-full">
              <p className="h-[30%] text-sm md:text-xs lg:text-sm pl-2 text-white">
                <span>{currentUser?.name}</span>
              </p>
              <div className="h-[70%] flex items-center justify-between px-2 text-white">
                <Link
                  to="/bank/transfer"
                  className="bg-white md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer"
                >
                  Transfer
                </Link>

                <div className="bg-white md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer">
                  Deposit
                </div>
                <div className="bg-white md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer">
                  Withdraw
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>Total Assets</p>
            <h1 className="font-bold text-2xl mt-2">
              ${currentUser?.balance.toFixed(3)}
            </h1>
          </div>
          <div>
            <button
              onClick={() => navigate("/bank")}
              className="rounded-3xl bg-primary text-secondary px-6 py-2 font-semibold"
            >
              View
            </button>
          </div>
        </div>
        <div
          onClick={() => navigate("/bank/transactions")}
          className="w-full cursor-pointer font-semibold p-4 rounded-lg mt-3"
        >
          <div className="flex items-center justify-between">
            <span>Transaction History</span>
            <span className="font-semibold opacity-80">{">"}</span>
          </div>
          <div className="mt-2">
            <div className="font-semibold text-2xl">
              $
              {reversedTransactions.length > 0 ? (
                reversedTransactions[0]?.cpAmount > 0 ? (
                  reversedTransactions[0]?.amount.toFixed(6)
                ) : (
                  reversedTransactions[0]?.amount.toFixed(3)
                )
              ) : (
                <span>No transactions yet.</span>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/bank/cards")}
          className="w-full cursor-pointer font-semibold p-4 rounded-lg mt-3 flex items-center justify-between"
        >
          <p>Cards</p>
          <p>{"^"}</p>
        </div>
        <div className="w-full cursor-pointer font-semibold p-4 rounded-lg mt-3 flex items-center justify-between">
          <p>Dark Mode</p>
        </div>
        <div
          onClick={() => dispatch(logout())}
          className="w-full cursor-pointer font-semibold p-4 rounded-lg mt-3 flex items-center justify-between"
        >
          <p>Logout</p>
          <p>{">"}</p>
        </div>

        <div className="text-center font-semibold m-6">
          <p>Version 1.0.0</p>
        </div>
      </div> */}
    </div>
  );
}
