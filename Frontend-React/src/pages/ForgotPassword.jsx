import React, { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
        email: email,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Email sent. Check your inbox for the reset link.");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContainer>
      <ToastContainer />
      <form className="p-4 z-20" onSubmit={handleSubmit}>
        <p className="text-xl text-center mb-4 font-bold text-white">
          Enter your email to recover account.
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

        <button
          type="submit"
          className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </AuthContainer>
  );
};

export default ForgotPassword;
