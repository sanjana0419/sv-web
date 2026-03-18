import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
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

                {/* Right Section: Profile */}
                <div className="flex items-center space-x-6">
                    <div 
                        onClick={() => navigate('/profile')}
                        className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 group cursor-pointer hover:bg-white/20 transition-all"
                    >
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
