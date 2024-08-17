import axios from "axios";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slice/authUserSlice";
import { toast } from "react-toastify";
import { FaKey } from "react-icons/fa";
import AuthContainer from "../../components/AuthContainer";

export default function AdminLogin() {
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
      const loginResponse = await axios.put("http://localhost:5000/loginAdmin", {
        email,
        password,
      });

      if (loginResponse.data) {
        const userDetailResponse = await axios.get(
          `http://localhost:5000/admin?email=${email}`
        );

        if (userDetailResponse.data.length > 0) {
          const user = userDetailResponse.data[0];
          dispatch(
            login({
              ...user,
            })
          );
          toast.success("Admin Logged in Successfully");
          navigate("/admin");
        } else {
          setLoginError("Invalid admin login details");
          toast.error("Invalid admin login details. Try again.");
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
        <div className="flex flex-col mb-4 text-sm">
          <label
            className="text-base text-stone-100 font-semibold mb-2"
            htmlFor="email"
          >
            Admin Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            className="px-3 focus:text-customGreen py-2 border border-customGreen bg-transparent shadow-sm focus:outline-none focus:bg-white focus:ring-customGreen focus:border-customGreen rounded"
            required
          />
        </div>
        <div>
          <label
            className="text-base text-stone-100 font-semibold mb-2"
            htmlFor="password"
          >
            Admin Password
          </label>
          <div className="border-customGreen bg-transparent shadow-sm focus:outline-none focus:ring-customGreen focus:border-customGreen flex mb-4 text-sm  border rounded">
            <span className="w-1/12 text-white text-center flex items-center justify-center cursor-pointer">
              <CiLock size={25} />
            </span>
            <input
              onChange={handlePasswordChange}
              value={password}
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full text-white bg-transparent px-3 py-2 rounded-md focus:outline-none"
              required
            />
            <span
              className="w-1/12 text-white text-center flex items-center justify-center cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
            </span>
          </div>
        </div>

        {loginError && (
          <div className="text-red-500 text-xs mt-2 mb-2">{loginError}</div>
        )}
        {/* <div className="flex items-center justify-end text-base font-semibold text-customGreen">
          <Link className="flex items-center">
            <FaKey />
            <span className="ml-1">Forgot password?</span>
          </Link>
        </div> */}
        <button
          type="submit"
          className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-[#06151a] text-[#83d03a] w-full my-4 rounded mx-auto"
        >
          Submit
        </button>
        
      </form>
    </AuthContainer>
  );
}
