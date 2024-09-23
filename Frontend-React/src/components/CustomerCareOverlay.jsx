import React, { useContext } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CusCareContext } from "../context/CusCareContext";
// import instagram from "../assets/Instagram.png";
import Mail from "../assets/Mail.png";
// import whatsapp from "../assets/WhatsApp.png";
// import twitter from "../assets/Twitter.png";
import Zangi from "../assets/Zangi.png";
// import facebook from "../assets/Facebook.png";
import logo from "../assets/logo large2.png";
import { FaRegCopyright } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerCareOverlay = () => {
  const { setCustomerCarePage, customerCareMessage } =
    useContext(CusCareContext);
  const { currentUser } = useSelector((state) => state.userAuth);
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div onClick={()=>setCustomerCarePage(false)} className="bg-customOverlay p-4 fixed left-0 top-0 w-full h-full z-50 flex items-center justify-center">
      <div onClick={stopPropagation} className="bg-white shadow-deep h-[400px] md:h-[500px] w-[600px] rounded-2xl overflow-hidden flex items-center flex-col justify-between relative">
        <div
          className="hover:text-red-600 cursor-pointer text-white absolute left-0 top-0 p-2"
          onClick={() => setCustomerCarePage(false)}
        >
          <IoIosArrowRoundBack size={50} />
        </div>
        <div className="h-[100px] w-full bg-secondary flex items-center justify-center">
          <img className="w-[150px] md:w-[200px]" src={logo} alt="" />
        </div>
        <div className="px-2">
          <p className="text-center p-4 text-2xl font-semibold">
            Contact support to {customerCareMessage}
          </p>
          <div className="mt-6 h-[100px] flex flex-wrap items-center justify-center">
            
            <div className="flex items-center flex-col">
              {" "}
              <a
              href={`mailto:montrealtruistfinancial@gmail.com?subject=Request&body=Hello, i will like to ${customerCareMessage}. my email is ${currentUser?.email} and my account number is ${currentUser?.accnumber}`}
              className="flex items-center flex-col mr-4"
            >
              {" "}
              <img
                className="md:w-[60px] w-[40px] cursor-pointer "
                src={Mail}
                alt=""
              />
             
            </a>
              {/* <span className="text-[10px] text-green-600">@montrealtruistfinancial</span> */}
            </div>
            <div className="flex items-center flex-col">
              <a
                href={`zangi://send?user_id=1044335984&message=Hello, I would like to ${customerCareMessage}. My email is ${currentUser?.email} and my account number is ${currentUser?.accnumber}`}
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

            {/* <div className="flex items-center flex-col">
              {" "}
              <img
                className="md:w-[100px] w-[60px] cursor-pointer "
                src={facebook}
                alt=""
              />
              <span className="text-[10px] text-red-600">Unavilable</span>
            </div>
            <div className="flex items-center flex-col">
              {" "}
              <img
                className="md:w-[100px] w-[60px] cursor-pointer "
                src={twitter}
                alt=""
              />
              <span className="text-[10px] text-red-600">Unavilable</span>
            </div>
            <div className="flex items-center flex-col">
              {" "}
              <img
                className="md:w-[100px] w-[60px] cursor-pointer "
                src={instagram}
                alt=""
              />
              <span className="text-[10px] text-red-600">Unavilable</span>
            </div> */}
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

export default CustomerCareOverlay;
