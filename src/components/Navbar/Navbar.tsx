import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

// Mock user type for demonstration
interface User {
  username: string;
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Mock user state (replace with real auth context)
  const [user, setUser] = useState<User | null>(null);

  // Handle scroll effect for navbar shadow and height
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Mock login/logout toggle (replace with real auth logic)
  const toggleLogin = () => {
    setUser(user ? null : { username: 'JohnDoe' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg h-20' : 'h-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="SmartServe Logo"
              className={`object-contain transition-all duration-300 ${
                scrolled ? 'h-14 sm:h-16' : 'h-12 sm:h-14'
              }`}
            />
          </Link>

          {/* Desktop: Search Bar */}
          <div className="hidden sm:flex flex-1 justify-center mx-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for home services..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 text-sm sm:text-base transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop: Cart and Login/Username */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            {/* Login Button or Username Initial */}
            {user ? (
              <Link to="/profile" className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-all duration-200">
                {user.username.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </Link>
            )}
            {/* Mock toggle for testing (remove in production) */}
            <button onClick={toggleLogin} className="text-xs text-gray-500">
              Toggle Login
            </button>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="flex sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`sm:hidden bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="p-4">
          {/* Mobile: Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for home services..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {/* Mobile: Cart Link */}
          <Link
            to="/cart"
            className="flex items-center w-full text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
          </Link>
          {/* Mobile: Login or Username */}
          {user ? (
            <Link
              to="/profile"
              className="flex items-center w-full text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
            >
              <div className="w-6 h-6 mr-3 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {user.username.charAt(0).toUpperCase()}
              </div>
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center w-full text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;