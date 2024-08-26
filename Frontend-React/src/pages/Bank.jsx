import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
// import CurrencyDropdown from "../components/CurrencyDropdown";
import { BiTransfer } from "react-icons/bi";
// import { BiHide, BiShow } from "react-icons/bi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import { PiBankBold } from "react-icons/pi";
import Transaction from "../components/Transaction";
import { setTransaction } from "../slice/balanceSlice";
// import Overlay from "../components/Overlay";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Bank() {
  const { currentUser } = useSelector((state) => state.userAuth);
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
  const [linkAcctState, setLinkAcctState] = useState(true);

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

  // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // const handleCurrencySelect = (currency) => {
  //   setSelectedCurrency(currency);
  //   setIsDropdownOpen(false);
  // };
  // const handleToggleBalanceVisibility = () => {
  //   setShowBalance((prevShowBalance) => !prevShowBalance);
  // };

  // const currencies = ["USD", "EUR", "GBP", "NGN"]; // Add more currencies as needed

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
        <div className="h-1/2 py-4 md:py-0 md:h-[60%]">
          <div className="flex items-center h-3/4 justify-center">
            <div className="h-5/6 w-[95%] md:w-3/4 relative snap-mandatory overflow-y-auto md:overflow-hidden">
              {/* <div className="h-3/4 hor-scroll overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary relative"> */}
              <div
                className={`flex w-full h-full ${
                  currentCard === "card2"
                    ? "translate_to_card2"
                    : currentCard === "card1"
                    ? "translate_to_card1"
                    : "translate_to_card3"
                }`}
                style={{
                  transition: "all .5s",
                }}
              >
                <div
                  onMouseEnter={() => setCurrentCard("card1")}
                  className="card-display mr-6 md:mr-14 shadow-lg h-full bg-blue-600 rounded-2xl flex-shrink-0 w-[95%] md:w-[55%] p-5"
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
                     
                    </div>
                  </div>
                </div>
                <div
                  onMouseEnter={() => setCurrentCard("card2")}
                  className="card-display mr-6 md:mr-14 shadow-lg h-full bg-secondary rounded-2xl flex-shrink-0 w-[95%] md:w-[55%] p-5"
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
                  className="card-display mr-6 md:mr-14 shadow-lg h-full bg-yellow-600 rounded-2xl flex-shrink-0 w-[95%] md:w-[55%] p-5"
                >
                  <div className="h-full w-full rounded-2xl flex flex-col justify-between">
                    <div className="h-2/5 flex flex-col justify-between">
                      <p className="text-2xl font-bold text-white">
                        Credit Score
                      </p>
                      <div>
                        <p className="font-semibold text-white text-3xl">
                          0.00
                        </p>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-4 items-center justify-center">
            <div className="bg-primary text-base cursor-pointer flex items-center justify-center font-semibold rounded-full mr-4 py-2 text-secondary w-[35%] md:w-[15%]">
              <span className="mr-1">
                <Link to="/bank/deposit">Add Funds</Link>
              </span>
              <span>
                <TbCoin size={20} />
              </span>
            </div>
            <div className="bg-secondary text-base cursor-pointer flex items-center justify-center font-semibold rounded-full py-2 text-white w-[35%] md:w-[15%]">
              <span className="mr-1">
                <Link to="/bank/transfer">Transfer</Link>
              </span>
              <span>
                <BiTransfer size={20} />
              </span>
            </div>
          </div>
        </div>

        <div className="block md:flex px-4 items-center justify-center h-full md:h-[50%]">
          <div className="h-full w-full flex flex-col md:flex-row items-center">
            <div className="h-full w-full md:w-[50%] md:mr-4">
              <div className=" shadow-md h-full bg-white overflow-y-auto rounded-2xl">
                <p className="font-bold mb-2 text-xl px-4 pt-2">Finance</p>
                <hr />
                <ul className="px-4 pb-4">
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
                  <div className="md:hidden ">
                    <li className="flex items-center justify-between">
                      <div className="w-[90%]">
                        <div></div>
                        <ul className="border-b-[0.5px] py-3 border-secondary">
                          <li className="font-semibold ">Rewards</li>
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
                          <li className="font-semibold ">Auto Insurance</li>
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
                          <li className="font-semibold ">Crypto</li>
                          <li className="text-sm">Lorem ipsum dolor sit.</li>
                        </ul>
                      </div>
                      <div className="w-[10%] h-full flex items-center justify-center">
                        <MdOutlineKeyboardArrowRight />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="w-full">
                        <div></div>
                        <ul className="py-3 border-secondary">
                          <li
                            onClick={() => setLinkAcctState((c) => !c)}
                            className="font-semibold"
                          >
                            Linked Accounts
                          </li>
                          <div
                            style={{
                              transform: linkAcctState
                                ? "translateY(-20px)"
                                : "translateY(0)",
                              display: linkAcctState ? "none" : "block",
                              opacity: linkAcctState ? "0" : "1",
                              transition: "all .1s",
                            }}
                          >
                           <div className="pl-16 bg-lightgray">
                           <li className="md:flex-row flex p-4 text-center md:text-left items-center justify-between md:hover:bg-lightgray text-sm font-semibold">
                              <img
                                className="h-8 w-8 rounded-full bg-secondary"
                                src=""
                                alt=""
                              />
                              <span className="">Debit Card</span>
                              <span className="">***1234</span>
                            </li>
                           </div>
                          <li className="flex-row p-4 text-center md:text-left items-center md:hover:bg-lightgray flex">
                            <span className="mr-4">
                              <IoAddCircleOutline size={25} />
                            </span>
                            <span>Link an account</span>
                          </li>
                          </div>
                        </ul>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className="h-[333px] md:h-full w-full mt-4 md:mt-0 md:w-[50%]">
              <div className="bg-white relative shadow-md  h-full rounded-2xl w-full">
                <p className="font-bold mb-2 text-xl px-4 pt-2">Recent Transactions</p>
                <hr />
                <div className="p-4 ">
                  {transactions.length > 0 ? (
                    transactions?.map((transaction) => {
                      return (
                        <Transaction
                          transaction={transaction}
                          personalDetails={currentUser?.personalDetails}
                        />
                      );
                    })
                  ) : (
                    <p className="text-center text-white">
                      No Transactions yet.
                    </p>
                  )}
                  <p className="text-center text-primary font-bold absolute left-0 bottom-4 w-full h-6">
                    <Link to={`/bank/transactions?uid=${currentUser?.uid}`}>
                      View all transactions {">"}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
