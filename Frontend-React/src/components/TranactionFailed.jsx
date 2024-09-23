import React, { useContext } from 'react';
import failedAnimation from "../lottieAnimation/failedAnimation.json"
import { BankContext } from '../context/BankContext';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const TranactionFailed = () => {
    const {setFailedReceiptPage} = useContext(BankContext)
    const navigate = useNavigate()
    return (
        <div
      onClick={() => {
        setFailedReceiptPage(false);
        navigate("/bank");
      }}
      className="bg-customOverlay fixed left-0 top-0 w-full h-full z-50 flex items-center justify-center"
    >
      <div className="bg-white w-[50%] md:w-[30%]  border-2 border-gray-300 rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center flex-col">
          <Lottie
            speed={1}
            className="w-3/4 h-full"
            animationData={failedAnimation}
            loop={true}
          />
          <p className="text-xl font-bold">Transaction Failed</p>
        </div>

        <button
          onClick={() => {
            setFailedReceiptPage(false);
            navigate("/bank");
          }}
          className="bg-secondary mt-6 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
    </div>
    );
}

export default TranactionFailed;
