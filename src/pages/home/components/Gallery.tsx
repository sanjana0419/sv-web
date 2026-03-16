import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

// Import Assets
import photographyImg from '../../../assets/auth/photography.png';
import honeymoonImg from '../../../assets/auth/honeymoon.png';
import decorationImg from '../../../assets/auth/decoration.png';
import jewelryImg from '../../../assets/auth/Jewelry.png';

import bg0 from '../../../assets/auth/gallerybackground.png';
import bg1 from '../../../assets/auth/gallerybackground1.png';
import bg2 from '../../../assets/auth/gallerybackground2.png';
import bg3 from '../../../assets/auth/gallerybackground3.png';
import bg5 from '../../../assets/auth/gallerybackground5.png';
import bg6 from '../../../assets/auth/gallerybackground6.png';
import bg7 from '../../../assets/auth/gallerybackground7.png';

const bgs = [bg7, bg1, bg5, bg6, bg3, bg2, bg0];

interface Service {
    title: string;
    count: string;
    image: string;
    icon: string;
}

const services: Service[] = [
    {
        title: 'Photography',
        count: '245+ Experts',
        image: photographyImg,
        icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
    },
    {
        title: 'Honeymoon',
        count: '120+ Packages',
        image: honeymoonImg,
        icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
    },
    {
        title: 'Decoration',
        count: '500+ Themes',
        image: decorationImg,
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
        title: 'Jewellery',
        count: '350+ Stores',
        image: jewelryImg,
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
];

const Gallery: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [bgIndex, setBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % bgs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 60;
        const moveY = (clientY - window.innerHeight / 2) / 60;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    const nextBg = () => setBgIndex((prev) => (prev + 1) % bgs.length);
    const prevBg = () => setBgIndex((prev) => (prev - 1 + bgs.length) % bgs.length);

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full overflow-hidden bg-[#0A0A0A] h-[850px] shadow-2xl group/gallery"
        >
            {/* Cinematic Background Transitions */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={bgIndex}
                    initial={{ opacity: 0, scale: 1.3, filter: 'blur(10px)' }}
                    animate={{
                        opacity: 0.65,
                        scale: 1.1,
                        filter: 'blur(0px)',
                        transition: {
                            opacity: { duration: 2.5, ease: "linear" },
                            scale: { duration: 8, ease: "easeOut" },
                            filter: { duration: 2 }
                        }
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1,
                        transition: { duration: 2.5, ease: "linear" }
                    }}
                    style={{ x: mouseX, y: mouseY }}
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    <img
                        src={bgs[bgIndex]}
                        alt={`Luxury Scene ${bgIndex + 1}`}
                        className="w-full h-full object-cover origin-center"
                    />
                    {/* Deep Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-[#0A0A0A]/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

                    {/* Floating Light Leak / Glow Effect */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                            x: [0, 50, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-1/2 -left-1/2 w-full h-full bg-amber-500/10 blur-[150px] rounded-full"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Decorative Top Floating Title */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6"
            >
                <span className="text-amber-500 font-black text-[11px] tracking-[1em] uppercase mb-6 block drop-shadow-lg">
                    Exquisite Experiences
                </span>
                <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter drop-shadow-[0_15px_45px_rgba(0,0,0,0.8)] leading-tight">
                    Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Traditional Planning</span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-10 opacity-60" />
            </motion.div>

            {/* Content Overlay - Scroller & Buttons */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-24 px-10">

                {/* Horizontal Services Scroller */}
                <div className="flex items-end justify-center gap-12 mb-20 w-full max-w-[1500px] mx-auto overflow-visible">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 120, scale: 0.85 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15,
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -35, scale: 1.05 }}
                            animate={{
                                y: [10, -10, 10],
                                transition: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.7
                                }
                            }}
                            className="relative w-80 h-[480px] group/card rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_45px_90px_-20px_rgba(0,0,0,0.8)] cursor-pointer bg-black/40 backdrop-blur-3xl"

                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover brightness-[0.4] group-hover/card:brightness-100 transition-all duration-1000 group-hover/card:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-95 group-hover/card:opacity-40 transition-opacity duration-1000" />

                                {/* Refined Shine Animation */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover/card:opacity-100 transition-all duration-[1.5s] -translate-x-full group-hover/card:translate-x-full rotate-12" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-12 z-10 translate-y-6 group-hover/card:translate-y-0 transition-transform duration-700">
                                <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.8em] mb-5 leading-none opacity-0 group-hover/card:opacity-100 transition-all duration-700">
                                    {index === 0 ? 'Cinematic' : index === 1 ? 'Destination' : index === 2 ? 'Artistic' : 'Exquisite'}
                                </p>
                                <h4 className="text-white font-sans font-black text-3xl tracking-tighter leading-none mb-3">
                                    {service.title}
                                </h4>
                                <div className="w-0 group-hover/card:w-24 h-1.5 bg-amber-500 mt-8 transition-all duration-700 rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Navigation Only */}
                <div className="flex gap-14">
                    <motion.button
                        onClick={prevBg}
                        whileHover={{ scale: 1.15, x: -8 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-18 h-18 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center text-white/40 hover:border-amber-500/50 hover:text-amber-500 transition-all shadow-2xl"
                    >
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </motion.button>
                    <motion.button
                        onClick={nextBg}
                        whileHover={{ scale: 1.15, x: 8 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-18 h-18 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center text-white/40 hover:border-amber-500/50 hover:text-amber-500 transition-all shadow-2xl"
                    >
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Gallery;

