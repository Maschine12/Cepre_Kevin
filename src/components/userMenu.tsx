"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Button from "./ui/buton";

interface UserMenuProps {
    email: any | null;
    image: any | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ email, image }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* User Profile */}
            <div className="flex items-center gap-3" onClick={toggleMenu}>
                <img
                    src={image || "/default-avatar.png"}
                    alt="User profile"
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
                />
                <span className="cursor-pointer">{email || "Usuario"}</span>
                {/* Dropdown Arrow */}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10"
                    onClick={(e) => e.stopPropagation()} // Prevents closing the dropdown when clicking inside
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                href="#"
                                onClick={() => signOut()}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Salir
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
