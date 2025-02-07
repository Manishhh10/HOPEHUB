// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import HopehubLogo from '../assets/HopehubLogo.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow sticky top-0 z-[1000]">
      <div className="flex items-center">
        <Link to="/" className="flex items-center no-underline">
          <img
          src={HopehubLogo}
            alt="Logo"
            className="h-10 w-20 mr-2"
          />
        </Link>
      </div>

      <ul className="flex justify-evenly w-[50%] list-none m-0 p-0 gap-8">
        <li>
          <Link
            to="/"
            className="group relative py-2 text-base font-medium text-gray-600 transition-colors duration-200 ease-in-out hover:text-[#059212]"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#059212] transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-right"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="group relative py-2 text-base font-medium text-gray-600 transition-colors duration-200 ease-in-out hover:text-[#059212]"
          >
            Signup
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#059212] transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-right"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="group relative py-2 text-base font-medium text-gray-600 transition-colors duration-200 ease-in-out hover:text-[#059212]"
          >
            Login
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#059212] transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-right"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
