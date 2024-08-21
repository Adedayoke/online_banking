import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CurrencyDropdown from "../components/CurrencyDropdown";
import { BiHide, BiShow, BiTransfer } from "react-icons/bi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { PiBankBold } from "react-icons/pi";
import Transactions from "../components/Transactions";
import { setTransaction } from "../slice/balanceSlice";
import Overlay from "../components/Overlay";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";

export default function HomePage() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [balance, setBalance] = useState(1000); // Replace with actual balance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();
  const [translateTransaction, setTranslateTransaction] = useState("100%");
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
    <div className="z-20 w-full left-0 md:absolute md:left-[20%]  md:w-[80%] items-center justify-center h-full p-4 overflow-y-auto grid grid-cols-2 grid-rows-2 gap-4">
      <div className="text-white rounded-2xl bg-white h-full">
        <div className="h-3/4 rounded-2xl p-4 bg-secondary flex flex-col justify-between">
          <div>
            <p className="text-lightgray text-base opacity-65">Balance</p>
            <p className="font-semibold text-3xl">$0.00</p>
          </div>
          <div>
            <div className="bg-[#f2f2f24d] cont w-1/4 rounded-2xl text-xl p-2">
              <p>+ $0.00</p>
              <p>- $0.00</p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex h-1/4 items-center justify-around">
          <div className="bg-primary text-base cursor-pointer flex items-center justify-center font-semibold rounded-full py-2 text-secondary w-[45%]">
            <span className="mr-1">Add Funds</span>
            <span><TbCoin size={20} /></span>
          </div>
          <div className="bg-lightgray text-base cursor-pointer flex items-center justify-center font-semibold rounded-full py-2 text-secondary w-[45%]">
            <span className="mr-1">Transfer</span>
            <span><BiTransfer size={20} /></span>
          </div>
        </div>
      </div>
      <div className="h-full">
        <p className="font-semibold mb-2 text-lg">Linked Accounts</p>
        <div className="bg-white p-3 h-[90%] rounded-2xl">
          <p className="text-secondary rounded-2xl flex items-center cursor-pointer py-3 font-semibold hover:bg-lightgray mb-2"><span className="mr-2"><IoAddCircleOutline size={40} /></span>Link an account</p>
          <hr className="border-secondary" />
          {linkedAccounts.length > 0 ? (
            <ul className="overflow-y-scroll">
              <li></li>
            </ul>
          ) : (
            <p className="text-center p-4">Linked accounts appear here.</p>
          )}
        </div>
      </div>
      <div className="h-full">
        <p className="font-semibold mb-2 text-lg">Finance</p>
        <div className=" h-[90%] bg-white rounded-2xl">
          <ul>
            <li><span></span><span>Transactions</span></li>
            <li><span></span><span>Crypto</span></li>
            <li><span></span><span>Loans</span></li>
          </ul>
        </div>
      </div>
      <div className="h-full">
        <p className="font-semibold mb-2 text-lg">Your Spending Breakdown</p>
        <div className="bg-white h-[90%] rounded-2xl"></div>
      </div>
    </div>
  );
}
