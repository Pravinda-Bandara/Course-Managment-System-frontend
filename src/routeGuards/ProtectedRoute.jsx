import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {Store} from "../Store.jsx";


const ProtectedRoute = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
