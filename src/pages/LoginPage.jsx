import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputFieldComponent from "../components/InputFieldComponent.jsx";
import { loginValidationUtil } from "../utils/UserValidationUtil.js";
import { Store } from "../Store.jsx";

import { getError } from "../utils/ErrorUtil.js";
import {login} from "../hooks/userHooks.js";

export function LoginPage() {
    const navigate = useNavigate();
    const redirect = '/courses';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!loginValidationUtil(email, password)) {
            return;
        }
        setIsPending(true);
        try {
            const data = await login({ email, password });
            navigate(redirect);
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            toast.error(getError(err), { autoClose: 1000 });
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Hi there!</h1>
                <p className="text-gray-700 mb-6">
                    Welcome to our <br /> Courses Management System
                </p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full  hover:bg-blue-700"
                    >
                        Login
                    </button>
                    <span className="text-gray-700 mx-4">or</span>
                    <button
                        className="text-blue-500 underline"
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Click here to Register
                    </button>
                </form>
            </div>
        </div>
    );
}
