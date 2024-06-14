import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";


function App() {
    return (
        <>
            <NavBar />
            <ToastContainer />
            <Outlet />
        </>
    );
}

export default App;
