import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4 px-12">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Pastree</Link>
        </div>

        {/* Navigation Links */}
        <div className={`hidden md:flex space-x-6  ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/pastes" className="hover:text-gray-300">
            Pastes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditional rendering based on state) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block text-center py-2 hover:text-gray-300">
          Home
        </Link>
        <Link to="/pastes" className="block text-center py-2 hover:text-gray-300">
          Pastes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
