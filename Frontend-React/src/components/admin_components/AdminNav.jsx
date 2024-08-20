import axios from 'axios';
import React, { useState } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../slice/adminUserSlice';

export default function AdminNav() {

    const [userQuery, setUserQuery] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch(e){
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/users?uid=${userQuery}`);
        dispatch(searchUser(response.data));
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

  return (
    <nav className='flex items-center justify-between bg-coolAsh left-0 top-0 w-full h-16 text-white p-4'>
        <div>Logo</div>
        <form onSubmit={handleSearch} className='flex w-1/3 items-center justify-between border rounded h-full border-customGreen'>
            <input 
              value={userQuery} 
              placeholder='Search Name or ID' 
              className='text-base block bg-transparent focus:outline-none h-full w-10/12 px-4 box-border' 
              onChange={(e)=>setUserQuery(e.target.value)} 
              type="text" 
            />
            <button className='flex items-center justify-center h-full bg-customGreen w-2/12 font-semibold'>
              <IoSearchSharp size={25} />
            </button>
        </form>
        <div className='text-customGreen'>
          <IoIosNotifications size={25} />
        </div>
    </nav>
  )
}
