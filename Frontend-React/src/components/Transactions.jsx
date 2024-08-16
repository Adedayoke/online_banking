import React from "react";
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";

export default function Transactions({
  transaction,
}) {
  console.log(transaction)
  return (
    <div className="text-base text-white flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="mr-4 rounded-full bg-lightGreen p-2">
          {transaction?.type === "withdraw" ? (
            <PiHandDepositLight color="#83d13a" size={30} />
          ) : (
            <PiHandWithdrawLight color="#83d13a" size={30} />
          )}
        </div>
        <ul className="text-sm">
          {transaction?.type === "withdraw" ? (
            <li>
              Withdrawal to{" "}
              {transaction?.destination?.length > 4
                ? transaction.destination.slice(0, 4) + "..."
                : transaction.destination}
            </li>
          ) : (
            <li>
              Recieved from{" "}
              {transaction?.recievedFrom.length > 4
                ? transaction.recievedFrom.slice(0, 4) + "..."
                : transaction.recievedFrom}
            </li>
          )}
          <li>{transaction.date}</li>
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
            transaction?.status === "Successful"
              ? "bg-green-700"
              : "bg-red-700 text-stone-100 "
          } text-center text-xs p-1 rounded`}
        >
          {transaction?.status}
        </li>
      </ul>
    </div>
  );
}
