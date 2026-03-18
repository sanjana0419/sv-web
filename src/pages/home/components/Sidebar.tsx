import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Heart, Search, MessageSquare, Layers, Users, User, Bell } from 'lucide-react';

interface SidebarProps {
    currentView: 'dashboard' | 'matches' | 'search' | 'services';
    onViewChange: (view: 'dashboard' | 'matches' | 'search' | 'services') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-20 py-10 rounded-[5rem] bg-white/30 backdrop-blur-3xl border border-white/40 flex flex-col items-center gap-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all hover:bg-white/50"
            >
                {/* Home */}
                <button
                    onClick={() => onViewChange('dashboard')}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border ${currentView === 'dashboard' ? 'bg-[#D4AF37] text-white border-white/40 shadow-xl' : 'bg-white/10 text-gray-900 border-white/20 hover:bg-[#D4AF37] hover:text-white'}`}
                >
                    <Home size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Dashboard</span>
                </button>

                {/* Heart/Matches */}
                <button
                    onClick={() => navigate('/matches')}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border ${currentView === 'matches' ? 'bg-[#801B1B] text-white border-white/40 shadow-xl' : 'bg-white/10 text-gray-900 border-white/20 hover:bg-[#801B1B] hover:text-white'}`}
                >
                    <Heart size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Matches</span>
                </button>

                {/* Search */}
                <button
                    onClick={() => onViewChange('search')}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border ${currentView === 'search' ? 'bg-rose-600 text-white border-white/40 shadow-xl' : 'bg-white/10 text-gray-900 border-white/20 hover:bg-rose-600'}`}
                >
                    <Search size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Search</span>
                </button>

                {/* Messages with Badge */}
                <button
                    onClick={() => { navigate('/messages'); }}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border bg-white/10 text-gray-900 border-white/20 hover:bg-[#c6862e] hover:text-white`}
                >
                    <div className="relative">
                        <MessageSquare size={26} strokeWidth={2.5} />
                        <div className="absolute -top-3.5 -right-3.5 w-6 h-6 bg-[#801B1B] rounded-full text-[11px] font-black flex items-center justify-center text-white border-2 border-white/50 shadow-lg">
                            3
                        </div>
                    </div>
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Messages</span>
                </button>

                {/* Gallery/Plans */}
                <button
                    onClick={() => navigate('/services')}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border bg-white/10 text-gray-900 border-white/20 hover:bg-indigo-600 hover:text-white`}
                >
                    <Layers size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Services</span>
                </button>

                {/* Notifications */}
                <button
                    onClick={() => navigate('/notifications')}
                    className={`w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border bg-white/10 text-gray-900 border-white/20 hover:bg-rose-600 hover:text-white`}
                >
                    <div className="relative">
                        <Bell size={26} strokeWidth={2.5} />
                        <div className="absolute -top-3.5 -right-3.5 w-6 h-6 bg-rose-600 rounded-full text-[11px] font-black flex items-center justify-center text-white border-2 border-white/50 shadow-lg group-hover:bg-white group-hover:text-rose-600 group-hover:border-rose-600 transition-colors">
                            5
                        </div>
                    </div>
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Aura Alerts</span>
                </button>

                {/* Profile */}
                <button

                    onClick={() => navigate('/profile')}
                    className={`mt-auto w-13 h-13 flex items-center justify-center rounded-full transition-all group relative border ${currentView as any === 'profile' ? 'bg-[#c6862e] text-white border-white/40 shadow-xl' : 'bg-white/10 text-gray-900 border-white/20 hover:bg-[#c6862e] hover:text-white'}`}
                >
                    <User size={26} strokeWidth={2.5} />
                    <span className="absolute left-24 px-5 py-2.5 bg-black text-white text-[10px] font-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] shadow-2xl">Profile</span>
                </button>


            </motion.div>
        </div>
    );
};

export default Sidebar;
