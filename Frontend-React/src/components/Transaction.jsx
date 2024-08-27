import React from "react";
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";

export default function Transaction({ transaction }) {
  console.log(transaction);
  return (
    <div className="text-base text-black flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="mr-4 rounded-full bg-lightGreen p-2">
          {transaction?.type === "deposit" && (
            <PiHandDepositLight color="#83d13a" size={30} />
          )}
          {transaction?.type === "transfer" && (
            <PiHandWithdrawLight color="#83d13a" size={30} />
          )}
        </div>
        <ul className="text-sm">
          {transaction?.type === "transfer" ? (
            <li>
              Transfer to{" "}
              {transaction?.receiverAccountName?.length > 4
                ? transaction?.receiverAccountName.slice(0, 4) + "..."
                : transaction?.receiverAccountName}
            </li>
          ) : (
            <li>
              Recieved from{" "}
              {transaction?.recievedFromSenderName.length > 4
                ? transaction?.recievedFromSenderName.slice(0, 4) + "..."
                : transaction?.recievedFromSenderName}
            </li>
          )}
          <li>{transaction?.date}</li>
        </ul>
      </div>
      <ul className="text-sm">
        {transaction?.type === "withdraw" ? (
          <li className="font-bold">-USD{transaction?.amount}</li>
        ) : (
          <li className="font-bold">+USD{transaction?.amount}</li>
        )}
        <li
          className={`${
            transaction?.status.toLowerCase() === "successful" && "bg-green-700"
          } ${
            transaction?.status.toLowerCase() === "processing" &&
            "bg-yellow-700 text-stone-100"
          } 
  ${
    transaction?.status.toLowerCase() === "failed" &&
    "bg-red-700 text-stone-100"
  }
  text-center text-xs p-1 rounded`}
        >
          {transaction?.status}
        </li>
      </ul>
    </div>
  );
}
