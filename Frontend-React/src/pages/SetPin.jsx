import React, { useState } from "react";
import PinKeypad from "../components/PinKeypad";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserTemPin } from "../slice/authUserSlice";
import { toast } from "react-toastify";

const SetPin = () => {
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.userAuth)
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
  function clearInput(){
    setDigit1("")
    setDigit2("")
    setDigit3("")
    setDigit4("")
}
  function submitPin(){
    const pin = `${digit1}${digit2}${digit3}${digit4}`;
    if (pin.length !== 4) {
        toast.error("PIN must be 4 digits long");
        clearInput()
      return;
    }

    dispatch(setUserTemPin(`${digit1}${digit2}${digit3}${digit4}`))
    navigate("/login/pin/confirm")
}
    if(!currentUser)return <Navigate to="/login" />
  return (
    <div className="flex items-center justify-center flex-col h-svh w-full p-4">
      <div className="w-full md:w-2/5">
        <div className="mb-4 text-xl font-semibold text-center">
            <p>Set your pin</p>
        </div>
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
      <PinKeypad extraClass="md:w-2/6" submitPin={submitPin} cancelDig={cancelDig} handleClick={handleClick} />
    </div>
  );
};

export default SetPin;
