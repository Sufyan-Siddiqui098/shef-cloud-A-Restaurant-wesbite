import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthProtected = () => {
    const {userInfo} = useSelector(state => state.user);

    if(!userInfo){
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default AuthProtected