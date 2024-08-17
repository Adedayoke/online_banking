import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import AdminNav from '../../components/admin_components/AdminNav';

export default function Admin() {
  const {currentUser} = useSelector(state=>state.userAuth);
  if (!currentUser || currentUser?.email !== "admin@gmail.com") return <Navigate to="/admin/login" />
  return (
    <div>
      
    </div>
  )
}
