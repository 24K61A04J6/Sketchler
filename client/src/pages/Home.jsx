import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm ring-1 ring-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">🎨 Sketchler</Link>

          <button
            className="rounded-lg p-2 text-slate-700 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`${isOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-16 bg-white p-4 shadow-md md:static md:block md:bg-transparent md:p-0 md:shadow-none`}>
            <div className="flex flex-col gap-3 md:flex md:flex-row md:items-center md:gap-8">
              <Link to="/" className="text-sm font-medium text-slate-700 transition hover:text-amber-700">Home</Link>
              <Link to="/portfolio" className="text-sm font-medium text-slate-700 transition hover:text-amber-700">Portfolio</Link>
              <Link to="/order" className="text-sm font-medium text-amber-700 transition hover:text-amber-800">Order a Portrait</Link>
              <Link to="/track" className="text-sm font-medium text-slate-700 transition hover:text-amber-700">Track Order</Link>
              <Link to="/contact" className="text-sm font-medium text-slate-700 transition hover:text-amber-700">Contact</Link>
              <Link to="/admin" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Admin</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
