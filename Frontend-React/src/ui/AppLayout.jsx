import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';

export default function AppLayout() {
  return (
    <div className='h-svh bg-stone-200 relative overflow-x-hidden overflow-y-auto'>
      <ToastContainer />
        <Navbar />
            <Outlet />
        <Footer />
        
    </div>
  )
}
