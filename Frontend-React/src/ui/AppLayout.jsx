import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function AppLayout() {
  return (
    <div className='h-svh'>
        <Navbar />
            <Outlet />
        <Footer />
    </div>
  )
}
