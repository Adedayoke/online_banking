import React, { useState } from "react";
import Overlay from "../../../components/Overlay";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Transaction from "../../../components/Transaction";
import axios from "axios";

export default function Transfer() {
  const [receiverAccountName, setReceiverAccountName] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverBank, setReceiverBank] = useState("");
  const [transferError, setTransferError] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("account");
  const { currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);

  function handleSubmit(e) {
    e.preventDefault();
    // Add your form validation logic here
    // If everything is valid, use history.push or a similar method to navigate
    const url =
      selectedRoute === "account"
        ? `/bank/transfer?acctno=${receiverAccountNumber}`
        : `/bank/transfer?acctno=${receiverAccountNumber}&bank=${receiverBank}`;


    // Navigate using your routing mechanism
  }

  return (
    <div className="z-[25] w-full h-full left-0 md:absolute fixed md:left-[20%] md:w-[80%] p-4 overflow-y-auto bg-white">
      <Overlay extraClass="flex-col">
      <form className="p-4 md:w-1/2 w-full z-20" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <p
              onClick={() => setSelectedRoute("account")}
              className={`p-4  text-center font-semibold cursor-pointer basis-1/2 ${
                selectedRoute === "account"
                  ? "border-primary border-b-2 text-primary"
                  : "border-b-0"
              }`}
            >
              TO ACCOUNT
            </p>
            <p
              onClick={() => setSelectedRoute("bank")}
              className={`p-4  text-center font-semibold  cursor-pointer basis-1/2 ${
                selectedRoute === "bank"
                  ? "border-primary border-b-2 text-primary"
                  : "border-b-0"
              }`}
            >
              TO BANK
            </p>
          </div>
          {selectedRoute === "account" ? (
            <>
              <div className="relative mb-4">
                <input
                  value={receiverAccountNumber} // Use the state
                  onChange={(e) => setReceiverAccountNumber(e.target.value)}
                  id="receiverAccountNumber"
                  name="receiverAccountNumber"
                  placeholder="Enter Receiver's Account Number"
                  className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative mb-4">
                <input
                  value={receiverAccountNumber}
                  onChange={(e) => setReceiverAccountNumber(e.target.value)}
                  id="receiverAccountNumber"
                  name="receiverAccountNumber"
                  placeholder="Enter Account Number"
                  className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
                  required
                />
              </div>

              <div className="relative mb-4">
                <input
                  onChange={(e) => setReceiverBank(e.target.value)}
                  value={receiverBank}
                  id="receiverBank"
                  name="receiverBank"
                  placeholder="Enter Receiver's Bank Name"
                  className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {transferError && (
            <div className="text-red-500 text-xs mt-2 mb-2">
              {transferError}
            </div>
          )}
          <Link to={selectedRoute === 'account' ? `/bank/transfer?acctno=${receiverAccountNumber}` : `/bank/transfer?acctno=${receiverAccountNumber}&bank=${receiverBank}`}>
            <button
              type="submit"
              className="disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
            >
              Next
            </button>
          </Link>
        </form>
        <div className="bg-lightgray w-[90%] md:w-1/2 rounded-2xl h-1/2">
          {transactions?.length > 0 ? (
            transactions
              ?.filter((transaction) => transaction.type === "transfer")
              ?.map((transaction) => {
                return (
                  <div className="text-base cursor-pointer p-5 h-14 text-black flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        style={{
                          backgroundImage: `url(${transaction?.bankLogoSource})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="mr-4 w-10 h-10 rounded-full overflow-hidden bg-white p-2"
                      ></div>
                      <ul>
                        <li className="font-semibold text-lg">
                          {transaction?.receiverAccountName}
                        </li>
                        <li className="text-sm">
                          ({transaction?.receiverBankName}){" "}
                          {transaction?.receiverAccountNumber?.slice(5, 10)}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
          ) : (
            <p className="text-center text-white">No Transactions yet.</p>
          )}
        </div>
      </Overlay>
    </div>
  );
}
