import React from 'react'

interface PriceProps {
    title: string,
    price: string,
    tipoPago: string,
    description: string
}


const PriceComponent: React.FC<PriceProps> = ({ price, tipoPago, title, description }) => {
    return (
        <div className="flex flex-col p-5  text-center text-gray-900 bg-[#F1F2F2] rounded-lg border shadow">
            <h3 className="mb-4 text-2xl font-semibold ">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg">{description}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">S/. {price}</span>
            </div>
            <ul className="mb-2 space-y-4">
                <li className="flex items-center space-x-3 content-center align-middle">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                    <span>
                        {tipoPago}
                    </span>
                </li>
            </ul>
        </div>

    )
}

export default PriceComponent