import React, { useState } from "react";
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";
import Cash from "../assets/Money.png"
import Btc from "../assets/Bitcoin.png"
import Eth from "../assets/Ethereum.png"
import usdt from "../assets/USDT.png"
import bnb from "../assets/Binance.png"
import { useSelector } from "react-redux";

export default function Transaction({ transaction }) {
  const {currency} = useSelector(state=>state.userAuth)
  return (
    <div className="text-sm text-black flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="mr-4 rounded-full p-[2px]">
          {transaction?.asset === "USD" && (
            <img className="w-[25px]" src={Cash} alt="img" />
          )}
          {transaction?.asset === "USDT" && (
            <img className="w-[25px]" src={usdt} alt="img" />
          )}
          {transaction?.asset === "ETH" && (
            <img className="w-[25px]" src={Eth} alt="img" />
          )}
          {transaction?.asset === "BNB" && (
            <img className="w-[25px]" src={bnb} alt="img" />
          )}
          {transaction?.asset === "BTC" && (
            <img className="w-[25px]" src={Btc} alt="img" />
          )}
        </div>
        <ul className="text-xs">
          {transaction?.transaction_type === "debit" && (
            <li>
              Transfer to{" "}
              {transaction?.merchant?.length > 4
                ? transaction?.merchant.slice(0, 4) + "..."
                : transaction?.merchant}
            </li>
          )}
          {transaction?.transaction_type === "credit" && (
            <li>
              Received from{" "}
              {transaction?.merchant?.length > 4
                ? transaction?.merchant.slice(0, 4) + "..."
                : transaction?.merchant}
            </li>
          )}
          <li>{transaction?.date}</li>
        </ul>
      </div>
      <ul className="text-xs">
        {transaction?.transaction_type === "debit" && (
          <li className="font-bold">
            -{currency}
            {
              transaction?.amount > 9999
                ? transaction?.amount.toFixed(2).slice(0, 6) + "..." // Truncate large numbers with ellipsis
                : transaction?.amount.toFixed(2) // Show small numbers with two decimals
            }
          </li>
        )}
        {transaction?.transaction_type === "credit" && (
          <li className="font-bold">
            +{currency}
            {transaction?.amount > 9999
              ? transaction?.amount.toFixed(2).slice(0, 7) + "..."
              : transaction?.amount.toFixed(2)}
          </li>
        )}
        <li
          className={`${
            transaction?.description.toLowerCase() === "success" &&
            "bg-green-400 text-white border-[1px] border-green-600"
          } ${
            transaction?.description.toLowerCase() === "processing" &&
            "bg-yellow-700 text-stone-100"
          } 
  ${
    transaction?.description.toLowerCase() === "failed" &&
    "bg-red-700 text-stone-100"
  }
  text-center text-xs p-[2px] w-[80px] rounded`}
        >
          {transaction?.description}
        </li>
      </ul>
    </div>
  );
}
