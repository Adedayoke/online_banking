import axios from "axios";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { useDispatch } from "react-redux";
import { login } from "../slice/authUserSlice";
import { toast } from "react-toastify";
import { FaKey } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const loginResponse = await axios.put("http://localhost:5000/loginUser", {
        email,
        password,
      });

      if (loginResponse.data) {
        const userDetailResponse = await axios.get(
          `http://localhost:5000/users?personalDetails.email=${email}`
        );

        if (userDetailResponse.data.length > 0) {
          const user = userDetailResponse.data[0];
          dispatch(
            login({
              ...user,
            })
          );
          toast.success("User LoggedIn Successfully");
          navigate("/");
        } else {
          setLoginError("User details not found.");
          toast.error("User details not found. Try again.");
        }
      } else {
        setLoginError("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoginError("An error occurred. Please try again.");
    }
  }

  return (
    <AuthContainer>
      {/* <p className="text-center text-xl font-bold p-4">Login</p> */}
      <form className="p-4 z-20" onSubmit={handleSubmit}>
        <p className="text-xl text-center mb-4 font-bold text-secondary">
          Log into your account!
        </p>
        <div className="relative mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder=" " // Empty placeholder to trigger :not(:placeholder-shown)
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
        <div className="flex items-center justify-end text-base font-semibold text-secondary">
          <Link className="flex items-center">
            <FaKey />
            <span className="ml-1">Forgot password?</span>
          </Link>
        </div>
        <button
          type="submit"
          className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
        >
          Submit
        </button>
        <p className="text-center text-base font-semibold text-secondary">
          Don't have an account?{" "}
          <Link className="underline" to="/signup/one">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthContainer>
  );
}
