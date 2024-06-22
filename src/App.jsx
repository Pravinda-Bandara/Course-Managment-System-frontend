import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Outlet, useNavigate} from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import {Store} from "./Store.jsx";
import {useContext, useEffect} from "react";
import {setupInterceptors} from "./apiClient.js";


function App() {


    const { state } = useContext(Store);
    const navigate = useNavigate();
// Set up interceptors when the component mounts
    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);
    return (
        <>{state.userInfo && <NavBar />}

            <ToastContainer />
            <Outlet />
        </>
    );
}

export default App;
