import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BankContext = createContext();

const BankProvider = ({ children }) => {
  const [cryptoPage, setCryptoPage] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [confirmPinForAmount, setconfirmPinForAmount] = useState(false);
  const [receiptPage, setReceiptPage] = useState(false);
  const [transactionSenderSet, settransactionSenderSet] = useState(null);
  const [transactionRecieverSet, settransactionRecieverSet] = useState(null);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedReceiptPage, setFailedReceiptPage] = useState(false);
  const [bankPage, setBankPage] = useState(false);
  const [currentBank, setCurrentBank] = useState("");
  const [bankInView, setBankInView] = useState(false);

  useEffect(() => {
    async function fetchCryptoCurrencies(retryCount = 5) {
      try {
        const capCryptoRes = await axios.get(
          "https://api.coincap.io/v2/assets"
        );
        const data = capCryptoRes.data.data;

        if (data && data.length > 0) {
          setCryptoCurrencies(data);
        } else {
          throw new Error("No cryptocurrencies found");
        }
      } catch (error) {
        if (retryCount > 0) {
          fetchCryptoCurrencies(retryCount - 1);
        } else {
          toast.error("Failed to load cryptocurrencies.");
        }
      }
    }
    if (bankInView) {
      fetchCryptoCurrencies();
    } else {
      setCryptoCurrencies([]);
    }
  }, [bankInView]);

  return (
    <BankContext.Provider
      value={{
        cryptoPage,
        setCryptoPage,
        cryptoCurrencies,
        confirmPinForAmount,
        setconfirmPinForAmount,
        transactionSenderSet,
        settransactionSenderSet,
        transactionRecieverSet,
        settransactionRecieverSet,
        amount,
        setAmount,
        isLoading,
        setIsLoading,
        receiptPage,
        setReceiptPage,
        failedReceiptPage,
        setFailedReceiptPage,
        bankPage,
        setBankPage,
        currentBank,
        setCurrentBank,
        setBankInView,
        bankInView
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export { BankContext, BankProvider };
