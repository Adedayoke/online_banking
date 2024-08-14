import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CurrencyDropdown from "../components/CurrencyDropdown";
import { BiHide, BiShow } from "react-icons/bi";
import { PiHandWithdrawLight } from "react-icons/pi";
import Transactions from "../components/Transactions";
import { setTransaction } from "../slice/balanceSlice";

export default function HomePage() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [balance, setBalance] = useState(1000); // Replace with actual balance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();

  useEffect(function(){
    async function fetchUserTransaction(){
      try {
        const response = await axios.get(`http://localhost:5000/transactions?uid=${currentUser?.uid}`);
        dispatch(setTransaction(response.data)); // Pass the filtered transactions array directly
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    if (currentUser) {
      fetchUserTransaction();
    }
  }, [currentUser, dispatch])
  

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
    <div className="flex items-center justify-center h-5/6 p-0 bg-stone-200">
      <div className=" rounded shadow-md h-full w-full md:w-1/2 lg:w-1/3 p-6 flex items-center justify-between flex-col">
        <div className="w-full">
          <div className="mr-2 mb-5 md:mr-4 font-bold p-4">
            Hi,{" "}
            <span className="uppercase">
              {currentUser?.personalDetails?.userName}
            </span>
          </div>
          <div className="w-full bg-cyan-500 p-4 rounded-lg text-stone-100">
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
        <div className="w-full bg-stone-100 p-4 h-4/6">
          <h2 className="text-stone-700 font-bold rounded-lg mb-4">
            Transaction History {">"}
          </h2>
          {transactions?.map((transaction) => {
            return (
              <Transactions
                transaction={transaction}
                personalDetails={currentUser?.personalDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
