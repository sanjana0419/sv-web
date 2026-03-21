import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Assets
import photographyImg from '../../../assets/auth/photography.png';
import honeymoonImg from '../../../assets/auth/honeymoon.png';
import decorationImg from '../../../assets/auth/decoration.png';
import jewelryImg from '../../../assets/auth/Jewelry.png';

import bg1 from '../../../assets/auth/gallerybackground1.png';
import bg5 from '../../../assets/auth/gallerybackground5.png';
import bg6 from '../../../assets/auth/gallerybackground6.png';
import bg7 from '../../../assets/auth/gallerybackground7.png';
import foodBg from '../../../assets/auth/wedding-food.jpeg';

interface Service {
    title: string;
    subtitle: string;
    image: string;
    bgImage: string;
}

const services: Service[] = [
    {
        title: 'Catering',
        subtitle: 'EXQUISITE FLAVORS',
        image: foodBg,
        bgImage: foodBg
    },
    {
        title: 'Photography',
        subtitle: 'CINEMATIC MOMENTS',
        image: photographyImg,
        bgImage: bg7
    },
    {
        title: 'Honeymoon Planning',
        subtitle: 'ROMANTIC ESCAPES',
        image: honeymoonImg,
        bgImage: bg1
    },
    {
        title: 'Decoration',
        subtitle: 'THEMATIC DECOR',
        image: decorationImg,
        bgImage: bg5
    },
    {
        title: 'Jewellery',
        subtitle: 'BRIDAL COLLECTION',
        image: jewelryImg,
        bgImage: bg6
    },
];

const Gallery: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % services.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-change every 5 seconds
        return () => clearInterval(interval);
    }, [activeIndex]); // Re-run interval when activeIndex changes to reset the timer on manual navigation

    return (
        <div className="relative w-full h-[700px] overflow-hidden bg-black group/gallery font-sans">
            {/* Background Image with Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={services[activeIndex].bgImage}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 md:p-16">
                
                {/* Top Left Title */}
                <div className="absolute top-12 left-12">
                   <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                   >
                        <span className="text-amber-500 text-[10px] tracking-[0.5em] font-bold uppercase mb-2">Exclusive</span>
                        <h2 className="text-4xl md:text-5xl text-white font-light tracking-tight">Our Services</h2>
                   </motion.div>
                </div>

                <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                    {/* Navigation Controls (Bottom Center-ish) */}
                    <div className="flex items-center gap-10 mb-2">
                        <div className="flex gap-4">
                            <button 
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/5 backdrop-blur-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-white/5 backdrop-blur-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        
                        {/* Progress Bar & Number */}
                        <div className="flex items-center gap-6">
                            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-white/60"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                />
                            </div>
                            <span className="text-white text-4xl font-black font-sans tracking-tighter opacity-80">
                                {activeIndex + 1}
                            </span>
                        </div>
                    </div>

                    {/* Services Cards (Bottom Right) */}
                    <div className="flex gap-4 overflow-visible">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0,
                                    scale: activeIndex === index ? 1.05 : 1,
                                    filter: activeIndex === index ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.5) saturate(0.8)',
                                }}
                                whileHover={{ scale: activeIndex === index ? 1.05 : 1.02, filter: 'brightness(1) saturate(1)' }}
                                className={`relative w-44 h-64 rounded-2xl overflow-hidden cursor-pointer border ${activeIndex === index ? 'border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'border-white/5'} backdrop-blur-sm transition-all duration-700`}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <p className="text-[7px] text-white/70 tracking-[0.2em] font-medium mb-1 uppercase">
                                        {service.subtitle}
                                    </p>
                                    <h4 className="text-white text-xs font-bold leading-tight">
                                        {service.title}
                                    </h4>
                                </div>

                                {activeIndex === index && (
                                    <motion.div 
                                        layoutId="activeBorder"
                                        className="absolute inset-0 border-2 border-amber-500/30 rounded-2xl pointer-events-none"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Dust Particles for cinematic effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-200 rounded-full"
                        initial={{ 
                            x: Math.random() * 100 + "%", 
                            y: Math.random() * 100 + "%",
                            opacity: 0
                        }}
                        animate={{ 
                            y: [null, "-10%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ 
                            duration: Math.random() * 5 + 5, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
