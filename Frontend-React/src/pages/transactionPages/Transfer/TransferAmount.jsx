import React, { useState } from "react";
import Overlay from "../../../components/Overlay";
import { useSelector } from "react-redux";

export default function TransferAmount() {
  const [receiverAccountName, setReceiverAccountName] = useState("");
  const [receiverBank, setReceiverBank] = useState("");
  const [transferError, setTransferError] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("account");
  const { currentUser } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);

  function handleSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
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
                  value={receiverAccountName}
                  onChange={(e) => setReceiverAccountName(e.target.value)}
                  id="receiverAccountName"
                  name="receiverAccountName"
                  placeholder="Enter receivers account number"
                  className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative mb-4">
                <input
                  value={receiverAccountName}
                  onChange={(e) => setReceiverAccountName(e.target.value)}
                  id="receiverAccountName"
                  name="receiverAccountName"
                  placeholder="Enter account number"
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
                  placeholder="Enter bank name"
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
          <button
            type="submit"
            className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
          >
            Submit
          </button>
        </form>
        <div className="p-4 bg-lightgray w-[90%] rounded-2xl h-1/2"></div>
      </Overlay>
    </div>
  );
}
