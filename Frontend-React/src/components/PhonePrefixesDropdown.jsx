import React, { useState } from 'react';

const PhonePrefixDropdown = ({selectedPrefix, setSelectedPrefix}) => {
  
  const [selected, setSelected] = useState(true);

  const phonePrefixes = [
    { country: 'Argentina', prefix: '+54' },
    { country: 'Australia', prefix: '+61' },
    { country: 'Austria', prefix: '+43' },
    { country: 'Belgium', prefix: '+32' },
    { country: 'Brazil', prefix: '+55' },
    { country: 'Canada', prefix: '+1' },
    { country: 'Chile', prefix: '+56' },
    { country: 'China', prefix: '+86' },
    { country: 'Colombia', prefix: '+57' },
    { country: 'Croatia', prefix: '+385' },
    { country: 'Czech Republic', prefix: '+420' },
    { country: 'Denmark', prefix: '+45' },
    { country: 'Egypt', prefix: '+20' },
    { country: 'Estonia', prefix: '+372' },
    { country: 'Finland', prefix: '+358' },
    { country: 'France', prefix: '+33' },
    { country: 'Germany', prefix: '+49' },
    { country: 'Greece', prefix: '+30' },
    { country: 'Hungary', prefix: '+36' },
    { country: 'Iceland', prefix: '+354' },
    { country: 'India', prefix: '+91' },
    { country: 'Ireland', prefix: '+353' },
    { country: 'Israel', prefix: '+972' },
    { country: 'Italy', prefix: '+39' },
    { country: 'Japan', prefix: '+81' },
    { country: 'Kenya', prefix: '+254' },
    { country: 'Latvia', prefix: '+371' },
    { country: 'Lithuania', prefix: '+370' },
    { country: 'Luxembourg', prefix: '+352' },
    { country: 'Malaysia', prefix: '+60' },
    { country: 'Mexico', prefix: '+52' },
    { country: 'Netherlands', prefix: '+31' },
    { country: 'New Zealand', prefix: '+64' },
    { country: 'Nigeria', prefix: '+234' },
    { country: 'Norway', prefix: '+47' },
    { country: 'Peru', prefix: '+51' },
    { country: 'Philippines', prefix: '+63' },
    { country: 'Poland', prefix: '+48' },
    { country: 'Portugal', prefix: '+351' },
    { country: 'Romania', prefix: '+40' },
    { country: 'Russia', prefix: '+7' },
    { country: 'Saudi Arabia', prefix: '+966' },
    { country: 'South Africa', prefix: '+27' },
    { country: 'South Korea', prefix: '+82' },
    { country: 'Spain', prefix: '+34' },
    { country: 'Sweden', prefix: '+46' },
    { country: 'Switzerland', prefix: '+41' },
    { country: 'Taiwan', prefix: '+886' },
    { country: 'Thailand', prefix: '+66' },
    { country: 'Turkey', prefix: '+90' },
    { country: 'Ukraine', prefix: '+380' },
    { country: 'United Arab Emirates', prefix: '+971' },
    { country: 'United Kingdom', prefix: '+44' },
    { country: 'United States', prefix: '+1' }
  ];
  

  const handleSelect = function(prefix){
    setSelectedPrefix(prefix.prefix)
    setSelected(true)
    console.log("hello")
  }
  return (
    <div className="relative w-3/12 inline-block text-left">
      <div
        className="inline-flex justify-center w-full rounded-md border-none  shadow-sm px-4 py-2  text-sm font-medium text-customGreen focus:outline-none"
        id="options-menu"
        onClick={()=>setSelected(false)}
      >
        {selectedPrefix ? selectedPrefix : '+1'}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      <div className={`${selected ? "hidden": "block"} marker:origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-40 overflow-y-auto`}>
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {phonePrefixes.map((prefix) => (
            <div
              key={prefix.country}
              onClick={() => handleSelect(prefix)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              role="menuitem"
            >
              {prefix.country} ({prefix.prefix})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhonePrefixDropdown;
