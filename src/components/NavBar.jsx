// NavBar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Store} from "../Store.jsx";


const NavBar = () => {
    const { state, dispatch } = useContext(Store);
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center px-36 ">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/courses" className="text-white hover:text-gray-300">Courses</Link>
                </li>
                {state.userInfo.role === 'admin' && (
                    <li>
                        <Link to="/admin/users" className="text-white hover:text-gray-300">Users</Link>
                    </li>
                )}
            </ul>
            <div className="flex items-center space-x-4">
                <span className="text-white">{state.userInfo.name}</span>
                <button
                    onClick={logoutHandler}
                    className="text-white hover:text-gray-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
