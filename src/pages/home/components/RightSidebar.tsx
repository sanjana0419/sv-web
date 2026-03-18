import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Eye, Camera, UserRoundPen, Settings, Gem, Home, Pencil, Sparkles, ChevronRight } from 'lucide-react';

const RightSidebar: React.FC = () => {
    return (
        <aside className="w-full space-y-10">
            {/* Success Stories Card - Redesigned for Luxury */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group cursor-pointer"
            >
                {/* Brand Header Section */}
                <div className="bg-gradient-to-br from-[#801B1B] to-[#600D0D] p-10 pb-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-12 border border-white/10">
                        Sanctified Bonds
                    </div>
                    <div>
                        <h3 className="text-3xl font-serif tracking-tight mb-2">Manoj & Kavitha</h3>
                        <div className="flex items-center gap-2">
                            <Sparkles size={12} className="text-[#D4AF37]" />
                            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50">United Since 2024</p>
                        </div>
                    </div>
                </div>

                {/* Body Section */}
                <div className="p-10 pt-8 bg-white relative">
                    <div className="absolute -top-6 left-10 w-12 h-12 bg-[#c6862e] rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white">
                        <span className="text-2xl font-serif">"</span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-gray-600 font-bold italic opacity-80 mt-2">
                        "Our path crossed through SoulfulVivah, weaving a destiny we once only dreamed of. An eternal gratitude for this divine connection."
                    </p>
                    <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#c6862e] flex items-center gap-2 group/btn">
                        Explore Testimony <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>

            {/* Aura Analytics / Recent Activity */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c6862e]">Aura Analytics</h4>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
                    {[
                        { name: 'Resonances', count: '27k', icon: <Heart size={20} className="text-[#801B1B] fill-[#801B1B]/10" />, label: 'Likes' },
                        { name: 'Whispers', count: '18k', icon: <MessageSquare size={20} className="text-[#c6862e] fill-[#c6862e]/10" />, label: 'Messages' },
                        { name: 'Presence', count: '4.2k', icon: <Eye size={20} className="text-gray-400" />, label: 'Views' }
                    ].map((item, i) => (
                        <div key={item.name} className="flex justify-between items-center group cursor-pointer hover:bg-white transition-all p-7 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-5">
                                <div className="w-13 h-13 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all border border-transparent group-hover:border-gray-50">
                                    {item.icon}
                                </div>
                                <div>
                                    <span className="block text-base font-black text-gray-800">{item.name}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                                </div>
                            </div>
                            <span className="text-xl font-serif text-gray-900 group-hover:text-[#c6862e] transition-colors">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sacred Navigation / Quick Links */}
            <div className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#c6862e] px-2">Sacred Tools</h4>
                <nav className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
                    {[
                        { name: 'Enrich Gallery', icon: <Camera size={20} />, color: 'bg-orange-50 text-orange-600' },
                        { name: 'Refine Essence', icon: <UserRoundPen size={20} />, color: 'bg-indigo-50 text-indigo-600' },
                        { name: 'Aura Settings', icon: <Settings size={20} />, color: 'bg-slate-50 text-slate-600' },
                        { name: 'Evolve Journey', icon: <Gem size={20} />, color: 'bg-amber-50 text-amber-600' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="flex items-center justify-between transition-all group p-7 hover:bg-gray-50/50 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-white/50`}>
                                    {item.icon}
                                </div>
                                <span className="text-[14px] font-black tracking-tight text-gray-700 group-hover:text-gray-900">{item.name}</span>
                            </div>
                            <ChevronRight size={18} className="text-gray-200 group-hover:text-[#c6862e] group-hover:translate-x-1 transition-all" />
                        </a>
                    ))}
                </nav>
            </div>

            {/* Premium CTA */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-10 rounded-[3rem] relative overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c6862e]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h5 className="text-xl font-serif text-white mb-4 relative z-10">Elite Membership</h5>
                <p className="text-xs text-white/50 font-bold mb-8 leading-relaxed relative z-10 uppercase tracking-widest">
                    Unlock private scrolls, instant resonances, and divine placement.
                </p>
                <button className="w-full py-5 bg-[#c6862e] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.03] active:scale-95 transition-all">
                    Ascend Now
                </button>
            </div>
        </aside>
    );
};

export default RightSidebar;
