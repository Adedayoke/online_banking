import React from 'react'
import Overlay from '../components/Overlay'
import AdminNav from '../components/admin_components/AdminNav'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div
    className="h-svh bg-radial-custom relative overflow-x-hidden overflow-y-auto"

  >
    <Overlay extraClass="flex-col">
      <AdminNav />
      <Outlet />
    </Overlay>

  </div>
  )
}
