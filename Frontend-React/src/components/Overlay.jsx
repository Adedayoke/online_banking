import React from 'react'

export default function Overlay({children}) {
  return (
    <div className="flex items-center justify-center absolute z-10 left-0 top-0 w-full h-full bg-customOverlay ">{children}</div>
  )
}
