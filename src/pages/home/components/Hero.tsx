import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import venueImg from '../../../assets/auth/wedding-venue.jpeg';
import mehndiImg from '../../../assets/auth/wedding-mehndi.jpeg';
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

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${images[currentIndex]})` }}
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Specific overlay from reference: dark at edges, clearer in center */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>

            {/* Content: Centered Welcome Text with Glassmorphism */}
            <div className="absolute inset-0 flex items-center justify-center pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/20 backdrop-blur-md px-10 py-5 rounded-[30px] text-center max-w-2xl border border-white/20"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2 tracking-tight">
                        Welcome back, <span className="text-yellow-400 font-bold">Pruthvi!</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light italic">
                        Find your perfect life partner.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
