import React from 'react'

export default function ButtonSecondary({children, extraClass}) {
  return (
    <button
        type="submit" // Ensure the button triggers form submission
        className={`disabled:opacity-80 disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-customGreen text-customAsh w-full my-4 rounded mx-auto ${extraClass}`}
      >
        {children}
      </button>
  )
}
