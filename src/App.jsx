import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import {Store} from "./Store.jsx";
import {useContext} from "react";


function App() {
    const { state } = useContext(Store);
    return (
        <>{state.userInfo && <NavBar />}

            <ToastContainer />
            <Outlet />
        </>
    );
}

export default App;
