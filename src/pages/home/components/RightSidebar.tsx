import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Eye, Camera, UserRoundPen, Settings, Gem, Home, Pencil } from 'lucide-react';

const RightSidebar: React.FC = () => {
    return (
        <aside className="w-full space-y-8">
            {/* Success Stories Card - Redesigned with Header and Body */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden group cursor-pointer"
            >
                {/* Maroon Header Section */}
                <div className="bg-[#801B1B] pt-4 px-8 pb-4 text-white">
                    <div className="inline-block bg-[#600D0D] px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-14 border border-white/10">
                        Success Stories
                    </div>
                    <div>
                        <h3 className="text-xl font-sans font-semibold tracking-tight mb-1">Manoj & Kavitha</h3>
                        <p className="text-[11px] font-sans font-medium tracking-widest uppercase text-white/40">Married 2024</p>
                    </div>
                </div>

                {/* White Body Section */}
                <div className="p-8 pt-6 bg-white">
                    <p className="text-sm leading-relaxed text-gray-600 font-medium italic relative">
                        "We found each other through ShubhVivah and it has been the best decision of our lives. Thank you for making our dreams come true!"
                    </p>
                </div>
            </motion.div>

            {/* Recent Activity Section */}
            <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 px-1">Recent Activity</h4>
                <div className="bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] divide-y divide-gray-50">
                    {[
                        { name: 'Likes', count: '27k', icon: <Heart size={18} className="text-rose-500 fill-rose-500" />, bgColor: 'bg-rose-50' },
                        { name: 'Messages', count: '18k', icon: <MessageSquare size={18} className="text-blue-500 fill-blue-500" />, bgColor: 'bg-blue-50' },
                        { name: 'Profile Views', count: '4.2k', icon: <Eye size={18} className="text-emerald-500 fill-emerald-500" />, bgColor: 'bg-emerald-50' }
                    ].map((item) => (
                        <div key={item.name} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50/50 transition-all p-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-all shadow-sm`}>
                                    {item.icon}
                                </div>
                                <span className="text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{item.name}</span>
                            </div>
                            <span className="text-base font-black text-gray-900">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 px-1">Quick Links</h4>
                <nav className="bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] divide-y divide-gray-50 rounded-2xl overflow-hidden">
                    {[
                        { name: 'Add Photos', icon: <Camera size={20} className="text-orange-600 fill-orange-50" />, bgColor: 'bg-orange-50' },
                        { name: 'Edit Profile', icon: <UserRoundPen size={20} className="text-indigo-600 fill-indigo-50" />, bgColor: 'bg-indigo-50' },
                        { name: 'Preferences', icon: <Settings size={20} className="text-slate-600 fill-slate-50" />, bgColor: 'bg-slate-50' },
                        { name: 'Upgrade Plan', icon: <Gem size={20} className="text-amber-600 fill-amber-50" />, bgColor: 'bg-amber-50' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="flex items-center gap-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 transition-all group p-6">
                            <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center transition-all group-hover:scale-110 shadow-sm`}>
                                {item.icon}
                            </div>
                            <span className="text-base font-semibold tracking-tight">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default RightSidebar;
