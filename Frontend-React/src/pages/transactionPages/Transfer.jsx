import React, { useState } from "react";
import Overlay from "../../components/Overlay";
import { Link } from "react-router-dom";

export default function Transfer() {
  const [receiverAccountName, setReceiverAccountName] = useState("")
  const [receiverBank, setReceiverBank] = useState("")
  const [transferError, setTransferError] = useState("")
  function handleSubmit(){

  }
  return (
    <div className="z-[25] w-full h-full left-0 md:absolute md:left-[20%] md:w-[80%] p-4 overflow-y-auto bg-white ">
    <p className="p-4">Transfer to Account</p>
      <Overlay>
      <form className="p-4 w-1/2 z-20" onSubmit={handleSubmit}>
        <p className="text-xl text-center mb-4 font-bold text-secondary">
          Log into your account!
        </p>
        <div className="relative mb-4">
          <input
            value={receiverAccountName}
            onChange={(e) => setReceiverAccountName(e.target.value)}
            id="receiverAccountName"
            name="receiverAccountName"
            placeholder="Enter account number" // Empty placeholder to trigger :not(:placeholder-shown)
            className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
            required
          />
          {/* <label
            className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label> */}
        </div>

        <div className="relative mb-4">
          <input
            onChange={(e)=>setReceiverBank(e.target.value)}
            value={receiverBank}
            id="receiverBank"
            name="receiverBank"
            placeholder=" "
            className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
            required
          />
          {/* <label className="form__label absolute left-2 top-2 opacity-50 text-secondary font-semibold mb-2">
            receiverBank
          </label>
         */}
        </div>

        {transferError && (
          <div className="text-red-500 text-xs mt-2 mb-2">{transferError}</div>
        )}
        <button
          type="submit"
          className="disabled:bg-[#83d03a] disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
        >
          Submit
        </button>
        <p className="text-center text-base font-semibold text-secondary">
          Don't have an account?{" "}
          <Link className="underline" to="/signup/one">
            Next
          </Link>
        </p>
      </form>
      </Overlay>
    </div>
  );
}
