import React from 'react';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
}

function Label({ children, ...props }: Props) {
    return (
        <label className="block text-gray-800 p-2" {...props}>
            {children}
        </label>
    );
}

export default Label;
