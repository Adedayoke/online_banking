import React, { useState } from 'react';

const FlagDropdown = ({selectedFlag, setSelectedFlag}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const flags = [
    { country: 'Argentina', },
    { country: 'Australia', },
    { country: 'Austria', },
    { country: 'Belgium', },
    { country: 'Brazil', },
    { country: 'Canada', },
    { country: 'Chile', },
    { country: 'China', },
    { country: 'Colombia', },
    { country: 'Croatia',  },
    { country: 'Czech Republic',  },
    { country: 'Denmark', },
    { country: 'Egypt', },
    { country: 'Estonia',  },
    { country: 'Finland',  },
    { country: 'France', },
    { country: 'Germany', },
    { country: 'Greece', },
    { country: 'Hungary', },
    { country: 'Iceland',  },
    { country: 'India', },
    { country: 'Ireland',  },
    { country: 'Israel',  },
    { country: 'Italy', },
    { country: 'Japan', },
    { country: 'Kenya',  },
    { country: 'Latvia',  },
    { country: 'Lithuania',  },
    { country: 'Luxembourg',  },
    { country: 'Malaysia', },
    { country: 'Mexico', },
    { country: 'Netherlands', },
    { country: 'New Zealand', },
    { country: 'Nigeria',  },
    { country: 'Norway', },
    { country: 'Peru', },
    { country: 'Philippines', },
    { country: 'Poland', },
    { country: 'Portugal',  },
    { country: 'Romania', },
    { country: 'Russia', },
    { country: 'Saudi Arabia',  },
    { country: 'South Africa', },
    { country: 'South Korea', },
    { country: 'Spain', },
    { country: 'Sweden', },
    { country: 'Switzerland', },
    { country: 'Taiwan',  },
    { country: 'Thailand', },
    { country: 'Turkey', },
    { country: 'Ukraine',  },
    { country: 'United Arab Emirates',  },
    { country: 'United Kingdom', },
    { country: 'United States'}, 
  ];

  const handleSelect = (country) => {
    setSelectedFlag(country);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {selectedFlag ? selectedFlag : 'Select Country'}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      {isOpen && (
        <div className="overflow-y-auto h-48 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="flags-menu">
            {flags.map((flag) => (
              <div
                key={flag.country}
                onClick={() => handleSelect(flag.country)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                role="menuitem"
              >
                {flag.country}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagDropdown;
