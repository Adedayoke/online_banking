import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import PhonePrefixDropdown from "../../components/PhonePrefixesDropdown";
import FlagDropdown from "../../components/FlagDropdown";
import axios from "axios";
import { toast } from "react-toastify";
import { uid } from "uid";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function SignupTwo() {
  const { userBasicDetails, signUpOneComplete } = useSelector(
    (state) => state.userAuth
  );
  const [selectedPrefix, setSelectedPrefix] = useState("+972");
  const [selectedFlag, setSelectedFlag] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(""); // Initialize with an empty string

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if all required fields are set
    if (!selectedFlag || !email || !phoneNumber) {
      return; // Handle missing fields
    }

    // Dispatch the signup action
    try {
      const response = await axios.post("http://localhost:5000/users", {
        uid: uid(),
        personalDetails: {...userBasicDetails, phone: selectedPrefix + phoneNumber, email, country: selectedFlag,},
      });
      const response2 = await axios.put("http://localhost:5000/signUpUser", {
        uid: uid(),
        personalDetails: {...userBasicDetails, phone: selectedPrefix + phoneNumber, email, country: selectedFlag,},
      });
      toast.success("Account created successfully")
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error("Error during signup")
    }

    // Navigate to the login page after dispatching
    navigate("/login");
  }

  return (
    <>
      {signUpOneComplete ? (
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 text-sm">
            <FlagDropdown
              selectedFlag={selectedFlag}
              setSelectedFlag={setSelectedFlag}
            />
          </div>
          <div className="border border-customGreen rounded-md shadow-sm focus:outline-none focus:ring-customGreen focus:border-customGreen flex mb-4 text-sm ">
            <PhonePrefixDropdown
              selectedPrefix={selectedPrefix}
              setSelectedPrefix={setSelectedPrefix}
            />
            <input
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
              value={phoneNumber}
              placeholder="Enter phone number"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full bg-transparent px-3 py-2 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col mb-4 text-sm">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email" // Change to "email" for better validation
              id="email"
              name="email"
              className="px-3 py-2 border border-customGreen rounded-md shadow-sm focus:outline-none focus:ring-customGreen focus:border-customGreen bg-transparent"
              required
            />
          </div>
          <ButtonPrimary>Sign Up</ButtonPrimary>
        </form>
      ) : (
        <Navigate to="/signup/one" />
      )}
    </>
  );
}
