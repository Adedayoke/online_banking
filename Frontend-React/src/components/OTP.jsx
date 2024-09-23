import React, { useState } from "react";
import LoaderSmall from "./LoaderSmall";
import { IoIosArrowRoundBack } from "react-icons/io";

const OTP = ({
  otp,
  setOtpState,
  isLoadingOtp,
  handleOtpSubmit,
  setOtp,
  otpErr,
}) => {
  return (

    <div className="w-full flex items-center p-4 justify-center h-full absolute left-0 top-0 bg-customOverlay z-20">
      <form
        onSubmit={handleOtpSubmit}
        className="h-[50%] lg:w-[30%] flex items-center flex-col bg-white rounded-xl shadow-deep overflow-hidden"
        action=""
      >
        <div
          className="border border-white p-2 md:p-4 text-xl font-bold text-white cursor-pointer bg-secondary w-full flex items-center"
        >
          <span onClick={() => setOtpState(false)} className=" hover:text-red-600">
          <IoIosArrowRoundBack size={30} />
          </span>
          <p className="text-xl ml-2 text-center mb-4 font-bold">
            Check your email for OTP code!!
          </p>
        </div>
        <div className="px-4 py-2">
          <div className="w-full p-4">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="bg-lightgray w-full px-2 py-3 rounded-lg"
              type="text"
            />
          </div>

          {otpErr && (
            <div className="text-red-500 text-center text-xs mt-2 mb-2">{otpErr}</div>
          )}
          {isLoadingOtp ? (
            <div className="flex items-center justify-center p-4">
              <LoaderSmall extraClass="border-black" />
            </div>
          ) : (
            <button className="mt-6 bg-secondary rounded-lg w-full p-2 text-white">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OTP;
