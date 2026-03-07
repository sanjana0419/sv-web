import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Heart, Search, MessageSquare, Layers } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-20 py-12 rounded-[4rem] bg-white/15 backdrop-blur-3xl border border-white/20 flex flex-col items-center gap-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:bg-white/20"
            >
                {/* Home */}
                <button className="w-13 h-13 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-white hover:scale-110 active:scale-95 transition-all group relative border border-white/10 shadow-xl">
                    <Home size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black/90 backdrop-blur-xl text-white text-[11px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl tracking-widest uppercase">Dashboard</span>
                </button>

                {/* Heart/Matches */}
                <button 
                    onClick={() => navigate('/matches')}
                    className="w-13 h-13 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#801B1B] hover:text-white hover:scale-110 active:scale-95 transition-all group relative border border-white/10 shadow-xl"
                >
                    <Heart size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black/90 backdrop-blur-xl text-white text-[11px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl tracking-widest uppercase">Matches</span>
                </button>

                {/* Search */}
                <button className="w-13 h-13 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-rose-600 hover:text-white hover:scale-110 active:scale-95 transition-all group relative border border-white/10 shadow-xl">
                    <Search size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black/90 backdrop-blur-xl text-white text-[11px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl tracking-widest uppercase">Search</span>
                </button>

                {/* Messages with Badge */}
                <button className="w-13 h-13 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#c6862e] hover:text-white hover:scale-110 active:scale-95 transition-all group relative border border-white/10 shadow-xl">
                    <div className="relative">
                        <MessageSquare size={26} strokeWidth={2.5} />
                        <div className="absolute -top-3.5 -right-3.5 w-6 h-6 bg-rose-600 rounded-full text-[11px] font-black flex items-center justify-center text-white border-2 border-white/20 shadow-lg">
                            3
                        </div>
                    </div>
                    <span className="absolute left-24 px-5 py-2.5 bg-black/90 backdrop-blur-xl text-white text-[11px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl tracking-widest uppercase">Messages</span>
                </button>

                {/* Gallery/Services */}
                <button 
                    onClick={() => navigate('/services')}
                    className="w-13 h-13 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-indigo-600 hover:text-white hover:scale-110 active:scale-95 transition-all group relative border border-white/10 shadow-xl"
                >
                    <Layers size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black/90 backdrop-blur-xl text-white text-[11px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl tracking-widest uppercase">Services</span>
                </button>
            </motion.div>
        </div>
    );
};

export default Sidebar;
