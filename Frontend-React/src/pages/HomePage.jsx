import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CurrencyDropdown from "../components/CurrencyDropdown";
import { BiHide, BiShow } from "react-icons/bi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { PiBankBold } from "react-icons/pi";
import Transactions from "../components/Transactions";
import { setTransaction } from "../slice/balanceSlice";
import Overlay from "../components/Overlay";

export default function HomePage() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [balance, setBalance] = useState(1000); // Replace with actual balance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();

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

  if (!isLoggedIn) return <Navigate to="/login" />;

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
    <div className="flex w-full md:absolute md:left-1/4  md:w-3/4 items-center justify-center md:h-full h-full pt-14 overflow-y-auto bg-radial-custom ">
      <Overlay>
      <div className=" rounded h-full w-full md:w-3/4 p-6 flex items-center justify-between flex-col overflow-y-auto ">
        <div className="w-full">
          <div className="mr-2 mb-3 md:mr-4 font-bold p-4 text-white">
            Hi,{" "}
            <span className="uppercase">
              {currentUser?.personalDetails?.userName}
            </span>
          </div>
          <div className="w-full p-4 rounded-lg text-stone-100 mb-3">
            <p className="mb-4 flex items-center">
              Available balance{" "}
              <span
                className="text-center  ml-2 flex items-center justify-center cursor-pointer"
                onClick={handleToggleBalanceVisibility}
              >
                {showBalance ? <BiShow size={25} /> : <BiHide size={25} />}
              </span>
            </p>
            {showBalance ? (
              <div className="flex items-center">
                <CurrencyDropdown
                  isDropdownOpen={isDropdownOpen}
                  toggleDropdown={toggleDropdown}
                  selectedCurrency={selectedCurrency}
                  handleCurrencySelect={handleCurrencySelect}
                  currencies={currencies}
                />
                <p className="text-2xl font-bold">
                  {(balance * conversionRate).toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="font-bold text-2xl">****</div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center p-4 justify-around  mx-0 my-4 rounded-xl font-semibold md:hidden">
          <Link to="/deposit">
            <div className="flex items-center text-white flex-col">
              <span className="text-white p-2 bg-customGreen rounded-lg mb-2">
                <PiBankBold size={26} />
              </span>
              <span>Deposit</span>
            </div>
          </Link>
          <Link className=" block" to="/withdraw">
            <div className="flex text-white items-center flex-col">
              <span className="text-white bg-customGreen p-2 rounded-lg mb-2">
                <PiHandWithdrawFill size={26} />
              </span>
              <span>Withdraw</span>
            </div>
          </Link>
        </div>
        <div className="w-full rounded-xl bg-coolAsh p-4 h-96">
          <h2 className="text-white font-bold rounded-lg mb-4">
            Transaction History {">"}
          </h2>
          {transactions.length > 0 ? (
            transactions?.map((transaction) => {
              return (
                <Transactions
                  transaction={transaction}
                  personalDetails={currentUser?.personalDetails}
                />
              );
            })
          ) : (
            <p className="text-center text-white">No Transactions yet.</p>
          )}
        </div>
      </div>
      </Overlay>
    </div>
  );
}
