import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputFieldComponent from '../components/InputFieldComponent.jsx';
import { Store } from '../Store.jsx';
import { register } from "../hooks/userHooks.js";
import { registerUserValidationUtil } from "../utils/UserValidationUtil.js";
import { getError } from "../utils/ErrorUtil.js";

export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
    const redirect = '/courses';

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!registerUserValidationUtil(name, email, number, password, confirmPassword)) {
            return;
        }

        try {
            const data = await register({ name, email, password, number });

            navigate('/courses');
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            toast.error(getError(err), {
                autoClose: 1000
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Register Now!</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            placeholder="Number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Register
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 underline"
                            onClick={() => navigate('/login')}
                        >
                            &lt; Back To Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
