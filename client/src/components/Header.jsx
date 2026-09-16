import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">🎨 Sketchler</Link>
          
          <button 
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent md:flex gap-8 p-4 md:p-0`}>
            <Link to="/" className="block md:inline text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/portfolio" className="block md:inline text-gray-700 hover:text-blue-600 transition">Portfolio</Link>
            <Link to="/contact" className="block md:inline text-gray-700 hover:text-blue-600 transition">Contact</Link>
            <Link to="/admin" className="block md:inline text-gray-700 hover:text-blue-600 transition">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
