import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../slice/authUserSlice";
import { Navigate, useNavigate } from "react-router-dom";
import PhonePrefixDropdown from "../../components/PhonePrefixesDropdown";
import FlagDropdown from "../../components/FlagDropdown";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupTwo() {
  const { userBasicDetails, signUpOneComplete } = useSelector(
    (state) => state.userAuth
  );
  const [selectedPrefix, setSelectedPrefix] = useState("+972");
  const [selectedFlag, setSelectedFlag] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(""); // Initialize with an empty string

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if all required fields are set
    if (!selectedFlag || !email || !phoneNumber) {
      return; // Handle missing fields
    }

    // Dispatch the signup action
    try {
      const response = await axios.post("http://localhost:5000/users", {
        ...userBasicDetails,
        phone: selectedPrefix + phoneNumber,
        email,
        country: selectedFlag,
        transactions: []
      });
      const response2 = await axios.put("http://localhost:5000/signUpUser", {
        ...userBasicDetails,
        phone: selectedPrefix + phoneNumber,
        email,
        country: selectedFlag,
        transactions: []
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
          <div className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex mb-4 text-sm bg-white">
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
              className="w-full px-3 py-2 rounded-md focus:outline-none"
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
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit" // Add type="submit" to make sure the button triggers form submission
            className="disabled:bg-cyan-400 disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-cyan-500 text-stone-200 w-full my-4 rounded mx-auto"
          >
            Submit
          </button>
        </form>
      ) : (
        <Navigate to="/signup/one" />
      )}
    </>
  );
}
