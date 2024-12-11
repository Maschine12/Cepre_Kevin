import React from 'react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }
function Input(props: Props) {
    return (
        <input className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500" 
        placeholder=" "
        required
        {...props}
        />
    )
}

export default Input