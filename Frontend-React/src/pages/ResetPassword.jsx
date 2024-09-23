import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContainer from "../components/AuthContainer";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present
    if (!token) {
      setIsTokenValid(false);
      toast.error("Token is missing. Please try again.");
      navigate("/forgot-password"); // Redirect to forgot password page
    }
  }, [token, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate password matching
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/auth/forgot-password/reset-password/${token}`, {
        password: password,
      });
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.status === 400) {
        toast.error("Invalid or expired token. Please try again.");
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (!isTokenValid) {
    return null; // Don't render anything if the token is invalid
  }

  return (
    <AuthContainer>
      <form className="p-4 z-20" onSubmit={handleSubmit}>
        <p className="text-xl text-center mb-4 font-bold text-white">
          Enter your new password
        </p>

        <div className="relative mb-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder=" "
            className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
            required
          />
          <label
            className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
        </div>

        <div className="relative mb-4">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder=" "
            className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
            required
          />
          <label
            className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
        </div>

        <button
          type="submit"
          className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthContainer>
  );
};

export default ResetPassword;
