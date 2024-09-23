import React, { useState } from "react";
import PinKeypad from "../components/PinKeypad";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ConfirmPin = () => {
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const { currentUser } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const {userSetPin} = useSelector(state=>state.userAuth)
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to get user id from uid
  const getUserIdByUid = async (uid) => {
    // try {
    //   const response = await axios.get('http://localhost:5000/users');
    //   const users = response.data;
    //   const user = users.find(user => user.uid === uid);
    //   return user ? user.id : null;
    // } catch (err) {
    //   console.error("Error fetching users:", err);
    //   return null;
    // }
  };
  function clearInput(){
    setDigit1("")
    setDigit2("")
    setDigit3("")
    setDigit4("")
}

  async function submitPin() {
    const pin = `${digit1}${digit2}${digit3}${digit4}`;

    if(pin !== userSetPin){
        toast.error("Passwords dont match");
        clearInput()
        return
    }
    if (pin.length !== 4) {
        toast.error("PIN must be 4 digits long");
        clearInput()
      return;
    }

    // const userId = await getUserIdByUid(currentUser.uid);
    // if (!userId) {
    //   console.log("User not found");
    //   return;
    // }

    try {
      const response = await axios.post(`${apiUrl}/auth/setpin`, { email: currentUser.email, pin: Number(pin) });
      if(response.status === 200 || response.status === 201 || response.status === "success"){
        console.log(response);
        navigate("/bank");
      }
    } catch (err) {
      console.error("Error updating PIN:", err);
    }
  }

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
  if(!currentUser)return <Navigate to="/login" />
  return (
    <div className="flex items-center justify-center flex-col h-svh w-full p-4">
      <div className="w-full md:w-2/5">
        <div className="mb-4 text-xl font-semibold text-center">
          <p>Confirm pin</p>
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

export default ConfirmPin;
