import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { CiLock } from "react-icons/ci";

export default function SignupOne() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserPassword(password);

    const error = validatePassword(password);
    setPasswordError(error);
    setConfirmPasswordError(""); // Reset confirm password error when main password changes
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);

    if (userPassword && confirmPwd !== userPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };
  function handleSubmit(){
    if (passwordError || confirmPasswordError)return ;
  }
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4 text-sm">
        <input
          placeholder="First Name"
          type="text"
          id="firstName"
          name="firstName"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col mb-4 text-sm">
        <input
          placeholder="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col mb-4 text-sm">
        <input
          placeholder="Enter desired username"
          type="text"
          id="username"
          name="username"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex mb-4 text-sm bg-white">
        <span className="w-1/12 text-center flex items-center justify-center cursor-pointer">
          <CiLock size={25} />
        </span>
        <input
          onChange={handlePasswordChange}
          value={userPassword}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className="w-full px-3 py-2 rounded-md focus:outline-none"
        />
        <span
          className="w-1/12 text-center flex items-center justify-center cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        >
          {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>
      {passwordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">{passwordError}</div>
      )}

      <div className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex mb-4 text-sm bg-white">
        <span className="w-1/12 text-center flex items-center justify-center cursor-pointer">
          <CiLock size={25} />
        </span>
        <input
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          className="w-full px-3 py-2 rounded-md focus:outline-none"
        />
        <span
          className="w-1/12 text-center flex items-center justify-center cursor-pointer"
          onClick={handleToggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>
      {confirmPasswordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">{confirmPasswordError}</div>
      )}

      <button disabled={passwordError || confirmPasswordError} className="disabled:bg-cyan-400 disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-cyan-500 text-stone-200 w-full my-4 rounded mx-auto">
        Submit
      </button>
    </form>
  );
}
