import React, { useContext, useState } from "react";
import Overlay from "../../../components/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTransferAmount } from "../../../slice/transactionSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import AmountKeyPad from "../../../components/AmountKeyPad";
import axios from "axios";
import { BankContext } from "../../../context/BankContext";

export default function TransferAmount() {
  const [transferError, setTransferError] = useState("");
  const [amount, setAmount] = useState("");
  const { receiverAccountName, receiverAccountNumber, receiverBank } =
    useSelector((state) => state.userCurrentTransfer);
  const { currentUser, currency, symbol } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setconfirmPinForAmount, settransactionSenderSet, settransactionRecieverSet} = useContext(BankContext)
  async function handleSubmit() {
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setTransferError("Please enter a valid amount.");
      return;
    }

    if (+currentUser.balance < +transferAmount) {
      setTransferError("Insufficient funds.");
      return;
    }
    setAmount(+amount)
    settransactionSenderSet({
      type: "transfer",
      receiverBankName: receiverBank,
      receiverAccountName: receiverAccountName,
      receiverAccountNumber: receiverAccountNumber,
      amount: +amount,
    })
    setconfirmPinForAmount(true)

  }
  function handleClick(dig) {
    setAmount((c) => `${c}${dig}`);
  }
  function cancelDig(dig) {
    setAmount((c) =>
      c
        .split("")
        .slice(0, amount.length - 1)
        .join("")
    );
  }
  if (!receiverAccountName || !receiverAccountNumber || !receiverBank) {
    return <Navigate to="/bank/transfer" />;
  }
  
  return (
    <div className="w-full h-full left-0 top-0  z-50 fixed md:left-[20%] md:w-[80%] p-4 overflow-y-auto bg-white">
      <div className=" md:hidden absolute cursor-pointer left-0 top-0 px-2 py-4 z-50 h-10 bg-secondary text-white w-full flex items-center">
        <span className="mr-4" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={30} />{" "}
        </span>
        <span className="text-lg font-semibold">Transfer to Bank</span>
      </div>
      <Overlay extraClass="flex-col bg-white justify-between h-full pt-16 md:pt-10">
        <div className="p-4 md:w-1/2 w-full z-20" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="">
              <div></div>
              <ul>
                <li className="font-semibold uppercase cursor-pointer text-black basis-1/2">
                  {receiverAccountName}
                </li>
                <li className="text-base cursor-pointer text-black basis-1/2">
                  {receiverBank} ({receiverAccountNumber})
                </li>
              </ul>
            </div>
          </div>
          <div className="relative bg-lightgray mb-4 p-4 rounded-lg">
            <p className="text-base">Amount</p>
            <div className="flex items-center">
              <span className="py-2">{symbol}</span>
              <input
                type="text"
                value={amount}
                id="amount"
                name="amount"
                placeholder="0.00"
                className="form__input w-full bg-transparent px-3 pt-3 py-2 focus:outline-none text-lg rounded"
                required
              />
            </div>
            <p className="text-sm opacity-85">Balance: {currentUser.balance}</p>
          </div>

          {transferError && (
            <div className="text-red-500 text-xs mt-2 mb-2">
              {transferError}
            </div>
          )}
        </div>
        <div className="md:w-1/2 mb-20 px-2 md:p-4 w-full justify-center">
          {" "}
          <AmountKeyPad
            toState={receiverBank === "Montreal" ? true : false}
            cancelDig={cancelDig}
            submitPin={handleSubmit}
            handleClick={handleClick}
            extraClass="h-full w-full"
            message={`I want to send ${amount} to ${receiverAccountName}; ${receiverAccountNumber}`}
          />
        </div>
      </Overlay>
    </div>
  );
}
