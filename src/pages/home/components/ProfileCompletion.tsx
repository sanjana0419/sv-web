import React from 'react';
import { motion } from 'framer-motion';

const ProfileCompletion: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-8 relative z-20 -mt-16 mx-auto max-w-[1200px] border border-gray-100"
        >
            {/* Avatar and Info */}
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-rose-50 shadow-md">
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <h3 className="text-xl font-bold text-gray-800">Profile Completion</h3>
                    <p className="text-sm text-gray-500 leading-tight">
                        Your profile is more visible than <span className="text-rose-600 font-bold">60%</span> of users.
                    </p>
                </div>
            </div>

            {/* Progress Section */}
            <div className="flex-1 w-full space-y-3">
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '60%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-700 rounded-full relative"
                    >
                        <div className="absolute top-[-30px] right-0 flex items-center gap-1">
                            <div className="w-6 h-6 rounded-full bg-white shadow-md border border-rose-100 flex items-center justify-center">
                                <div className="w-3 h-3 bg-rose-600 rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-rose-700">60%</span>
                        </div>
                    </motion.div>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Profile Completed!</span>
                </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 w-full md:w-auto">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-[180px] py-4 bg-gray-900 border border-black rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-all group"
                >
                    <span className="text-white">Finish Now!</span>
                    <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProfileCompletion;
