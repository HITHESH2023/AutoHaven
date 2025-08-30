import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Import menu icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-900 sticky top-0 z-40 py-5 shadow-md">
      <div className="w-11/12 md:w-4/5 m-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-bold text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
            AutoHaven
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-5 text-sm font-semibold text-white">
          <Link to="/"><li className="px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">HOME</li></Link>
          <Link to="/cars"><li className="px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">CARS</li></Link>
          <Link to="/contact"><li className="px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">CONTACT</li></Link>
          <Link to="/help"><li className="px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">HELP</li></Link>
        </ul>
        
        {/* User Auth Section */}
        <div className="hidden md:flex items-center space-x-5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 cursor-pointer">
                <FaUserCircle size={32} className="text-yellow-500" />
                <p className="text-sm font-bold text-white">{user.firstName}</p>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 text-black">
                  <div className="px-4 py-2 border-b"><p className="font-bold text-gray-800">Signed in as {user.firstName}</p><p className="text-sm text-gray-500 truncate">{user.email}</p></div>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/register"><button className="px-5 py-2 text-yellow-500 font-semibold hover:text-black hover:bg-yellow-500 border border-yellow-500 rounded-md transition-all duration-300">Register</button></Link>
              <Link to="/login"><button className="px-5 py-2 border border-yellow-500 rounded-md text-yellow-500 font-semibold hover:text-black hover:bg-yellow-500 transition-all duration-300">Login</button></Link>
              <Link to="/adminLogin"><button className="px-5 py-2 border border-yellow-500 rounded-md text-yellow-500 font-semibold hover:text-black hover:bg-yellow-500 transition-all duration-300">Admin</button></Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <ul className="flex flex-col items-center space-y-4 py-4 text-white">
            <Link to="/" onClick={toggleMobileMenu}><li className="cursor-pointer">HOME</li></Link>
            <Link to="/cars" onClick={toggleMobileMenu}><li className="cursor-pointer">CARS</li></Link>
            <Link to="/contact" onClick={toggleMobileMenu}><li className="cursor-pointer">CONTACT</li></Link>
            <Link to="/help" onClick={toggleMobileMenu}><li className="cursor-pointer">HELP</li></Link>
            <div className="border-t border-gray-700 w-1/2 my-2"></div>
            {user ? (
              <>
                <li className="text-center">
                  <p className="font-bold text-yellow-500">{user.firstName}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </li>
                <li><button onClick={logout} className="w-full text-center text-red-500">Logout</button></li>
              </>
            ) : (
              <>
                <Link to="/register" onClick={toggleMobileMenu}><li><button className="px-5 py-2 w-full">Register</button></li></Link>
                <Link to="/login" onClick={toggleMobileMenu}><li><button className="px-5 py-2 w-full">Login</button></li></Link>
                <Link to="/adminLogin" onClick={toggleMobileMenu}><li><button className="px-5 py-2 w-full">Admin</button></li></Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;