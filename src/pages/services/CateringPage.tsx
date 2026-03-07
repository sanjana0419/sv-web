import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, Utensils, Star, Phone, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import cateringImg from '../../assets/auth/wedding-food.jpeg';

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const CateringPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans">
            {/* Header / Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <img 
                    src={cateringImg} 
                    alt="Premium Wedding Catering" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Fixed Top Nav inside Hero */}
                <div className="absolute top-0 left-0 right-0 p-6 z-10 flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/services')}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-orange-500/80 backdrop-blur-md flex items-center justify-center text-white">
                        <Utensils size={20} />
                    </div>
                </div>

                {/* Hero Title Container */}
                <motion.div 
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="show"
                    className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
                >
                    <span className="uppercase tracking-[0.3em] text-sm font-bold mb-4 text-orange-200">Culinary Excellence</span>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Premium Catering</h1>
                    <p className="max-w-xl text-lg md:text-xl text-white/90">
                        Savor the moments with our world-class culinary masters. Customized menus for unforgettable celebrations.
                    </p>
                </motion.div>
            </div>

            {/* Content Section */}
            <main className="max-w-4xl mx-auto px-6 py-16 -mt-16 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 mb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-100 pb-12">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                <Star size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">5-Star Chefs</h3>
                            <p className="text-sm text-gray-500">Curated by top culinary experts globally.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                <Utensils size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Custom Menus</h3>
                            <p className="text-sm text-gray-500">Tailored multi-cuisine dining experiences.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                <CalendarCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Live Counters</h3>
                            <p className="text-sm text-gray-500">Interactive food stations and fresh grills.</p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">A Feast for the Senses</h2>
                        <p>
                            We bring culinary dreams to life for your perfect day. Our partnered caterers are renowned for creating personalized, mouth-watering spreads that range from traditional authenticated delicacies to modern fusion cuisine.
                        </p>
                        <p>
                            Focusing on fresh ingredients, exquisite presentation, and impeccable service, we ensure every dish tells a story. Enjoy customized drink stations, extravagant desserts, and bespoke dietary accommodations.
                        </p>
                    </div>
                </motion.div>

                {/* Call to action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-orange-500 transition-colors shadow-lg flex items-center justify-center gap-2">
                        <CalendarCheck size={20} />
                        Book a Tasting Session
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Phone size={20} />
                        Contact Vendors
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CateringPage;
