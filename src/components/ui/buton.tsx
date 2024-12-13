import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
}

const Button: React.FC<Props> = ({ variant = 'primary', className = '', children, ...props }) => {
    const baseStyles = "font-medium rounded-lg text-lg px-5 py-3 focus:ring-2 focus:outline-none rounded-2xl";
    const variantStyles = {
        primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
        secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300",
        danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
