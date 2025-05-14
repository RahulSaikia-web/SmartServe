import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'shadow-lg h-20' : 'shadow-none h-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-full min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="SmartServe Logo"
              className={`transition-all duration-300 object-contain ${
                scrolled ? 'h-14 sm:h-16 w-auto' : 'h-12 sm:h-14 w-auto'
              }`}
            />
          </div>

          {/* Desktop: Search Bar */}
          <div className="hidden sm:flex flex-1 justify-center mx-2 sm:mx-4 min-w-0">
            <div className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for home services..."
                  className={`w-full pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 font-medium transition-all duration-300 text-sm sm:text-base ${
                    scrolled ? 'py-3' : 'py-2'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Icons */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
            {/* Cart Icon */}
            <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
            {/* Account Icon */}
            <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 transform hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="flex sm:hidden items-center flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`sm:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for home services..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 font-medium text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <button className="flex items-center w-full text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Cart
          </button>
          <button className="flex items-center w-full text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;