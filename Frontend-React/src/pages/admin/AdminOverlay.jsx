import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const AdminOverlay = ({children, setPage}) => {
    return (
        <div className="bg-[#00000099] fixed w-full h-full left-0 top-0 flex items-center justify-center px-4">
          <div
            onClick={() => setPage(false)}
            className="absolute left-2 top-6 md:left-10 md:top-10 rounded-full border border-white p-2 md:p-4 text-xl font-bold text-white hover:text-red-600 cursor-pointer"
          >
            <IoIosArrowRoundBack size={50} />
          </div>
          {children}
        </div>
    );
}

export default AdminOverlay;
