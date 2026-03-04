import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';

const Navbar: React.FC = () => {
    const { formData } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    const userName = formData.name || 'Member';
    const userInitials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Matches', href: '#' },
        { name: 'Search', href: '#' },
        { name: 'Messages', href: '#' },
        { name: 'Services', href: '#' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-black/20 backdrop-blur-sm py-4'
                }`}
        >
            <div className="max-w-[1500px] mx-auto px-12 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold font-serif ${isScrolled ? 'text-rose-700' : 'text-white'}`}>
                        Shubh Vivah
                    </span>
                </div>

                {/* Menu Items */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium tracking-wide transition-colors duration-300 ${link.name === 'Home' ? 'text-rose-400 border-b-2 border-rose-400' :
                                isScrolled ? 'text-gray-700 hover:text-rose-600' : 'text-white/80 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Section: Icons & Profile */}
                <div className="flex items-center space-x-6">
                    <button className={`p-1.5 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                        <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className={`relative p-1.5 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 group cursor-pointer hover:bg-white/20 transition-all">
                        <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-rose-300 ring-offset-2 ring-offset-transparent">{userInitials}</div>
                        <span className={`text-sm font-semibold hidden md:block ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{userName}</span>
                        <svg className={`w-3 h-3 ${isScrolled ? 'text-gray-500' : 'text-white/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
