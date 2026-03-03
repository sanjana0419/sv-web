import React from 'react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-full lg:w-[320px] space-y-8">
            {/* Success Stories Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#600D0D] text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-80">Success Stories</h4>
                <div className="space-y-4">
                    <h3 className="text-lg font-bold leading-tight">Manoj & Kavitha</h3>
                    <p className="text-[11px] font-medium tracking-tight uppercase opacity-60">Mumbai, India</p>
                    <p className="text-sm leading-relaxed opacity-90 italic">
                        "We found each other through Shubh Vivah and it has been the best decision of our lives. Thank you for making our dreams come true!"
                    </p>
                    <a href="#" className="inline-block text-amber-400 font-bold border-b border-amber-400/30 text-xs pb-0.5 pt-2 hover:text-amber-300 transition-colors">
                        Read More
                    </a>
                </div>
            </motion.div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-50">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-8">Recent Activity</h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Likes</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">27k</span>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Messages</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">18k</span>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Profile Views</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">4.2k</span>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-50">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-8">Quick Links</h4>
                <nav className="flex flex-col space-y-5">
                    {[
                        { name: 'Add Photos', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                        { name: 'Edit Profile', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                        { name: 'Preferences', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
                        { name: 'Upgrade Plan', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="flex items-center gap-4 text-gray-500 hover:text-rose-600 transition-colors group">
                            <svg className="w-5 h-5 text-amber-500 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
