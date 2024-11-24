import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import { Store } from "./Store.jsx";
import { useContext, useEffect } from "react";
import { setupInterceptors } from "./apiClient.js";
import Footer from "./components/Footer.jsx";

function App() {
    const { state } = useContext(Store);
    const navigate = useNavigate();
    const { userInfo } = state;

    // Set up interceptors when the component mounts
    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    return (
        <div className="min-h-screen relative bg-Background">
            <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
            {/* Overlay for opacity and blur */}
            <div className="min-h-screen flex flex-col relative">
                {userInfo && <NavBar />}
                <main className="flex-grow container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
                    <ToastContainer />
                    <Outlet />
                </main>
                {userInfo && <Footer />}
            </div>
        </div>
    );
}

export default App;
