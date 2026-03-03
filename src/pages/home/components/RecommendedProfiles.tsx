import React from 'react';
import { motion } from 'framer-motion';

interface Profile {
    id: number;
    name: string;
    age: number;
    location: string;
    rating: number;
    image: string;
    details: string;
}

const profiles: Profile[] = [
    {
        id: 1, name: 'Sanya Verma', age: 24, location: 'Pune, MH', rating: 4.2,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        details: '24 Yrs, Software'
    },
    {
        id: 2, name: 'Ananya Singh', age: 26, location: 'Mumbai, MH', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        details: '26 Yrs, Doctor'
    },
    {
        id: 3, name: 'Zoya Khan', age: 25, location: 'Delhi, NCR', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        details: '25 Yrs, Interior'
    },
    {
        id: 4, name: 'Mira Kapoor', age: 24, location: 'Bangalore, KA', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        details: '24 Yrs, Architect'
    },
    {
        id: 5, name: 'Ishita Sen', age: 27, location: 'Hyderabad, TS', rating: 4.3,
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
        details: '27 Yrs, Fashion'
    },
    {
        id: 6, name: 'Neha Trivedi', age: 23, location: 'Indore, MP', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        details: '23 Yrs, MBA'
    },
];

const RecommendedProfiles: React.FC = () => {
    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-rose-600 pl-4">Recommended Profiles</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {profiles.map((profile, index) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col group cursor-pointer"
                    >
                        {/* Image Container */}
                        <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5]">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            {/* Badges Overlay */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-rose-600 px-3 py-1 rounded-full border border-rose-100 uppercase tracking-tighter">Verified</span>
                            </div>
                            <button className="absolute top-4 right-4 text-white/70 hover:text-white drop-shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Info Section */}
                        <div className="mt-5 space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{profile.name}</h3>
                                <div className="flex items-center gap-1 bg-amber-400 text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                                    <span>{profile.rating}</span>
                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{profile.location}</span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-gray-400 font-semibold uppercase">{profile.details}</span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-amber-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-amber-600 shadow-md transform transition-all"
                                >
                                    Connect
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProfiles;
