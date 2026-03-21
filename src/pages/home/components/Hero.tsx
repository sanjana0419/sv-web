import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

import venueImg from '../../../assets/auth/wedding-venue.jpeg';
import mehndiImg from '../../../assets/auth/wedding-mehndi.png';
import jewelleryImg from '../../../assets/auth/wedding-jewellery.jpeg';
import foodImg from '../../../assets/auth/wedding-food.jpeg';
import decorImg from '../../../assets/auth/wedding-decor.jpeg';
import coupleImg from '../../../assets/auth/wedding-couple.jpeg';
import invitationImg from '../../../assets/auth/wedding-invitation.jpeg';

const images = [
    venueImg,
    mehndiImg,
    jewelleryImg,
    foodImg,
    decorImg,
    coupleImg,
    invitationImg
];

interface HeroProps {
    onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    const navigate = useNavigate();
    const { formData } = useAuth();
    const userName = formData.name || 'Member';

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Marquee Section */}
            <div className="absolute inset-0 flex flex-col justify-around py-12 opacity-85 overflow-hidden transform -rotate-3 scale-110 select-none pointer-events-none">
                {/* Top Row - Moves Right */}
                <motion.div
                    animate={{ x: ['-20%', '0%'] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
                    className="flex gap-8 w-max"
                >
                    {[...images, ...images, ...images].map((img, i) => (
                        <div key={i} className="relative w-80 md:w-[32rem] aspect-video rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/5" />
                        </div>
                    ))}
                </motion.div>

                {/* Middle Row - Moves Left (The "Crossing" row) */}
                <motion.div
                    animate={{ x: ['0%', '-20%'] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
                    className="flex gap-8 w-max ml-[-10%]"
                >
                    {[...images, ...images, ...images].reverse().map((img, i) => (
                        <div key={i} className="relative w-96 md:w-[40rem] aspect-video rounded-[3rem] overflow-hidden shrink-0 shadow-2xl border border-white/5">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/5" />
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Row - Moves Right */}
                <motion.div
                    animate={{ x: ['-20%', '0%'] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
                    className="flex gap-8 w-max"
                >
                    {[...images, ...images, ...images].map((img, i) => (
                        <div key={i} className="relative w-80 md:w-[32rem] aspect-video rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/5" />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks for smooth edges */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-15" />
            </div>

            {/* Main Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-all pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-sans font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                        Welcome back, <span className="text-[#D4AF37]"> {userName}!</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-white/90 font-sans font-medium tracking-tight drop-shadow-xl">
                        Find your perfect life partner
                    </p>
                </motion.div>
            </div>

            {/* Bottom Explore Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <button
                    onClick={onExplore}
                    className="group flex flex-col items-center gap-3 transition-all"
                >
                    <div className="px-10 py-4 rounded-full border border-white/30 backdrop-blur-md bg-white/10 text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-all shadow-2xl">
                        Explore
                        <motion.svg
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </div>
                </button>
            </motion.div>

            {/* Top Right Profile Section */}
            <div className="absolute top-10 right-10 z-30">
                <button 
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-2xl p-1.5 rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/20 transition-all group outline-none"
                >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#801B1B] p-0.5 shadow-xl transition-transform group-hover:scale-110">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative">
                            <span className="text-base font-black text-white">{userName.charAt(0).toUpperCase()}</span>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black shadow-lg" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Hero;
