import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ShefProtected = () => {
    
    const {userInfo} = useSelector(state => state.user);
  
    if((userInfo.is_chef === 0 && userInfo.is_admin === 0)){
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}

export default ShefProtected