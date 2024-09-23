import React from 'react'
import Overlay from '../components/Overlay'
import AdminNav from '../components/admin_components/AdminNav'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../slice/authUserSlice'
import { ToastContainer } from 'react-toastify'

export default function AdminLayout() {
  const dispatch = useDispatch()
  return (
    <div
    className="h-full bg-lightgray relative overflow-x-hidden overflow-y-auto"

  >
    <ToastContainer />
    <Overlay extraClass="flex-col bg-white">
      <AdminNav />
      <Outlet />
      
    </Overlay>
  </div>
  )
}
