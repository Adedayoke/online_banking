import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiHandDepositLight, PiHandWithdrawLight } from "react-icons/pi";

export default function UserTransactions() {
  const navigate = useNavigate();
  const [showState, setShowState] = useState(false);
  const [category, setCategory] = useState("all");
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  
  // Sort transactions by timestamp (descending order)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const menuRef = useRef(null);

  const categories = [
    { category: "all", name: "All Categories" },
    { category: "debit", name: "Debit" },
    { category: "credit", name: "Credit" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter transactions based on the selected category
  const filteredTransactions =
    category === "all"
      ? sortedTransactions
      : sortedTransactions.filter(
          (transaction) => transaction.transaction_type === category
        );

  return (
    <div className="z-20 w-full h-[90%] md:h-full left-0 md:absolute md:left-[10%] lg:left-[13%] md:w-[90%] lg:w-[87%]">
      <div className="md:hidden absolute cursor-pointer left-0 px-4 py-5 bg-lightgray top-0 z-30 h-10 w-full flex items-center">
        <span className="mr-4" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={30} />{" "}
        </span>
        <span className="text-lg font-semibold">Back</span>
      </div>

      <div className="flex-col mt-10 md:mt-0 px-2 items-center justify-center h-full pt-18 md:pt-10">
        <div className="md:bg-white w-full h-full rounded-xl p-2 sidebarScroll overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm md:text-lg mb-2">Transactions</p>
            <div className="relative">
              <div
                onClick={() => setShowState((p) => !p)}
                className="md:text-center text-sm md:text-lg px-2 md:px-0 py-6 cursor-pointer"
              >
                <span className={"text-secondary"}>Category</span>:{" "}
                <span className="cursor-pointer font-semibold text-primary">
                  {categories.find((ct) => ct.category === category)?.name}
                </span>
              </div>
              <ul
                ref={menuRef}
                style={{
                  transition: "all .5s ease-out",
                  transform: showState ? "translateX(0%)" : "translateX(100%)",
                  opacity: showState ? "1" : "0",
                }}
                className="bg-white shadow-soft w-52 text-xs text-secondary rounded-xl overflow-y-auto sidebarScroll absolute left-0 top-[100%] h-20"
              >
                {categories.map((ct, i) => (
                  <li
                    key={i}
                    className="cursor-pointer px-3 py-2"
                    onClick={() => {
                      setCategory(ct?.category);
                      setShowState(false);
                    }}
                  >
                    {ct?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-y-auto sidebarScroll max-h-[85%]">
            <table className="w-full min-h-[full]">
              <thead>{/* Your table headers */}</thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, i) => (
                    <EachTransactionRow key={i} transaction={transaction} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center h-1/2 flex items-center justify-center text-secondary"
                    >
                      <p className="cursor-none">Transactions appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function EachTransactionRow({ transaction }) {
  const {currency} = useSelector(state=>state.userAuth)
  const date = new Date(transaction?.timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return (
    <tr
      key={transaction.id}
      className="text-xs text-black flex items-center justify-between py-2 border"
    >
      <td className="w-[25%] border-r-[1px] pl-2">
        {transaction?.transaction_type === "debit" && (
          <span>
            Transfer to{" "}
            {transaction?.merchant?.length > 4
              ? transaction?.merchant.slice(0, 8) + "..."
              : transaction?.merchant}
          </span>
        )}
        {transaction?.transaction_type === "credit" && (
          <span>
            Received from{" "}
            {transaction?.merchant?.length > 4
              ? transaction?.merchant.slice(0, 8) + "..."
              : transaction?.merchant}
          </span>
        )}
      </td>
      <td className="w-[25%] text-center border-r-[1px] pl-2">
        {`${day}/${month}/${year}`}
      </td>
      <td className="w-[25%] text-center border-r-[1px] pl-2">
        <span
          className={`${
            transaction?.description.toLowerCase() === "success" &&
            "text-green-400"
          } ${
            transaction?.description.toLowerCase() === "processing" &&
            "text-yellow-700"
          } ${
            transaction?.description.toLowerCase() === "failed" &&
            "text-red-700"
          } text-center capitalize text-xs p-[2px] w-[80px] rounded font-bold`}
        >
          {transaction?.description}
        </span>
      </td>
      <td className="w-[25%] text-[10px] text-center border-r-[1px] pl-2">
        {transaction?.transaction_type === "debit" && (
          <span className="font-bold">
            -{currency}{transaction?.amount.toFixed(2)}
          </span>
        )}
        {transaction?.transaction_type === "credit" && (
          <span className="font-bold">
            +{currency}{transaction?.amount.toFixed(2)}
          </span>
        )}
      </td>
    </tr>
  );
}
