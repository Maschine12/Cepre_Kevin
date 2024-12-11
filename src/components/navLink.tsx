// NavLink.tsx
import React from "react";

interface NavLinkProps {
    href: string;
    label: string;
    isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive = false }) => {
    const baseClass =
        "block py-2 px-3 rounded md:p-0 md:border-0 text-lg";
    const activeClass =
        "text-white bg-transparent";
    const inactiveClass =
        "text-gray-900 hover:text-[#E5E5DF]";

    return (
        <a
            href={href}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            aria-current={isActive ? "page" : undefined}
        >
            {label}
        </a>
    );
};

export default NavLink;
