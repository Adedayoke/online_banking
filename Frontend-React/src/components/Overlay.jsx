import React from 'react'

export default function Overlay({children, extraClass}) {
  return (
    <div className={`flex items-center justify-center absolute z-20 left-0 top-0 w-full h-full bg-customOverlay ${extraClass} `}>{children}</div>
  )
}
