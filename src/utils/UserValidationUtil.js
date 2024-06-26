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





export function registerUserValidationUtil(name, email,number, password, confirmPassword) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberPattern = /^\d{10}$/; // Example pattern for a 10-digit phone number

    // Name validation
    if (!name.trim()) {
        toast.error('Name cannot be empty.', { autoClose: 1000 });
        return false;
    }

    // Email validation
    if (!email.trim()) {
        toast.error('Email cannot be empty.', { autoClose: 1000 });
        return false;
    }
    if (!emailPattern.test(email.trim())) {
        toast.error('Invalid email format.', { autoClose: 1000 });
        return false;
    }

    // Password validation
    if (!password.trim()) {
        toast.error('Password cannot be empty.', { autoClose: 1000 });
        return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        toast.error('Passwords do not match.', { autoClose: 1000 });
        return false;
    }

    // Phone number validation
    if (!number.trim()) {
        toast.error('Phone number cannot be empty.', { autoClose: 1000 });
        return false;
    }
    if (!phoneNumberPattern.test(number.trim())) {
        toast.error('Invalid phone number format. It should be a 10-digit number.', { autoClose: 1000 });
        return false;
    }

    return true; // Return true if all validations pass
}
