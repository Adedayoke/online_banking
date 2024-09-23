import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Pin = () => {
   

    return (
        <div>
            <Navigate to="/login/pin/set" />
            <Outlet />
        </div>
    );
}

export default Pin;
