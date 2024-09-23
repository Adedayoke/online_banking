import axios from "axios";
import React, { useEffect, useState } from "react";

const CryptocoinDropdown = ({
  cryptoCurrencies,
  isDropdownOpen,
  selectedCrypto,
  setcryptoCurrencies,
  setIsDropdownOpen,
  toggleDropdown,
  handleCryptoSelect,
}) => {
  return (
    <div className="relative text-xs md:text-base mr-2">
      <div
        onClick={toggleDropdown}
        className="w-full cursor-pointer font-semibold text-left px-2 py-1 border rounded-md flex items-center"
      >
        <span>{selectedCrypto?.symbol}</span>{" "}
        <span className="ml-2">&#9660;</span>
      </div>
      {isDropdownOpen && (
        <ul className="absolute text-sm text-white w-36 bg-coolAsh border  rounded-md shadow-lg mt-2 overflow-y-scroll h-24 z-10">
          {cryptoCurrencies
            ?.filter(
              (cp) =>
                cp.symbol === "BTC" ||
                cp.symbol === "ETH" ||
                cp.symbol === "BNB" ||
                cp.symbol === "USDT"
            )
            ?.map((currency) => (
              <li
                key={currency.symbol}
                onClick={() => handleCryptoSelect(currency)}
                className="px-4 py-2 hover:bg-lightgray hover:text-secondary cursor-pointer"
              >
                {currency.symbol}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CryptocoinDropdown;
