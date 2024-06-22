import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {Store} from "../Store.jsx";

const AdminRoute = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    return userInfo.role=='admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
