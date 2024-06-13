import React from 'react';

const InputFieldComponent = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="custom-input"
        />
    );
};

export default InputFieldComponent;
