import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BankContext } from "../context/BankContext";
import { useDispatch, useSelector } from "react-redux";
import CryptocoinDropdown from "./CryptocoinDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../slice/authUserSlice";
import { toast } from "react-toastify";
import useRefetchUser from "../hooks/useRefetchUser";
import transactSign from "../assets/htransactw.png";
import LoaderSmall from "./LoaderSmall";
import { CusCareContext } from "../context/CusCareContext";

const apiUrl = process.env.REACT_APP_API_URL;

const CryptoTransaction = () => {
  const { setCryptoPage, cryptoCurrencies, setIsLoading } =
    useContext(BankContext);

  const { customerCarePage, setCustomerCarePage, setCustomerCareMessage } = useContext(CusCareContext);
  const {currentUser, currency} = useSelector((state) => state.userAuth);
  const [usdValue, setUsdValue] = useState(0);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [error, setError] = useState("");
  const [toCrypto, setToCrypto] = useState(true);
  const [cpTransType, setCpTransType] = useState(true);
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(false);
  const { refetchUser, error: errFromReload } = useRefetchUser(setIsLoading);
  const userCryptoCurrencies = [
    {
      symbol: "BTC",
      amount: currentUser?.cryptos[0].btc_balance,
    },
    {
      symbol: "USDT",
      amount: currentUser?.cryptos[0].usdt_balance,
    },
    {
      symbol: "BNB",
      amount: currentUser?.cryptos[0].bnb_balance,
    },
    {
      symbol: "ETH",
      amount: currentUser?.cryptos[0].eth_balance,
    },
  ];

  const handleCryptoSelect = (cur) => {
    setSelectedCrypto(cur);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleUSDValue = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setUsdValue(value);
      if (value > currentUser.balance) {
        setError("Insufficient balance");
      } else {
        setError("");
      }
    }
  };

  useEffect(() => {
    const equUsd = cryptoCurrencies.find(
      (crp) => crp?.symbol === selectedCrypto?.symbol
    );
    if (selectedCrypto && equUsd.priceUsd && !error && !isNaN(usdValue)) {
      setCryptoValue(+usdValue / +equUsd.priceUsd);
    } else {
      setCryptoValue(0);
    }
  }, [usdValue, selectedCrypto, error]);
  useEffect(
    function () {
      const equUsd = cryptoCurrencies.find(
        (crp) => crp?.symbol === selectedCrypto?.symbol
      );
      if (selectedCrypto && equUsd.priceUsd && !error && !isNaN(cryptoValue)) {
        setUsdValue(+cryptoValue * +equUsd.priceUsd);
      } else {
        setUsdValue(0);
      }
    },
    [cryptoValue]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingCrypto(true);
  
    if (!selectedCrypto) {
      setIsLoadingCrypto(false);
      toast.error("Please select a cryptocurrency.");
      return;
    }
  
    const handleTransactionSuccess = () => {
      setIsLoadingCrypto(false);
      toast.success("Transaction Successful");
      setCryptoPage(false);
      refetchUser();
      localStorage.removeItem("transactions");
      localStorage.removeItem("transactions_timestamp");
    };
  
    const handleTransactionError = (message) => {
      setIsLoadingCrypto(false);
      toast.error(message || "Error making transaction");
      setCryptoPage(false);
      refetchUser();
    };
  
    const transactionType = toCrypto ? "buy" : "sell";
    const value = toCrypto ? +usdValue : +cryptoValue;
  
    try {
      const response = await axios.post(
        `${apiUrl}/currency/crypto/${transactionType}`,
        {
          email: currentUser.email,
          amount: value,
          asset: selectedCrypto.symbol,
        }
      );
  
      if (response.data.status === "success") {
        handleTransactionSuccess();
      } else {
        handleTransactionError(response.data.message || "Transaction failed");
      }
    } catch (err) {
      // Handle network or server-side errors
      if (err.response) {
        // Server responded with a status other than 200
        const serverMessage = err.response.data?.message || "Transaction failed.";
        handleTransactionError(serverMessage);
      } else if (err.request) {
        // Request was made but no response was received
        handleTransactionError("No response from server. Please try again.");
      } else {
        // Something else went wrong during request setup
        handleTransactionError(err.message || "Unexpected error occurred.");
      }
    }
  };
  
  const message = encodeURIComponent(
    "Hello, I want to withdraw my ... to this wallet address: ..."
  );
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={()=>setCryptoPage(false)} className="fixed left-0 top-0 p-4 bg-customOverlay px-2 h-svh w-full z-50 flex items-center text-xs md:text-sm justify-center">
      <div onClick={stopPropagation} className="bg-white shadow-xl w-full md:w-2/5 h-3/5  rounded-xl relative p-2 overflow-hidden">
        <div
          onClick={() => setCryptoPage(false)}
          className="absolute -left-[1px] -top-[1px] border border-white p-2 md:p-4 text-xl font-bold text-white hover:text-red-600 cursor-pointer bg-secondary w-[101%] "
        >
          <IoIosArrowRoundBack size={30} />
        </div>
        <form className="mt-11 md:mt-14" onSubmit={handleSubmit}>
          <div className="relative">
            <div className=" rounded-t-lg rounded-r-lg bg-lightgray p-2 flex items-center justify-between text-sm ">
              <ul className="font-semibold flex justify-between items-center text-base">
                <li
                  onClick={() => setCpTransType((cpp) => !cpp)}
                  className={`px-4  cursor-pointer ${
                    cpTransType
                      ? "text-primary border-b-[2px] border-primary"
                      : "text-secondary"
                  }`}
                >
                  Swap
                </li>
                <li
                  onClick={() => setCpTransType((cpp) => !cpp)}
                  className={`px-4 cursor-pointer ${
                    !cpTransType
                      ? "text-primary border-b-[2px] border-primary"
                      : "text-secondary"
                  }`}
                >
                  Withdraw
                </li>
              </ul>
              <p className="opacity-80">
                Balance: {currentUser?.balance.toFixed(3)}
              </p>
            </div>
            {cpTransType ? (
              <>
                {toCrypto ? (
                  <>
                    <div className=" bg-lightgray rounded-b-lg rounded-bl-lg flex items-center justify-between p-2">
                      <div className="font-semibold">{currency}</div>
                      <span>
                        <input
                          value={usdValue}
                          onChange={(e) => handleUSDValue(e)}
                          className={` outline-none border-none bg-transparent ${
                            error ? "text-red-600" : ""
                          }`}
                          placeholder="0"
                          type="text"
                        />
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="bg-lightgray relative rounded-b-lg rounded-bl-lg">
                    <div className="flex items-center justify-between p-2">
                      <CryptocoinDropdown
                        cryptoCurrencies={userCryptoCurrencies}
                        isDropdownOpen={isDropdownOpen}
                        selectedCrypto={
                          !selectedCrypto
                            ? { symbol: "Currency", priceUsd: 1, amount: 0 }
                            : selectedCrypto
                        }
                        toggleDropdown={toggleDropdown}
                        handleCryptoSelect={handleCryptoSelect}
                      />
                      <div className="flex flex-col items-end justify-end w-1/2">
                        <input
                          className=" w-1/2 outline-none border-none bg-transparent"
                          value={cryptoValue}
                          onChange={(e) => setCryptoValue(+e.target.value)}
                          type="range"
                          step="0.0000000001"
                          max={
                            selectedCrypto
                              ? userCryptoCurrencies.find(
                                  (currency) =>
                                    currency.symbol === selectedCrypto.symbol
                                )?.amount || 0
                              : 0
                          }
                        />

                        <div className="text-left text-sm opacity-80">
                          {cryptoValue}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                {cpTransType && (
                  <div className="flex items-center justify-end">
                    <div
                      onClick={() => setToCrypto((ii) => !ii)}
                      className="text-white z-20 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer bg-secondary shadow-md m-2"
                    >
                      <img className="w-6" src={transactSign} alt="S" />
                    </div>
                  </div>
                )}
                {toCrypto ? (
                  <div className="bg-lightgray  relative rounded-lg">
                    <div className="flex items-center justify-between p-2">
                      <CryptocoinDropdown
                        cryptoCurrencies={cryptoCurrencies}
                        isDropdownOpen={isDropdownOpen}
                        selectedCrypto={
                          !selectedCrypto
                            ? { symbol: "Currency", priceUsd: 1 }
                            : selectedCrypto
                        }
                        toggleDropdown={toggleDropdown}
                        handleCryptoSelect={handleCryptoSelect}
                      />
                      <div>
                        <input
                          value={
                            !isNaN(cryptoValue) ? cryptoValue.toFixed(6) : "0"
                          }
                          readOnly
                          className=" outline-none border-none bg-transparent"
                          placeholder="0"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" bg-lightgray rounded-b-lg rounded-bl-lg flex items-center justify-between p-2">
                    <div className="font-semibold">{currency}</div>
                    <span>
                      <input
                        value={usdValue}
                        onChange={handleUSDValue}
                        className={` outline-none border-none bg-transparent ${
                          error ? "text-red-600" : ""
                        }`}
                        placeholder="0"
                        type="text"
                      />
                    </span>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          {!isLoadingCrypto ? (
            cpTransType ? (
              <button
                type="submit"
                className={`bg-primary ${
                  error
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer opacity-100"
                } text-secondary font-semibold rounded p-2 mt-6 w-full`}
                disabled={!!error}
              >
                {toCrypto ? "Buy" : "Sell"}
              </button>
            ) : (
              <div
                onClick={() => {
                  setCustomerCarePage(true)
                  setCustomerCareMessage("transfer Crypto to external wallet")
                }}
                className={`bg-primary text-center block ${
                  error
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer opacity-100"
                } text-secondary font-semibold rounded p-2 mt-6 w-full`}
              >
                Withdraw to External Wallet
              </div>
            )
          ) : (
            <div className="w-full flex items-center justify-center p-3">
              <LoaderSmall />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CryptoTransaction;
