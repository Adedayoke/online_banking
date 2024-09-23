import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authUserSlice";
import { toast, ToastContainer } from "react-toastify";
import { FaKey } from "react-icons/fa";
import LoaderSmall from "../components/LoaderSmall";
import OTP from "../components/OTP";
const apiUrl = process.env.REACT_APP_API_URL;
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [isLoadingOtp, setIsLoadingOtp] = useState(false)
  const {currentUser} = useSelector(state=>state.userAuth)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Parse the user data from JSON and dispatch it to the Redux store
      dispatch(login(JSON.parse(storedUser)));
      navigate("/bank");
    }
  }, [dispatch, navigate]);

  useEffect(
    function () {
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    },
    [loginError]
  );
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Email and password are required.");
      toast.error("Email and password are required.");
      return;
    }
    try {
      setIsLoading(true);
      const loginResponse = await axios.post(`${apiUrl}/auth/token`, {
        email,
        password,
      });
      const { data } = loginResponse;
      if (data) {
        dispatch(
          login({
            ...data,
          })
        );
        if (data?.verified.toLowerCase() === "false") {
          setOtpState(true);
          setIsLoading(false);
        }
        if (
          data?.pin.toLowerCase() === "false" &&
          data?.verified.toLowerCase() === "true"
        ) {
          return navigate("/login/pin/set");
        }
        if (
          data?.pin.toLowerCase() === "true" &&
          data?.verified.toLowerCase() === "true"
        ) {
          setIsLoading(false);
          toast.success("User logged in successfully");
          return navigate("/bank");
        }
        
      } else {
        setLoginError("Incorrect login or password.");
        setIsLoading(false);
      }
    } catch (err) {

      setLoginError("Login failed. Please try again.");
      setIsLoading(false);
    }
  }
  const handleOtpSubmit = async function (e) {
    e.preventDefault();
    setOtpErr("");  // Reset error state
    setIsLoadingOtp(true)
    if (!/^\d{4}$/.test(otp)) {
      setOtpErr("Please enter a valid 4-digit OTP");
      setIsLoadingOtp(false)
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/auth/otp-verify`, {
        otp: Number(otp),
        email: currentUser?.email,
      });
  
      if (res.data.status === "Verified") {
        setIsLoadingOtp(false)
        const updatedUser = { ...currentUser, verified: "true" };
        if (
          updatedUser?.pin.toLowerCase() === "false"
        ) {
           navigate("/login/pin/set");
           return
        }
        setIsLoadingOtp(false)
        dispatch(login(updatedUser));
        setOtpState(false);
        navigate("/bank");
        toast.success("OTP verified, logging in...");
      } else {
        setIsLoadingOtp(false)
        setOtpErr("OTP verification failed");
      }
    } catch (err) {
      setIsLoadingOtp(false)
      setOtpErr("An error occurred during OTP verification");
    }
  };
  

  return (
    <>
    <ToastContainer />
      <AuthContainer>
        <form className="p-4 z-20" onSubmit={handleSubmit}>
          <p className="text-xl text-center mb-4 font-bold text-white">
            Log into your account!
          </p>
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

          <div className="relative mb-4">
            <input
              onChange={handlePasswordChange}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder=" "
              className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
              required
            />
            <label className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2">
              Password
            </label>
            <span
              className="w-1/12 absolute right-0 top-3 text-secondary text-center flex items-center justify-center cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
            </span>
          </div>

          {loginError && (
            <div className="text-red-500 text-xs mt-2 mb-2">{loginError}</div>
          )}
          <div className="flex items-center justify-end text-base font-semibold text-white">
            <Link to="/forgot-password" className="flex items-center">
              <FaKey />
              <span className="ml-1">Forgot password?</span>
            </Link>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <LoaderSmall extraClass="border-white" />
            </div>
          ) : (
            <button
              type="submit"
              className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
            >
              Submit
            </button>
          )}
          <p className="text-center text-base font-semibold text-white">
            Don't have an account?{" "}
            <Link className="underline" to="/signup/one">
              Sign Up
            </Link>
          </p>
        </form>
      </AuthContainer>
      {otpState && (
        <OTP isLoadingOtp={isLoadingOtp} otp={otp} setOtpState={setOtpState} otpErr={otpErr} setOtp={setOtp} handleOtpSubmit={handleOtpSubmit} />
      )}
    </>
  );
}
