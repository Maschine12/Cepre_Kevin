import React from 'react';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
}

function Label({ children, ...props }: Props) {
    return (
        <label className=" text-gray-800 text-xl my-3" {...props}>
            {children}
        </label>
    );
}

export default Label;
