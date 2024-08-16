import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupOne } from "../../slice/authUserSlice";
import ButtonPrimary from "../../components/ButtonPrimary";


export default function SignupOne() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevShowPassword => !prevShowPassword);
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
    setConfirmPasswordError("");
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (passwordError || confirmPasswordError) return;

    // Dispatch the signupOne action
    dispatch(signupOne({ name: `${firstName} ${lastName}`, userName, userPassword }));
    navigate("/signup/two");
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4 text-sm">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          type="text"
          id="firstName"
          name="firstName"
          className="focus:text-customAsh px-3 py-2 border border-none bg-customAsh shadow-sm focus:outline-none focus:bg-white focus:ring-customAsh focus:border-customAsh rounded text-white"
          required
        />
      </div>
      <div className="flex flex-col mb-4 text-sm">
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          className="focus:text-customAsh px-3 py-2 border border-none bg-customAsh shadow-sm focus:outline-none focus:bg-white focus:ring-customAsh focus:border-customAsh rounded text-white"
          required
        />
      </div>
      <div className="flex flex-col mb-4 text-sm">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter desired username"
          type="text"
          id="username"
          name="username"
          className="focus:text-customAsh px-3 py-2 border border-none bg-customAsh shadow-sm focus:outline-none focus:bg-white focus:ring-customAsh focus:border-customAsh rounded text-white"
          required
        />
      </div>
      <div className="border-none bg-customAsh shadow-sm focus:outline-none focus:ring-customAsh focus:border-white flex mb-4 text-sm  border rounded">
        <span className="w-1/12 text-white text-center flex items-center justify-center cursor-pointer">
          <CiLock  size={25} />
        </span>
        <input
          onChange={handlePasswordChange}
          value={userPassword}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className="w-full text-white focus:text-white bg-customAsh px-3 py-2 rounded-md focus:outline-none"
          required
        />
        <span
          className="w-1/12 text-center flex items-center justify-center cursor-pointer text-white"
          onClick={handleTogglePasswordVisibility}
        >
          {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>
      {passwordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">{passwordError}</div>
      )}

      <div className="border-none bg-customAsh shadow-sm focus:outline-none focus:ring-customAsh focus:border-white flex mb-4 text-sm  border rounded">
        <span className="w-1/12 text-white text-center flex items-center justify-center cursor-pointer">
          <CiLock size={25} />
        </span>
        <input
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          className="w-full text-white focus:text-white bg-customAsh px-3 py-2 rounded-md focus:outline-none"
          required
        />
        <span
          className="w-1/12   text-center flex items-center justify-center cursor-pointer text-white"
          onClick={handleToggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? <BiHide size={25} /> : <BiShow size={25} />}
        </span>
      </div>
      {confirmPasswordError && (
        <div className="text-red-500 text-xs mt-2 mb-2">
          {confirmPasswordError}
        </div>
      )}

      <ButtonPrimary disabled={passwordError || confirmPasswordError}>Submit</ButtonPrimary>
      <p className="text-center text-base font-semibold text-white">
          Already have an account?{" "}
          <Link className="text-customGreen" to="/login">
            Login
          </Link>
        </p>
    </form>
  );
}
