import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, MapPin, Star, Phone, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import venueImg from '../../assets/auth/wedding-venue.jpeg';

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const VenuePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans">
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <img 
                    src={venueImg} 
                    alt="Premium Wedding Venue" 
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
                    <div className="w-10 h-10 rounded-full bg-rose-500/80 backdrop-blur-md flex items-center justify-center text-white">
                        <MapPin size={20} />
                    </div>
                </div>

                <motion.div 
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="show"
                    className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
                >
                    <span className="uppercase tracking-[0.3em] text-sm font-bold mb-4 text-rose-200">Breathtaking Locations</span>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Wedding Venue</h1>
                    <p className="max-w-xl text-lg md:text-xl text-white/90">
                        Discover breathtaking locations for your dream celebration, from majestic palaces to serene beaches.
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
                            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                <Star size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Iconic Destinations</h3>
                            <p className="text-sm text-gray-500">From royal palaces to exotic beachfront resorts.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Prime Locations</h3>
                            <p className="text-sm text-gray-500">Easily accessible and visually stunning.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                <CalendarCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Flexible Spaces</h3>
                            <p className="text-sm text-gray-500">Indoor halls and outdoor lawns to fit any guest count.</p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">The Perfect Setting</h2>
                        <p>
                            The venue sets the tone for your entire wedding experience. We partner with the most exclusive properties worldwide, ensuring that wherever you choose to say "I do", the backdrop is spectacular. 
                        </p>
                        <p>
                            From initial site visits to finalizing layout plans, we assist in securing a space that accommodates your vision, guest numbers, and aesthetic preferences perfectly. 
                        </p>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-rose-500 transition-colors shadow-lg flex items-center justify-center gap-2">
                        <CalendarCheck size={20} />
                        Schedule a Visit
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

export default VenuePage;
