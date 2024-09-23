import React from 'react';
import logoSign from "../assets/logo sign.png"

export default function Loader() {
  return (
    <div className='w-full flex items-center bg-customOverlay justify-center z-50 h-full fixed left-0 top-0 loader-lg'>
      <div>
        <img src={logoSign} className='w-[60px] animate-scale'  alt="" />
      </div>
    </div>
  )
}
