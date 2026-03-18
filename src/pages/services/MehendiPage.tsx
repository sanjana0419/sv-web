import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, Scissors, Star, Phone, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import mehendiImg from '../../assets/auth/wedding-mehndi.png';

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const MehendiPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans">
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <img
                    src={mehendiImg}
                    alt="Mehendi Artists"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-0 left-0 right-0 p-6 z-10 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/services')}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-blue-500/80 backdrop-blur-md flex items-center justify-center text-white">
                        <Scissors size={20} />
                    </div>
                </div>

                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="show"
                    className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
                >
                    <span className="uppercase tracking-[0.3em] text-sm font-bold mb-4 text-blue-200">Intricate Artistry</span>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Mehendi Artists</h1>
                    <p className="max-w-xl text-lg md:text-xl text-white/90">
                        Intricate and beautiful henna designs by world-renowned master artists.
                    </p>
                </motion.div>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-16 -mt-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 mb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-100 pb-12">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <Star size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Custom Designs</h3>
                            <p className="text-sm text-gray-500">Personalized portraits and love stories within henna.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <Scissors size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Organic Henna</h3>
                            <p className="text-sm text-gray-500">Safe, natural, and deep-staining mehendi guaranteed.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <CalendarCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Guest Services</h3>
                            <p className="text-sm text-gray-500">Large artist teams to cater to hundreds of guests.</p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Embracing Tradition</h2>
                        <p>
                            The Mehendi ceremony is a vibrant celebration of love and luck. Our curated list of artists specialize in traditional Indian, Arabic, and contemporary fusion motifs, ensuring you receive a design as unique as you are.
                        </p>
                        <p>
                            We provide full team bookings to manage large guest lists efficiently, ensuring everyone gets to partake in this beautiful art form without long waiting lines.
                        </p>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-500 transition-colors shadow-lg flex items-center justify-center gap-2">
                        <CalendarCheck size={20} />
                        Book an Artist
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Phone size={20} />
                        Discuss Designs
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MehendiPage;
