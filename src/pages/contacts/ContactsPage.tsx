import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MessageSquare, Users, Star, Home, Settings,
    Search, Phone, Video as VideoIcon,
    MoreHorizontal, Heart, Zap, UserPlus, Filter,
    Mail, MapPin, Briefcase, GraduationCap
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
        tags: ['Cinematic', 'Soulseeker'],
        bio: 'I love finding beauty in the details of the sanctuary.'
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        status: 'offline',
        lastInteraction: 'Yesterday',
        tags: ['Visionary', 'Creative'],
        bio: 'Building the future of shared soul resonance.'
    },
    {
        id: '3',
        name: 'Pete Jackson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastInteraction: 'Just now',
        tags: ['Architect', 'Harmony'],
        bio: 'Finding the cinematic rhythm in architecture.'
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
        <div className="flex h-screen bg-[#FDFBF2] text-[#1A1A1A] font-sans overflow-hidden">
            {/* 1. SIDEBAR RAIL */}
            <aside className="w-[100px] border-r border-[#E8E4D5] flex flex-col items-center py-10 bg-[#FDFBF2]/80 backdrop-blur-md">
                <div className="flex flex-col gap-10">
                    <button 
                        onClick={() => navigate('/home')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname === '/home' ? 'text-[#c6862e]' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <Home size={28} />
                    </button>

                    <button 
                        onClick={() => navigate('/matches')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname === '/matches' ? 'w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c6862e] shadow-xl border border-gray-100' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <Heart size={28} />
                        {location.pathname === '/matches' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Soul</span>}
                    </button>

                    <button 
                        onClick={() => navigate('/messages')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname.startsWith('/messages') ? 'w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c6862e] shadow-xl border border-gray-100' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <MessageSquare size={28} />
                        {location.pathname.startsWith('/messages') && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Chats</span>}
                    </button>
                    
                    <button 
                        onClick={() => navigate('/calls')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname === '/calls' ? 'w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c6862e] shadow-xl border border-gray-100' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <Phone size={28} />
                        {location.pathname === '/calls' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Calls</span>}
                    </button>

                    <button 
                        onClick={() => navigate('/contacts')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname === '/contacts' ? 'w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c6862e] shadow-xl border border-gray-100' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <Users size={28} />
                        {location.pathname === '/contacts' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Buddies</span>}
                    </button>

                    <button 
                        onClick={() => navigate('/profile')} 
                        className={`transition-all duration-300 flex flex-col items-center gap-2 ${location.pathname === '/profile' ? 'w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#c6862e] shadow-xl border border-gray-100' : 'text-gray-400 hover:text-[#c6862e]'}`}
                    >
                        <Settings size={28} />
                        {location.pathname === '/profile' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Design</span>}
                    </button>
                </div>
            </aside>

            {/* 2. BUDDY LIST */}
            <section className="w-[450px] border-r border-[#E8E4D5] flex flex-col bg-white/40">
                <header className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-serif text-gray-900">Buddies</h2>
                        <button className="w-10 h-10 rounded-full bg-white border border-[#E8E4D5] flex items-center justify-center text-[#c6862e] hover:shadow-lg transition-all"><UserPlus size={20} /></button>
                    </div>
                    <div className="relative">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find a soul buddy..."
                            className="w-full bg-white border border-[#E8E4D5] rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 ring-[#c6862e]/30 placeholder:text-gray-400"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                    <AnimatePresence initial={false}>
                        {filteredBuddies.map(buddy => (
                            <motion.div 
                                key={buddy.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => setActiveBuddy(buddy)}
                                className={`flex items-center gap-5 px-10 py-6 cursor-pointer border-b border-[#E8E4D5]/30 transition-all ${activeBuddy.id === buddy.id ? 'bg-white shadow-[0_10px_30px_rgba(198,134,46,0.05)]' : 'hover:bg-white/20'}`}
                            >
                                <img src={buddy.avatar} className="w-14 h-14 rounded-full object-cover shadow-md" alt="" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-bold text-[#1A1A1A]">{buddy.name}</h4>
                                    <p className="text-[12px] text-gray-500 mt-1">{buddy.status === 'online' ? <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">Active Synchrony</span> : `Last seen ${buddy.lastInteraction}`}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* 3. SPIRIT ESSENCE CARD */}
            <section className="flex-1 flex flex-col bg-[#FDFBF2]/50 items-center justify-center p-20">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeBuddy.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-4xl bg-white rounded-[4rem] shadow-3xl border border-[#E8E4D5] overflow-hidden grid grid-cols-[1fr_1.5fr]"
                    >
                        <div className="relative group overflow-hidden">
                            <img src={activeBuddy.avatar} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <h3 className="text-4xl font-serif mb-2">{activeBuddy.name}</h3>
                                <div className="flex gap-2">
                                    {activeBuddy.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-16 space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                     <div className="w-[60px] h-px bg-[#c6862e]" />
                                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c6862e]">Resonance Soul Essence</h4>
                                </div>
                                <p className="text-2xl font-serif text-gray-700 leading-relaxed italic pr-10">"{activeBuddy.bio}"</p>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Earthly Sanctuary</span>
                                    <div className="flex items-center gap-3 font-bold text-gray-800"><MapPin size={18} className="text-[#c6862e]" /> San Francisco, CA</div>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Aura Vocation</span>
                                    <div className="flex items-center gap-3 font-bold text-gray-800"><Briefcase size={18} className="text-[#c6862e]" /> Galactic Storyteller</div>
                                </div>
                            </div>

                            <div className="pt-8 flex gap-6">
                                <button onClick={() => navigate(`/messages/${activeBuddy.id}`)} className="flex-1 bg-[#1A1A1A] text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#c6862e] transition-all shadow-xl active:scale-95">Send Frequency</button>
                                <button className="w-20 h-20 rounded-full border border-[#E8E4D5] flex items-center justify-center text-gray-400 hover:text-[#c6862e] transition-all hover:shadow-lg"><Phone size={24} /></button>
                                <button className="w-20 h-20 rounded-full border border-[#E8E4D5] flex items-center justify-center text-gray-400 hover:text-[#c6862e] transition-all hover:shadow-lg"><VideoIcon size={24} /></button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>
        </div>
    );
};

export default ContactsPage;
