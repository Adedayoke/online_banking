import React, { useContext } from "react";
import cashapp from "../assets/cashapp.png";
import venmo from "../assets/venmo.webp";
import paypal from "../assets/paypal.webp";
import e_transfer from "../assets/e_transfer.png";
import zelle from "../assets/zelle.png";
import moneyGram from "../assets/moneyGram.png";
import remitly from "../assets/remitly.png";
import chime from "../assets/chime.png";
import boa from "../assets/boa.png";
import { BankContext } from "../context/BankContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import logo from "../assets/logo large2.png";
import { CusCareContext } from "../context/CusCareContext";

const BankDisplay = () => {
    const {setCustomerCarePage, setCustomerCareMessage} = useContext(CusCareContext)
  const banks = [
    { name: "Bank Of America",
        src: boa
     },
    { name: "Cash App",
        src: cashapp
     },
    { name: "Chime",
        src: chime
     },
    { name: "E-transfer",
        src: e_transfer
     },
    { name: "Money Gram",
        src: moneyGram
     },
    { name: "Paypal",
        src: paypal
     },
    { name: "Remitly",
        src: remitly
     },
    { name: "Venmo",
        src: venmo
     },
    {name: "Zelle", src: zelle},
  ];
  const { setBankPage } = useContext(BankContext);
  function stopPropagation(e) {
    e.preventDefault();
  }
  return (
    <div className="bg-customOverlay p-4 absolute left-0 top-0 w-full h-full z-50 flex items-center justify-center">
      <div
        onClick={stopPropagation}
        className="bg-white shadow-deep h-[400px] md:h-[500px] w-[600px] rounded-2xl overflow-hidden flex items-center flex-col relative"
      >
        <div
          className="hover:text-red-600 cursor-pointer text-white absolute left-0 top-0 p-2"
          onClick={() => setBankPage(false)}
        >
          <IoIosArrowRoundBack size={50} />
        </div>
        <div className="h-[100px] w-full bg-secondary flex items-center justify-center">
          <img className="w-[150px] md:w-[200px]" src={logo} alt="" />
        </div>
        <div className="h-[70%] w-full overflow-y-auto">
          <p className="text-center p-4 text-2xl font-semibold">Choose bank for withdrawal:</p>
          <div className="mt-6 h-[100px] grid grid-cols-2 gap-4 items-center justify-center mx-auto w-1/2">
            {banks.map((bank) => (
              <EachBank key={bank?.name} bankSrc={bank} />
            ))}
            <div onClick={()=>{
                setBankPage(false)
                setCustomerCarePage(true)
                setCustomerCareMessage(` withdraw to your account`)
            }} className="w-[100px] h-[100px] bg-lightgray border-dashed border-4 rounded-xl flex items-center justify-center font-semibold text-lg text-gray-400 cursor-pointer">
                <span>Other</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDisplay;

function EachBank({bankSrc}) {
    const {setBankPage} = useContext(BankContext)
    const {setCustomerCarePage, setCustomerCareMessage} = useContext(CusCareContext)
  return (
    <div onClick={()=>{
        setBankPage(false)
        setCustomerCarePage(true)
        setCustomerCareMessage(` withdraw to your ${bankSrc?.name} account`)
        }}>
      <img className="w-[100px] cursor-pointer" src={bankSrc?.src} alt={`${bankSrc?.name}`} />
    </div>
  );
}
