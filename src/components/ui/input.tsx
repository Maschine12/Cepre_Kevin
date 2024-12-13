import React from 'react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }
function Input(props: Props) {
    return (
        <input className="mb-3 mt-1.5 w-full border border-gray-300 p-3 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4" 
        placeholder=""
        required
        {...props}
        />
    )
}

export default Input