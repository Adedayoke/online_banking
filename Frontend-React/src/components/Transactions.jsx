import React from "react";
import { PiHandWithdrawLight,PiHandDepositLight  } from "react-icons/pi";

export default function Transactions({
  personalDetails: { userName },
  transaction,
}) {
  return (
    <div className="text-base flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="mr-4 rounded-full bg-cyan-200 p-2">
          {transaction?.type === "withdraw" ? (
            <PiHandDepositLight color="#164e63" size={30} />
          ) : (
            <PiHandWithdrawLight color="#164e63" size={30} />
          )}
        </div>
        <ul className="text-base">
          {transaction?.type === "withdraw" ? (
            <li>
              Withdrawal to{" "}
              {userName?.length > 4 ? userName.slice(0, 4) + "..." : userName}
            </li>
          ) : (
            <li>
              Recieved from{" "}
              {transaction.recievedFrom > 4
                ? transaction.recievedFrom.slice(0, 4) + "..."
                : transaction.recievedFrom}
            </li>
          )}
          <li>{transaction.date}</li>
        </ul>
      </div>
      <ul>
        {transaction?.type === "withdraw" ? (
          <li className="font-bold">-USD{transaction?.amount}</li>
        ) : (
          <li className="font-bold">+USD{transaction?.amount}</li>
        )}
        <li className={`${transaction?.status === "Successful" ? "bg-green-300" : "bg-red-700 text-stone-100 text-center" } p-1 rounded`}>{transaction?.status}</li>
      </ul>
    </div>
  );
}
