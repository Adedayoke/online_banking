import axios from 'axios';
import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { CiLock } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../components/AuthContainer';
import { useDispatch } from 'react-redux';
import { login } from '../slice/authUserSlice';
import { toast } from 'react-toastify';

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
      const loginResponse = await axios.put("http://localhost:5000/loginUser", { email, password });
      
      if (loginResponse.data) {
        const userDetailResponse = await axios.get(`http://localhost:5000/users?email=${email}`);
        
        if (userDetailResponse.data.length > 0) {
          const user = userDetailResponse.data[0];
          dispatch(
            login({
              ...user
            })
          );
          toast.success("User LoggedIn Succesfully")
          console.log("User Details:", user);
          navigate("/");
        } else {
          setLoginError("User details not found.");
          toast.error("User details not found, Try again")
        }
      } else {
        setLoginError("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.")
      }
      
    } catch (err) {
      console.error("Error during login:", err);
      setLoginError("An error occurred. Please try again.");
    }
  }

  return (
    <AuthContainer>
      <p className="text-center text-xl font-bold p-4">Login</p>
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4 text-sm">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex mb-4 text-sm bg-white">
          <span className="w-1/12 text-center flex items-center justify-center cursor-pointer">
            <CiLock size={25} />
          </span>
          <input
            onChange={handlePasswordChange}
            value={password}
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            required
          />
          <span
            className="w-1/12 text-center flex items-center justify-center cursor-pointer"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
          </span>
        </div>

        {/* Display any login errors */}
        {loginError && (
          <div className="text-red-500 text-xs mt-2 mb-2">{loginError}</div>
        )}
        
        <button
          type="submit"
          className="disabled:bg-cyan-400 disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-cyan-500 text-stone-200 w-full my-4 rounded mx-auto"
        >
          Submit
        </button>
      </form>
    </AuthContainer>
  );
}
