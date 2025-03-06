import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => `
    px-4 py-2 rounded-lg transition duration-300 ease-in-out
    ${isActive(path) 
      ? 'bg-white text-blue-600 shadow-sm' 
      : 'text-white hover:bg-white/10'}
  `;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-white hover:text-blue-100 transition duration-300">
              LostLuggage
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link to="/report" className={navLinkClass('/report')}>
              Report Lost Luggage
            </Link>
            <Link to="/search" className={navLinkClass('/search')}>
              Search
            </Link>
            <Link to="/login" className={navLinkClass('/login')}>
              Login
            </Link>
            <Link to="/register" className={navLinkClass('/register')}>
              Register
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`${navLinkClass('/')} block`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`${navLinkClass('/report')} block`}
              onClick={() => setIsMenuOpen(false)}
            >
              Report Lost Luggage
            </Link>
            <Link 
              to="/search" 
              className={`${navLinkClass('/search')} block`}
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link 
              to="/login" 
              className={`${navLinkClass('/login')} block`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`${navLinkClass('/register')} block`}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 