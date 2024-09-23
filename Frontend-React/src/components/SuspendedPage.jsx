import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo large2.png";
import Mail from "../assets/Mail.png";
import Zangi from "../assets/Zangi.png";
import { FaRegCopyright } from "react-icons/fa6";

const SuspendedPage = () => {
  const { currentUser } = useSelector((state) => state.userAuth);
  return (
    <div className="bg-[#ffffff99] select-none p-4 absolute left-0 top-0 w-full h-full z-50 flex items-center justify-center">
      <div className="bg-white shadow-deep h-[400px] md:h-[500px] w-[600px] rounded-2xl overflow-hidden flex items-center flex-col justify-between relative">
        <div className="h-[100px] w-full bg-secondary flex items-center justify-center">
          <img className="w-[150px] md:w-[200px]" src={logo} alt="" />
        </div>
        <div>
          <h1 className="text-center p-4 text-2xl font-semibold">
            Your Account has been{" "}
            <span
              className={`${
                currentUser?.status?.toLowerCase() === "restricted"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {currentUser?.status}
            </span>
            , contact support to activate
          </h1>
          <div className="mt-6 h-[100px] flex flex-wrap items-center justify-center">
            <div className="flex items-center flex-col">
              {" "}
              <a
                href={`mailto:montrealtruistfinancial@gmail.com?subject=Request&body=Hello, i will like to un${currentUser?.status?.toLowerCase() === "restricted"
                    ? "restrict"
                    : "suspend"} my account. my email is ${currentUser?.email} and my account number is ${currentUser?.accnumber}`}
                className="flex items-center flex-col mr-4"
              >
                {" "}
                <img
                  className="md:w-[60px] w-[40px] cursor-pointer "
                  src={Mail}
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center flex-col">
              <a
                href={`zangi://send?user_id=1044335984&message=Hello, I would like to un${currentUser?.status?.toLowerCase() === "restricted"
                    ? "restrict"
                    : "suspend"}. My email is ${currentUser?.email} and my account number is ${currentUser?.accnumber}`}
                className="flex items-center flex-col"
              >
                <img
                  className="md:w-[100px] w-[60px] cursor-pointer"
                  src={Zangi}
                  alt="Zangi Logo"
                />
              </a>
              <span className="text-[10px] text-green-600">1044335984</span>
            </div>
          </div>
        </div>
        <div className="flex  p-4 items-center justify-center">
          <p className="flex items-center opacity-70">
            <span className="mr-2">
              <FaRegCopyright />
            </span>
            <span>1999</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuspendedPage;
