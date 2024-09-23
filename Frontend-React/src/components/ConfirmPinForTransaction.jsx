import React, { useContext, useState } from "react";
import { BankContext } from "../context/BankContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import logo from "../assets/logo large2.png";
import PinKeypad from "./PinKeypad";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import useRefetchUser from "../hooks/useRefetchUser";

const ConfirmPinForTransaction = () => {
  const {
    setconfirmPinForAmount,
    transactionSenderSet,
    transactionRecieverSet,
    amount, setAmount, setIsLoading, setReceiptPage, setFailedReceiptPage
  } = useContext(BankContext);
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const { refetchUser } = useRefetchUser(setIsLoading);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userAuth);
  const [transferError, setTransferError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTran, setIsLoadingTran] = useState(false)

  function handleClick(dig) {
    if (!digit1) {
      setDigit1(dig);
    } else if (!digit2) {
      setDigit2(dig);
    } else if (!digit3) {
      setDigit3(dig);
    } else {
      setDigit4(dig);
    }
  }

  function cancelDig() {
    if (digit4) {
      setDigit4("");
    } else if (digit3) {
      setDigit3("");
    } else if (digit2) {
      setDigit2("");
    } else {
      setDigit1("");
    }
  }

  function clearInput() {
    setDigit1("");
    setDigit2("");
    setDigit3("");
    setDigit4("");
  }

  async function submitPin() {
    const pin = `${digit1}${digit2}${digit3}${digit4}`;
    console.log(pin);
    if (pin.length !== 4) {
      toast.error("Incorrect pin");
      clearInput();
      return;
    }

    try {
      setIsLoadingTran(true)
      const transactionSetResponse = await axios.post(
        `${apiUrl}/currency/money/send`,
        {
          email: currentUser.email,
          accountNumber: transactionSenderSet?.receiverAccountNumber,
          amount: transactionSenderSet?.amount,
          pin: +pin
        }
      );
      // console.log(transactionSetResponse);
      
      if (transactionSetResponse.status >= 200 && transactionSetResponse.status < 300) {
        if(transactionSetResponse.data.message.toLowerCase() === "transaction successful"){
          setconfirmPinForAmount(false);
          setReceiptPage(true);
          setIsLoadingTran(false)
          toast.success(transactionSetResponse.data);
          refetchUser();
        }else{
          setIsLoadingTran(false)
          setconfirmPinForAmount(false);
          setFailedReceiptPage(true)
          toast.error("incorrect pin")
        }
        // localStorage.removeItem("transactions");
        // localStorage.removeItem("transactions_timestamp");
        return;
      }
    } catch (err) {
      
    }
  }

  // Prevent the overlay from closing when clicking inside the modal content
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={() => setconfirmPinForAmount(false)} className="bg-customOverlay fixed left-0 top-0 w-full h-full z-50 flex items-center justify-center px-4">
      <div onClick={stopPropagation} className="bg-white shadow-deep h-[500px] w-[600px] rounded-2xl overflow-hidden flex items-center flex-col justify-between relative">
        <div
          onClick={() => setconfirmPinForAmount(false)}
          className="absolute left-0 top-0 w-full rounded-full p-2 md:p-4 text-xl font-bold text-white hover:text-red-600 cursor-pointer"
        >
          <IoIosArrowRoundBack size={50} />
        </div>
        <div className="h-[100px] w-full bg-secondary flex items-center justify-center">
          <img className="w-[200px]" src={logo} alt="" />
        </div>
        <div>
          <p className="text-center p-4 text-2xl font-semibold">
            Enter pin to Complete transaction
          </p>
        </div>
        {transferError && (
          <div className="text-red-500 text-xs mt-2 mb-2">
            {transferError}
          </div>
        )}
        <div>
          <div className="flex items-center justify-center mb-10">
            <div className="border text-black text-center mr-4 rounded-lg p-4 w-16 h-16">
              {digit1 && "*"}
            </div>
            <div className="border text-black text-center mr-4 rounded-lg p-4 w-16 h-16">
              {digit2 && "*"}
            </div>
            <div className="border text-black text-center mr-4 rounded-lg p-4 w-16 h-16">
              {digit3 && "*"}
            </div>
            <div className="border text-black text-center mr-4 rounded-lg p-4 w-16 h-16">
              {digit4 && "*"}
            </div>
          </div>
        </div>
        <div className="w-[80%] pb-2">
          <PinKeypad
            isLoadingTran={isLoadingTran}
            submitPin={submitPin}
            cancelDig={cancelDig}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPinForTransaction;
