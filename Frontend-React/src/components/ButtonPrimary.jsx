import React from 'react'

export default function ButtonPrimary({children, disabled, extraclass}) {
  return (
    <button
        disabled={disabled}
        type="submit" // Ensure the button triggers form submission
        className={`disabled:opacity-80 disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-coolAsh text-white w-full my-4 rounded mx-auto ${extraclass}`}
      >
        {children}
      </button>
  )
}
