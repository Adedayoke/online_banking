import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import PhonePrefixDropdown from "../../components/PhonePrefixesDropdown";
import FlagDropdown from "../../components/FlagDropdown";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonPrimary from "../../components/ButtonPrimary";
import LoaderSmall from "../../components/LoaderSmall";

const apiUrl = process.env.REACT_APP_API_URL;

export default function SignupTwo() {
  const { userBasicDetails, signUpOneComplete } = useSelector(
    (state) => state.userAuth
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState("+972");
  const [selectedFlag, setSelectedFlag] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  // State for error messages
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!selectedFlag) {
      errors.selectedFlag = "Please select a country.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (phoneNumber.length < 10) {
      errors.phoneNumber = "Phone number must be at least 10 digits.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const userDetails = {
        ...userBasicDetails,
        phone: selectedPrefix + phoneNumber,
        email,
        country: selectedFlag,
      };

      const response = await axios.post(`${apiUrl}/auth/register`, userDetails);

      if (response.status >= 200 && response.status < 300) {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        if (err.response.status === 400) {
          toast.error("Bad request. Please check the details and try again.");
        } else {
          toast.error("Server error. Please try again later.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  }

  return (
    <>
      {signUpOneComplete ? (
        <form className="p-4" onSubmit={handleSubmit}>
          <p className="text-xl text-center mb-4 font-bold text-white">
            Final Step to Sign Up!
          </p>

          <div className="flex flex-col mb-4 px-3 pt-3 py-2 w-full bg-lightgray rounded-md ">
            <FlagDropdown
              selectedFlag={selectedFlag}
              setSelectedFlag={setSelectedFlag}
            />
            {formErrors.selectedFlag && (
              <p className="text-red-500 text-sm">{formErrors.selectedFlag}</p>
            )}
          </div>

          <div className="px-3 pt-3 py-2 w-full bg-lightgray rounded-md flex mb-4 text-secondary text-lg ">
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
              placeholder="**** *** ***"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full bg-transparent px-3 py-2 rounded-md focus:outline-none"
              required
            />
          </div>
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
          )}

          <div className="relative mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder=" "
              className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
              required
            />
            <label
              className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <LoaderSmall extraClass="border-white" />
            </div>
          ) : (
            <ButtonPrimary>Sign Up</ButtonPrimary>
          )}
        </form>
      ) : (
        <Navigate to="/signup/one" />
      )}
    </>
  );
}
