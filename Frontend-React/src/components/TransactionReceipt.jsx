import React, { useContext } from "react";
import checkmarkAnimation from "../lottieAnimation/checkmarkAnimation.json";
import Lottie from "lottie-react";
import { BankContext } from "../context/BankContext";
import { useNavigate } from "react-router-dom";

const TransactionReceipt = ({ receiverName, senderName, status }) => {
  const { setReceiptPage } = useContext(BankContext);
  const navigate = useNavigate();
  const downloadReceipt = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Transaction Receipt\n\nReceiver Name: ${senderName}\nReceiver Account: ${receiverName}\nTransaction Status: ${status}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "transaction_receipt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      onClick={() => {
        setReceiptPage(false);
        navigate("/bank");
      }}
      className="bg-customOverlay fixed left-0 top-0 w-full h-full z-50 flex items-center justify-center"
    >
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center flex-col">
          <Lottie
            speed={1}
            className="w-3/4 h-full"
            animationData={checkmarkAnimation}
            loop={true}
          />
          <p className="text-xl font-bold">Transaction Successful</p>
        </div>

        {/* <div className="mt-4">
          <p className="text-gray-700 font-semibold">Sender Name:</p>
          <p className="text-gray-900">{senderName}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 font-semibold">
            Receiver :
          </p>
          <p className="text-gray-900">{receiverName}</p>
        </div> */}

        {/* <div className="mt-4">
          <p className="text-gray-700 font-semibold">Transaction Status:</p>
          <p
            className={`font-bold ${
              status === "Success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </div> */}
        <button
          onClick={() => {
            setReceiptPage(false);
            navigate("/bank");
          }}
          className="bg-secondary mt-6 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>

        {/* <div className="mt-6 text-center">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={downloadReceipt}
          >
            Download Receipt
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TransactionReceipt;
