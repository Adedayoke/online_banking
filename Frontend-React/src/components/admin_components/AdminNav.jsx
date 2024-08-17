import React, { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { IoSearchSharp } from 'react-icons/io5';

export default function AdminNav() {
    const [userQuery, setUserQuery] = useState("")
    function handleSearch(e){
        setUserQuery(e.target.value)
    }
  return (
    <nav className='flex items-center justify-between bg-coolAsh absolute left-0 top-0 w-full h-16 text-white p-4'>
        <div>Logo</div>
        <form className='flex w-1/3 items-center justify-between border rounded h-full border-customGreen' action="">
            <input value={userQuery} placeholder='Search Name or ID' className='text-base block bg-transparent focus:outline-none h-full w-10/12 px-4 box-border' onChange={(e)=>handleSearch(e)} type="text" />
            <button className=' flex items-center justify-center h-full bg-customGreen w-2/12 font-semibold'>

            <IoSearchSharp size={25} />
            </button>
        </form>
        <div className='text-customGreen'>
        <IoIosNotifications size={25} />
        </div>
    </nav>
  )
}
