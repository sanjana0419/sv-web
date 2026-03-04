import React from 'react';
import { motion } from 'framer-motion';
import { Home, Check } from 'lucide-react';
import brideImg from '../../../assets/auth/bride.png';
import groomImg from '../../../assets/auth/groom.png';

const ProfileCompletion: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08),0_0_20px_rgba(212,175,55,0.1)] p-5 mb-6 flex flex-col items-center gap-4 relative z-20 w-full border-2 border-[#D4AF37]/40 overflow-visible"
        >
            <div className="w-full flex justify-between items-center mb-2 px-2">
                {/* Left: Avatar and Text */}
                <div className="flex items-center gap-10">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight leading-none mb-3">Profile Completion</h3>
                        <p className="text-gray-500 font-medium text-[17px] leading-relaxed">
                            Your profile is more visible than <span className="text-rose-600 font-bold">80%</span>
                            <br /><span className="opacity-80">of users</span>
                        </p>
                    </div>
                </div>

                {/* Right: 100% Badge with Soft Glow */}
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative shadow-[0_12px_40px_rgba(255,87,34,0.15)] border border-orange-50 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-50/50 to-white -z-10" />
                    <span className="text-lg font-bold text-[#FF5722]">100%</span>
                </div>
            </div>

            {/* Progress Section - Centered and Shorter */}
            <div className="w-full px-24 relative mt-10 mb-2">
                {/* Character Animation */}
                <div className="absolute inset-x-24 -top-16 select-none pointer-events-none h-20">
                    {/* The Bride - Stationary at 100% */}
                    <div className="absolute right-0 bottom-0 w-20 h-20">
                        <img src={brideImg} alt="Bride" className="w-full h-full object-contain" />
                    </div>

                    {/* The Groom - Moving with the bar */}
                    <motion.div
                        initial={{ left: "0%" }}
                        animate={{ left: "85%" }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute bottom-0 w-20 h-20 transform -translate-x-1/2"
                    >
                        <img src={groomImg} alt="Groom" className="w-full h-full object-contain" />
                    </motion.div>
                </div>

                {/* The Progress Bar - Thick with Deep Glow */}
                <div className="relative h-4 w-full bg-gray-100 rounded-full shadow-inner overflow-visible">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-[#8B0000] rounded-full shadow-[0_8px_25px_rgba(139,0,0,0.5)] relative border-b border-red-900/10"
                    />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="w-full flex justify-between items-center mt-1 px-1">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50/50 flex items-center justify-center shadow-[0_4px_15px_rgba(255,165,0,0.1)] border border-orange-100/50 text-xl">
                        🎉
                    </div>
                    <span className="text-[15px] font-bold text-gray-800 tracking-tight">Profile Complete!</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-6 bg-[#111111] text-white pl-8 pr-2 py-2 rounded-full font-bold shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:bg-black transition-all group"
                >
                    <span className="text-sm tracking-wide">Dashboard</span>
                    <div className="w-10 h-10 bg-[#FF4D4D] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(255,77,77,0.3)] group-hover:scale-110 transition-transform">
                        <Home size={18} className="text-white fill-white/20" />
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProfileCompletion;
