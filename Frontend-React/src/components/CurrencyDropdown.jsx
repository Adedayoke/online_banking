import React from "react";

export default function CurrencyDropdown({
  toggleDropdown,
  selectedCurrency,
  isDropdownOpen,
  currencies,
  handleCurrencySelect,
}) {
  return (
    <div className="relative text-base mr-2">
      <button
        onClick={toggleDropdown}
        className="w-full text-left px-2 py-1 border border-customGreen rounded-md "
      >
        {selectedCurrency} <span className="ml-2 float-right">&#9660;</span>
      </button>
      {isDropdownOpen && (
        <ul className="absolute text-white w-full bg-coolAsh border border-customGreen rounded-md shadow-lg mt-2 z-10">
          {currencies.map((currency) => (
            <li
              key={currency}
              onClick={() => handleCurrencySelect(currency)}
              className="px-4 py-2 hover:bg-lightGreen cursor-pointer"
            >
              {currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
