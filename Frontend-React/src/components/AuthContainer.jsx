import React from 'react';
import background from './background.jpeg';

export default function AuthContainer({children}) {
  return (
    <div 
      className="flex items-center justify-center h-5/6 p-4"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-stone-100 rounded shadow-md h-fit w-4/5 md:w-1/2 lg:w-1/3">
        {children}
      </div>
    </div>
  );
}
