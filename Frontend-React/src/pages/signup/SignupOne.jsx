import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupOne } from "../../slice/authUserSlice";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function SignupOne() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setpassword(password);

    const error = validatePassword(password);
    setPasswordError(error);
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);

    if (password && confirmPwd !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (passwordError || confirmPasswordError) return;

    // Dispatch the signupOne action
    dispatch(
      signupOne({ firstname: firstName, lastname: lastName, username, password })
    );
    navigate("/signup/two");
  };

  return (
    <form className="p-4 text-secondary" onSubmit={handleSubmit}>
      <p className="text-xl text-center text-white mb-4 font-bold">Let's create your account!</p>
      
      {/* First Name */}
      <div className="relative mb-4">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          id="firstName"
          name="firstName"
          placeholder=" " // Empty placeholder to trigger :not(:placeholder-shown)
          className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
          required
        />
        <label
          className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
      </div>

      {/* Last Name */}
      <div className="relative mb-4">
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lastName"
          name="lastName"
          placeholder=" "
          className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
          required
        />
        <label
          className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
      </div>

      {/* Username */}
      <div className="relative mb-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
          placeholder=" "
          className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
          required
        />
        <label
          className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
          htmlFor="username"
        >
          Username
        </label>
      </div>

      {/* Password */}
      <div className="relative mb-4">
        <input
          onChange={handlePasswordChange}
          value={password}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder=" "
          className={`form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none ${passwordError ? "border-b-2 border-red-500": "text-secondary"}`}
          required
        />
        <label className={`form__label ${passwordError ? "text-red-500": "text-secondary"} absolute left-2 top-2 opacity-50 font-semibold mb-2`}>
          Password
        </label>
        <span
          className="w-1/12 absolute right-0 top-3 text-center flex items-center justify-center cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        >
          {!showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>

      {/* Password Error */}
      {passwordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">{passwordError}</div>
      )}

      {/* Confirm Password */}
      <div className="relative mb-4">
        <input
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          id="confirmpassword"
          name="confirmpassword"
          placeholder=" "
          className={`form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none ${confirmPasswordError ? "border-b-2 border-red-500": "text-secondary"}`}
          required
        />
        <label className={`form__label ${confirmPasswordError ? "text-red-500": "text-secondary"} absolute left-2 top-2 opacity-50 font-semibold mb-2`}>
          Confirm Password
        </label>
        <span
          className="w-1/12 absolute right-0 top-3 text-center flex items-center justify-center cursor-pointer"
          onClick={handleToggleConfirmPasswordVisibility}
        >
          {!showConfirmPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>

      {/* Confirm Password Error */}
      {confirmPasswordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">
          {confirmPasswordError}
        </div>
      )}

      {/* Submit Button */}
      <ButtonPrimary disabled={passwordError || confirmPasswordError}>
        Next
      </ButtonPrimary>
      <p className="text-center text-white text-base font-semibold">
        Already have an account?{" "}
        <Link className="underline" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
