import { toast } from 'react-toastify';

export function loginValidationUtil(email, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email.trim()) {
        toast.error('Email cannot be empty.');
        return false;
    }
    if (!emailPattern.test(email.trim())) {
        toast.error('Invalid email format.');
        return false;
    }

    // Password validation
    if (!password.trim()) {
        toast.error('Password cannot be empty.');
        return false;
    }

    return true; // Return true if all validations pass
}



export function registerUserValidationUtil(name, email, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!name.trim()) {
        toast.error('Name cannot be empty.');
        return false;
    }

    // Email validation
    if (!email.trim()) {
        toast.error('Email cannot be empty.');
        return false;
    }
    if (!emailPattern.test(email.trim())) {
        toast.error('Invalid email format.');
        return false;
    }

    // Password validation
    if (!password.trim()) {
        toast.error('Password cannot be empty.');
        return false;
    }

    return true; // Return true if all validations pass
}
