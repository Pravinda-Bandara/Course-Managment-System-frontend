import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputFieldComponent from "../components/InputFieldComponent.jsx";
import {loginValidationUtil} from "../utils/UserValidationUtil.js";
import { Store } from "../Store.jsx";
import { useLoginMutation } from "../hooks/userHooks.js";
import { getError } from "../utils/ErrorUtil.js";

export function LoginPage() {
    const navigate = useNavigate();
    const redirect = '/enrollment';
    const { mutateAsync: login, isPending } = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!loginValidationUtil(email, password)) {
            return;
        }
        try {
            const data = await login({
                email,
                password,
            });
            navigate('/enrollment');
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            toast.error(getError(err), {
                autoClose: 1000,
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo]);

    return (
        <div className="flex justify-evenly items-center h-screen bg-fixed-cover-2 bg-black">
            <div className="p-10">
                <h1 className="text-5xl font-bold text-white mb-4">Hi there,</h1>
                <p className="text-white text-2xl mb-10">
                    Welcome to our <br /> contacts portal
                </p>
                <form onSubmit={handleLogin}>
                    <div>
                        <InputFieldComponent
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e-mail"
                        />
                    </div>
                    <div>
                        <InputFieldComponent
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="custom-button w-1/4">
                        Login
                    </button>
                    <span className="text-white mx-5"> or </span>
                    <button
                        className="underline text-white text-lg mr-7"
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Click here to Register
                    </button>
                </form>
            </div>
            <div className="flex items-center">
                {/*<Logo textColor="text-black" imageSize="w-20" textSize="text-5xl" />*/}
                <h1>Logo</h1>
            </div>
        </div>
    );
}