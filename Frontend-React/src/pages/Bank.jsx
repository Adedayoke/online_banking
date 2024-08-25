import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import CurrencyDropdown from "../components/CurrencyDropdown";
import { BiHide, BiShow, BiTransfer } from "react-icons/bi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { PiBankBold } from "react-icons/pi";
import Transactions from "../components/Transactions";
import { setTransaction } from "../slice/balanceSlice";
// import Overlay from "../components/Overlay";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Bank() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [balance, setBalance] = useState(1000); // Replace with actual balance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();
  const [translateTransaction, setTranslateTransaction] = useState("100%");
  const [translateCards, setTranslateCards] = useState("100%");
  const [currentCard, setCurrentCard] = useState("card2");
  const [opacityBalance, setOpacityBalance] = useState("0");
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  useEffect(
    function () {
      async function fetchUserTransaction() {
        try {
          const response = await axios.get(
            `http://localhost:5000/transactions?uid=${currentUser?.uid}`
          );
          dispatch(setTransaction(response.data)); // Pass the filtered transactions array directly
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
      if (currentUser) {
        fetchUserTransaction();
      }
    },
    [currentUser, dispatch]
  );

  useEffect(() => {
    if (selectedCurrency !== "USD") {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/USD`) // Example API, replace with actual one
        .then((response) => {
          const rate = response.data.rates[selectedCurrency];
          setConversionRate(rate);
        })
        .catch((error) => {
          console.error("Error fetching exchange rate:", error);
          setConversionRate(1); // Fallback to 1 if API call fails
        });
    } else {
      setConversionRate(1); // If USD is selected, no conversion needed
    }
  }, [selectedCurrency]);
  useEffect(function () {
    setOpacityBalance("1");
    setTranslateTransaction("0px");
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };
  const handleToggleBalanceVisibility = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  const currencies = ["USD", "EUR", "GBP", "NGN"]; // Add more currencies as needed

  return (
    <>
      <Outlet />
      <div className="z-20 w-full pb-2 h-full left-0 md:absolute md:left-[20%] md:w-[80%] overflow-y-auto">
        <div className="flex items-center justify-between p-6 mb-4">
          <div className="text-xl">
            Hi,{" "}
            <span className="font-semibold">
              {currentUser?.personalDetails.userName}
            </span>
          </div>
          <div>
            <div className="h-6 w-6 rounded-full bg-secondary"></div>
          </div>
        </div>
        <div className="h-[60%]">
          <div className="flex items-center h-3/4 justify-center">
            <div className="h-5/6 w-3/4 relative overflow-hidden">
              {/* <div className="h-3/4 hor-scroll overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary relative"> */}
              <div
                className="flex w-full h-full"
                style={{
                  transform: `translateX(${
                    currentCard === "card2"
                      ? "-40%"
                      : currentCard === "card1"
                      ? "0%"
                      : "-105%"
                  })`,
                  transition: "all .5s",
                }}
              >
                <div
                  onMouseEnter={() => setCurrentCard("card1")}
                  className="card-display shadow-lg h-full bg-blue-600 rounded-2xl flex-shrink-0 w-[80%] md:w-[55%] p-5"
                >
                  <div className="h-full w-full rounded-2xl flex flex-col justify-between">
                    <div className="h-2/5 flex flex-col justify-between">
                      <p className="text-2xl font-bold text-white">
                        Crypto Wallet
                      </p>
                      <div>
                        <p className="text-lightgray text-base opacity-65">
                          Balance
                        </p>
                        <p className="font-semibold text-white text-3xl">
                          0.00
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#f2f2f24d] w-2/6 md:w-1/4 rounded-2xl text-lg md:text-xl p-2">
                        <p>
                          + <span className="text-white">$0.00</span>
                        </p>
                        <p>
                          - <span className="text-white">$0.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onMouseEnter={() => setCurrentCard("card2")}
                  className="card-display shadow-lg h-full bg-secondary rounded-2xl flex-shrink-0 w-[80%] md:w-[55%] p-5"
                >
                  <div className="h-full w-full rounded-2xl flex flex-col justify-between">
                    <div className="h-2/5 flex flex-col justify-between">
                      <p className="text-2xl font-bold text-white">Account</p>
                      <div>
                        <p className="text-lightgray text-base opacity-65">
                          Balance
                        </p>
                        <p className="font-semibold text-white text-3xl">
                          0.00
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#f2f2f24d] w-2/6 md:w-1/4 rounded-2xl text-lg md:text-xl p-2">
                        <p>
                          + <span className="text-white">$0.00</span>
                        </p>
                        <p>
                          - <span className="text-white">$0.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onMouseEnter={() => setCurrentCard("card3")}
                  className="card-display shadow-lg h-full bg-yellow-600 rounded-2xl flex-shrink-0 w-[80%] md:w-[55%] p-5"
                >
                  <div className="h-full w-full rounded-2xl flex flex-col justify-between">
                    <div className="h-2/5 flex flex-col justify-between">
                      <p className="text-2xl font-bold text-white">
                        Credit Score
                      </p>
                      <div>
                        <p className="text-lightgray text-base opacity-65">
                          Balance
                        </p>
                        <p className="font-semibold text-white text-3xl">
                          0.00
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#f2f2f24d] w-2/6 md:w-1/4 rounded-2xl text-lg md:text-xl p-2">
                        <p>
                          + <span className="text-white">$0.00</span>
                        </p>
                        <p>
                          - <span className="text-white">$0.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add more card-display divs as needed */}
              </div>
              {/* <div className="absolute flex items-center justify-center left-0 bottom-0 w-full h-10 z-60">
         <div className="flex items-center justify-around w-12 h-full left-1/2  ">
            <span onClick={()=>setCurrentCard("card1")} className="h-3 cursor-pointer block rounded-full w-3 bg-white"></span>
            <span onClick={()=>setCurrentCard("card2")} className="h-3 cursor-pointer block rounded-full w-3 bg-white"></span>
            <span onClick={()=>setCurrentCard("card3")} className="h-3 cursor-pointer block rounded-full w-3 bg-white"></span>
          </div>
         </div> */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-primary text-base cursor-pointer flex items-center justify-center font-semibold rounded-full mr-4 py-2 text-secondary w-[15%]">
              <span className="mr-1">
                <Link to="/bank/deposit">Add Funds</Link>
              </span>
              <span>
                <TbCoin size={20} />
              </span>
            </div>
            <div className="bg-secondary text-base cursor-pointer flex items-center justify-center font-semibold rounded-full py-2 text-white w-[15%]">
              <span className="mr-1">
                <Link to="/bank/transfer">Transfer</Link>
              </span>
              <span>
                <BiTransfer size={20} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex px-4 items-center justify-center h-[50%]">
          <div className="h-full w-full flex items-center">
          <div className="h-full basis-[50%] mr-4">
            <div className=" shadow-md h-full bg-white overflow-y-auto rounded-2xl">
              <p className="font-bold mb-2 text-xl px-4 pt-2">Finance</p>
              <hr />
              <ul className="px-4">
                <li className="flex items-center justify-between">
                  <div className="w-[90%]">
                    <div></div>
                    <ul className="border-b-[0.5px] py-3 border-secondary">
                      <li className="font-semibold ">Instacash Advance</li>
                      <li className="text-sm">Lorem ipsum dolor sit.</li>
                    </ul>
                  </div>
                  <div className="w-[10%] h-full flex items-center justify-center">
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="w-[90%]">
                    <div></div>
                    <ul className="border-b-[0.5px] py-3 border-secondary">
                      <li className="font-semibold ">Managed Investing</li>
                      <li className="text-sm">Lorem ipsum dolor sit.</li>
                    </ul>
                  </div>
                  <div className="w-[10%] h-full flex items-center justify-center">
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="w-[90%]">
                    <div></div>
                    <ul className="border-b-[0.5px] py-3 border-secondary">
                      <li className="font-semibold ">Loans</li>
                      <li className="text-sm">Lorem ipsum dolor sit.</li>
                    </ul>
                  </div>
                  <div className="w-[10%] h-full flex items-center justify-center">
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full basis-[50%]">
            <div className="bg-white shadow-md  h-[90%] rounded-2xl w-full">
              <p className="font-bold mb-2 text-xl px-4 pt-2">Transactions</p>
              <hr />
              <div>zascdszfsfdgukf</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
