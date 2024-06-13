import {useContext, useEffect, useState} from "react";
import {Store} from "../Store.jsx";
import {useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../hooks/userHooks.js";
import {toast} from "react-toastify";
import {registerUserValidationUtil} from "../utils/UserValidationUtil.js";
import {getError} from "../utils/ErrorUtil.js";
import InputFieldComponent from "../components/InputFieldComponent.jsx";


export function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
    const redirect = '/enrollment';
    const { mutateAsync: register, isPending } = useRegisterMutation();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!registerUserValidationUtil(name, email, password)) {
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.', {
                autoClose: 1000
            });
            return;
        }

        try {
            const data = await register({
                name,
                email,
                password
            });
            navigate('/enrollment');
            dispatch({ type: 'USER_SIGNIN', payload: data.userId });
            localStorage.setItem('userInfo', JSON.stringify(data.userId));
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
        <div className="flex justify-evenly items-center h-screen bg-fixed-cover-2 bg-black">
            <div className="p-10">
                <h1 className="font-bold text-5xl my-5 my-10 text-white">Register Now!</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <InputFieldComponent
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <InputFieldComponent
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <InputFieldComponent
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <InputFieldComponent
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" disabled={isPending} className="custom-button w-2/5">
                            Register
                        </button>
                    </div>
                </form>

                <div>
                    <button className="underline text-white text-lg" type="button" onClick={() => navigate('/login')}>
                        &lt; Back To Login
                    </button>
                </div>
            </div>

            <div className="flex items-center">
                <h1>Logo</h1>
            </div>
        </div>
    );
}
