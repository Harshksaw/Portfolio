// components/NavBar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import MobileNav from './MobileNav';

// Fallback navigation items in case import fails
const defaultNavItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Simple scroll handler without dependencies
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Try to import navItems, use default if it fails
  const navItems = defaultNavItems;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-white font-bold text-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Harsh Kumar
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.link} 
                  className="text-white text-base font-medium hover:text-purple-400 transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button (Desktop) */}
        <a 
          href="mailto:mister.harshkumar@gmail.com" 
          className="hidden lg:block py-2 px-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Contact Me
        </a>

        {/* Mobile Navigation */}
        {/* <div className="lg:hidden">
          <MobileNav navItems={navItems} />
        </div> */}
      </div>
    </header>
  );
};

export default NavBar;