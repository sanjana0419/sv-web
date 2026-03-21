import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Eye, Camera, UserRoundPen, Settings, Gem, Home, Pencil, Sparkles, ChevronRight } from 'lucide-react';

const RightSidebar: React.FC = () => {
    return (
        <aside className="w-full space-y-8">
            {/* Success Stories Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
                <div className="bg-[#801B1B] p-6 text-white">
                    <span className="inline-block bg-black/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-8">
                        SUCCESS STORIES
                    </span>
                    <h3 className="text-xl font-bold mb-1">Manoj & Kavitha</h3>
                    <p className="text-xs text-white/70 font-medium">Married 2024</p>
                </div>
                <div className="p-8 italic text-gray-600 text-[14px] leading-relaxed font-medium">
                    "We found each other through ShubhVivah and it has been the best decision of our lives. Thank you for making our dreams come true!"
                </div>
            </motion.div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h4 className="text-base font-bold text-gray-800">Recent Activity</h4>
                <div className="space-y-6">
                    {[
                        { label: 'Likes', count: '27K', icon: <Heart size={18} className="text-rose-500 fill-rose-500" /> },
                        { label: 'Messages', count: '18K', icon: <MessageSquare size={18} className="text-blue-500 fill-blue-500" /> },
                        { label: 'Profile Views', count: '4.2K', icon: <Eye size={18} className="text-emerald-500" /> }
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#F0FAF5] flex items-center justify-center transition-all group-hover:scale-110 shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-semibold text-gray-500">{item.label}</span>
                            </div>
                            <span className="text-base font-black text-gray-900">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h4 className="text-base font-bold text-gray-800">Quick Links</h4>
                <div className="space-y-5">
                    {[
                        { name: 'Add Photos', icon: '📸' },
                        { name: 'Edit Profile', icon: '📝' },
                        { name: 'Preferences', icon: '⚙️' },
                        { name: 'Upgrade Plan', icon: '💎' }
                    ].map((link) => (
                        <a key={link.name} href="#" className="flex items-center gap-4 group transition-all">
                            <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
};



export default RightSidebar;
