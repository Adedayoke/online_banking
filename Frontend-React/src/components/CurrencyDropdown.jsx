import React from "react";

export default function CurrencyDropdown({
  toggleDropdown,
  selectedCurrency,
  isDropdownOpen,
  currencies,
  handleCurrencySelect,
}) {
  return (
    <div className="relative mr-3 text-stone-700">
      <button
        onClick={toggleDropdown}
        className="w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selectedCurrency} <span className="ml-2 float-right">&#9660;</span>
      </button>
      {isDropdownOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-10">
          {currencies.map((currency) => (
            <li
              key={currency}
              onClick={() => handleCurrencySelect(currency)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
