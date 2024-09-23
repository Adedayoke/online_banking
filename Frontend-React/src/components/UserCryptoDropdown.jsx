import React from "react";

export default function UserCryptoDropDown({
  cpToggleDropdown,
  cpSelectedCurrency,
  cpIsDropdownOpen,
  cpCurrencies,
  cpHandleCurrencySelect,
  ref
}) {

  return (
    <div ref={ref} className="relative md:text-base mr-1">
      <button
        onClick={cpToggleDropdown}
        className="w-full text-left flex items-center rounded-md"
      >
        <span className="mr-1 text-xs float-right">&#9660;</span>{cpSelectedCurrency} 
      </button>
      {cpIsDropdownOpen && (
        <ul className="absolute text-xs md:text-sm overflow-y-auto sidebarScroll text-white h-20 md:h-20 w-[100px] bg-coolAsh border rounded-md shadow-lg mt-2 z-10">
          {cpCurrencies.map((currency) => (
            <li
              key={currency?.name}
              onClick={() => cpHandleCurrencySelect(currency)}
              className="px-4 p-1 md:py-2 hover:opacity-95 cursor-pointer"
            >
              {currency?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
