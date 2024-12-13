"use client";
import Link from "next/link";
import { useState } from "react";
import NavLink from "./navLink";
import UserMenu from "./userMenu";

function Navbar({ session }: { session: any }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fc6a0a] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/ImagenTecnica2.png" alt="CEPRE UNAJMA" width={"60px"} />
          <span className="self-center text-4xl font-semibold whitespace-nowrap">CEPRE UNAJMA</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-menu"
          aria-expanded={menuOpen}
        >
          <svg
            className={`w-6 h-6 ${menuOpen ? "hidden" : "block"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg
            className={`w-6 h-6 ${menuOpen ? "block" : "hidden"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Navigation menu */}
        <div
          id="navbar-menu"
          className={`${menuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {session ? (
              <>
                <NavLink href={"/dashboard"} label={"Dashboard"} />
                <NavLink href={"/dashboard/profile"} label={"Salir"} />
                <NavLink href={"/precios"} label={"Precios"} />
                <NavLink href={"/cursos"} label={"Cursos"} />
                <NavLink href={"/horario"} label={"Horario"} />
                <UserMenu email={session.user?.email} image={session.user?.image} />
              </>
            ) : (
              <>
                <NavLink href={"/"} label={"Hogar"} />
                <NavLink href={"/about"} label={"Acerca de"} />
                <NavLink href={"/carreras"} label={"Carreras"} />
                <NavLink href={"/precios"} label={"Precios"} />
                <NavLink href={"/login"} label={"Login"} />
                <NavLink href={"/register"} label={"Registro"} />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
