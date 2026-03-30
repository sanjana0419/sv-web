import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MessageSquare, Users, Star, Home, Settings,
    Search, Phone, Video as VideoIcon,
    MoreHorizontal, Heart, Zap, UserPlus, Filter,
    Mail, MapPin, Briefcase, GraduationCap, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Buddy {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastInteraction: string;
    tags: string[];
    bio: string;
}

// --- Mock Data ---
const initialBuddies: Buddy[] = [
    {
        id: '1',
        name: 'Sayali Sontakke',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastInteraction: '2 hours ago',
        tags: ['Professional', 'Family-oriented'],
        bio: 'I believe in building a life filled with mutual respect, shared values, and constant growth.'
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        status: 'offline',
        lastInteraction: 'Yesterday',
        tags: ['Entrepreneur', 'Cultured'],
        bio: 'Looking for a companion to embark on a journey of a lifetime with shared goals and aspirations.'
    },
    {
        id: '3',
        name: 'Pete Jackson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastInteraction: 'Just now',
        tags: ['Engineer', 'Balanced Life'],
        bio: 'A focused individual seeking a meaningful connection and a supportive life partner.'
    }
];

const ContactsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeBuddy, setActiveBuddy] = useState<Buddy>(initialBuddies[0]);

    const filteredBuddies = initialBuddies.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#F8F3ED] text-[#3D2B1F] font-sans overflow-hidden relative">
            {/* Ambient Base Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B22222]/5 blur-[150px] rounded-full pointer-events-none" />

            {/* 1. SIDEBAR RAIL */}
            <aside className="w-[100px] border-r border-[#E8E4D5]/30 flex flex-col items-center py-10 bg-white/40 backdrop-blur-xl shrink-0 z-20 shadow-[inset_-10px_0_30px_rgba(232,228,213,0.2)]">
                <div className="flex flex-col gap-10">
                    <button 
                        onClick={() => navigate('/home')} 
                        className="p-3 text-gray-400 hover:text-[#FF9933] transition-all duration-300 hover:scale-110"
                    >
                        <Home size={28} />
                    </button>

                    <button 
                        onClick={() => navigate('/matches')} 
                        className="p-3 text-gray-400 hover:text-[#B22222] transition-all duration-300 hover:scale-110"
                    >
                        <Heart size={28} />
                    </button>

                    <button 
                        onClick={() => navigate('/messages')} 
                        className="p-3 text-gray-400 hover:text-[#FF9933] transition-all duration-300 hover:scale-110"
                    >
                        <MessageSquare size={28} />
                    </button>
                    
                    <button 
                        onClick={() => navigate('/calls')} 
                        className="p-3 text-gray-400 hover:text-[#FF9933] transition-all duration-300 hover:scale-110"
                    >
                        <Phone size={28} />
                    </button>

                    <button 
                        onClick={() => navigate('/contacts')} 
                        className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#FF9933] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_rgba(255,153,51,0.3)] border border-white/20 transition-all duration-300 scale-110"
                    >
                        <Users size={28} />
                    </button>

                    <button 
                        onClick={() => navigate('/profile')} 
                        className="p-3 text-gray-400 hover:text-[#FF9933] transition-all duration-300 hover:scale-110"
                    >
                        <Settings size={28} />
                    </button>
                </div>
            </aside>

            {/* 2. CONNECTION LIST */}
            <section className="w-[480px] flex flex-col bg-white/20 backdrop-blur-md z-10">
                <header className="p-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#FF9933] font-black uppercase tracking-[0.4em] mb-2">Discover</span>
                            <h2 className="text-4xl font-serif text-[#3D2B1F] tracking-tight">Connections</h2>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.1, rotate: 90, backgroundColor: '#B22222' }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-[#3D2B1F] text-white flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all"
                        >
                            <UserPlus size={22} />
                        </motion.button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF9933] transition-colors" size={18} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find a connection..."
                            className="w-full bg-white/70 border-none rounded-full py-4 pl-14 pr-6 text-sm outline-none focus:ring-2 ring-[#FF9933]/30 shadow-sm placeholder:text-gray-400 backdrop-blur-sm transition-all text-[#3D2B1F]"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10 px-8">
                    <AnimatePresence initial={false}>
                        {filteredBuddies.map(buddy => (
                            <motion.div 
                                key={buddy.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                onClick={() => setActiveBuddy(buddy)}
                                className={`group flex items-center gap-6 p-6 rounded-2xl cursor-pointer mb-5 transition-all duration-500 border-none ${activeBuddy.id === buddy.id ? 'bg-white shadow-[0_20px_40px_rgba(255,153,51,0.15)]' : 'bg-white/40 hover:bg-white/60 shadow-[0_10px_20px_rgba(255,150,50,0.05)]'}`}
                            >
                                <div className="relative">
                                    <div className={`absolute inset-0 rounded-full blur-md bg-[#FFD700]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <img src={buddy.avatar} className="w-16 h-16 rounded-full object-cover shadow-lg relative z-10 border-2 border-white" alt="" />
                                    {buddy.status === 'online' && (
                                        <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full z-20 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`text-xl font-bold transition-colors ${activeBuddy.id === buddy.id ? 'text-[#3D2B1F]' : 'text-gray-700'}`}>{buddy.name}</h4>
                                    <p className="text-[11px] text-gray-400 mt-1 font-medium tracking-wide">
                                        {buddy.status === 'online' ? (
                                            <span className="text-[#FF9933] flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-pulse shadow-[0_0_5px_#FF9933]" /> Available to Connect</span>
                                        ) : `Last seen ${buddy.lastInteraction}`}
                                    </p>
                                </div>
                                <ChevronRight size={18} className={`transition-all duration-300 ${activeBuddy.id === buddy.id ? 'text-[#FF9933] translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* 3. PROFILE CARD */}
            <section className="flex-1 flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeBuddy.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full max-w-5xl bg-white/50 backdrop-blur-lg rounded-[3rem] shadow-[0_60px_100px_-20px_rgba(255,150,50,0.15)] border border-white/80 overflow-hidden grid grid-cols-[1fr_1.3fr] relative z-10"
                    >
                        {/* Profile Image Column */}
                        <div className="relative group overflow-hidden h-[650px]">
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                                src={activeBuddy.avatar} 
                                className="w-full h-full object-cover" 
                                alt="" 
                            />
                            {/* Warm Indian Traditional Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/90 via-[#FF9933]/20 to-transparent" />
                            
                            <div className="absolute bottom-16 left-16 right-16">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-6xl font-serif text-white mb-6 tracking-tight leading-none">{activeBuddy.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activeBuddy.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white shadow-xl">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Profile Content Column */}
                        <div className="p-16 flex flex-col justify-between">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                         <div className="w-12 h-px bg-[#FF9933]" />
                                         <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-[#FF9933]">Partner Profile</h4>
                                    </div>
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-3xl font-serif text-[#3D2B1F] leading-[1.6] italic pr-10 relative"
                                    >
                                        "{activeBuddy.bio}"
                                    </motion.p>
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF9933]/60">Location</span>
                                        <div className="flex items-center gap-3 font-bold text-[#3D2B1F] text-lg lg:text-xl">
                                            <div className="w-11 h-11 rounded-2xl bg-[#F8F3ED] flex items-center justify-center text-[#FF9933] shadow-inner">
                                                <MapPin size={20} />
                                            </div>
                                            San Francisco, CA
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF9933]/60">Occupation</span>
                                        <div className="flex items-center gap-3 font-bold text-[#3D2B1F] text-lg lg:text-xl">
                                            <div className="w-11 h-11 rounded-2xl bg-[#F8F3ED] flex items-center justify-center text-[#FF9933] shadow-inner">
                                                <Briefcase size={20} />
                                            </div>
                                            Galactic Storyteller
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 flex items-center gap-6">
                                <motion.button 
                                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 40px rgba(178,34,34,0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(`/messages/${activeBuddy.id}`)} 
                                    className="flex-1 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.5em] shadow-[0_15px_30px_rgba(139,0,0,0.3)] flex items-center justify-center gap-3 group"
                                >
                                    Send Interest
                                    <Zap size={16} className="group-hover:animate-pulse" />
                                </motion.button>
                                
                                <div className="flex gap-4">
                                    <motion.button 
                                        whileHover={{ scale: 1.1, backgroundColor: '#F8F3ED', color: '#FF9933' }}
                                        className="w-16 h-16 rounded-full bg-[#F8F3ED]/50 text-gray-400 flex items-center justify-center transition-all shadow-md group border border-[#E8E4D5]/30"
                                    >
                                        <Phone size={22} className="group-hover:scale-110 transition-transform" />
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.1, backgroundColor: '#F8F3ED', color: '#FF9933' }}
                                        className="w-16 h-16 rounded-full bg-[#F8F3ED]/50 text-gray-400 flex items-center justify-center transition-all shadow-md group border border-[#E8E4D5]/30"
                                    >
                                        <VideoIcon size={22} className="group-hover:scale-110 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>
        </div>
    );
};

export default ContactsPage;
