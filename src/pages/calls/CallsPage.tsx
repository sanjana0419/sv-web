import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MessageSquare, Users, Star, Home, Settings,
    Search, Phone, Video as VideoIcon,
    MoreHorizontal, Heart, MicOff, VideoOff, PhoneOff, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface CallRecord {
    id: string;
    name: string;
    avatar: string;
    type: 'audio' | 'video';
    status: 'missed' | 'incoming' | 'outgoing';
    time: string;
    duration?: string;
}

// --- Mock Data ---
const initialCallRecords: CallRecord[] = [
    {
        id: '1',
        name: 'Sayali Sontakke',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        type: 'video',
        status: 'incoming',
        time: 'Today, 10:45 AM',
        duration: '12:04'
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        type: 'audio',
        status: 'missed',
        time: 'Yesterday, 8:30 PM'
    },
    {
        id: '3',
        name: 'Pete Jackson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        type: 'video',
        status: 'outgoing',
        time: 'March 16, 2:15 PM',
        duration: '45:10'
    }
];

const CallsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isCalling, setIsCalling] = useState(false);
    const [activeRecord, setActiveRecord] = useState<CallRecord | null>(null);

    const filteredRecords = initialCallRecords.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const initiateCall = (record: CallRecord) => {
        setActiveRecord(record);
        setIsCalling(true);
    };

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
                        {location.pathname === '/matches' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Matches</span>}
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
                        {location.pathname === '/contacts' && <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-widest leading-none">Connections</span>}
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

            {/* 2. CALL LIST */}
            <section className="w-[450px] border-r border-[#E8E4D5] flex flex-col bg-white/40">
                <header className="p-8">
                    <h2 className="text-3xl font-serif text-gray-900 mb-8">Audio & Video</h2>
                    <div className="relative mb-8">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find calls..."
                            className="w-full bg-white border border-[#E8E4D5] rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 ring-[#c6862e]/30 placeholder:text-gray-400"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                    <AnimatePresence initial={false}>
                        {filteredRecords.map(record => (
                            <motion.div 
                                key={record.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-5 px-10 py-6 hover:bg-white/20 cursor-pointer border-b border-[#E8E4D5]/30 transition-all"
                            >
                                <img src={record.avatar} className="w-14 h-14 rounded-full object-cover shadow-md" alt="" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-bold text-[#1A1A1A]">{record.name}</h4>
                                    <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-1">
                                        {record.type === 'video' ? <VideoIcon size={14} /> : <Phone size={14} />}
                                        <span className={record.status === 'missed' ? 'text-rose-500' : ''}>
                                            {record.status === 'missed' ? 'Missed Call' : record.status === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}
                                        </span>
                                        <span>•</span>
                                        <span>{record.time}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => initiateCall(record)}
                                    className="w-10 h-10 rounded-full bg-[#FDFBF2] border border-[#E8E4D5] flex items-center justify-center text-[#c6862e] hover:shadow-lg transition-all"
                                >
                                    {record.type === 'video' ? <VideoIcon size={20} /> : <Phone size={20} />}
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* 3. CALL PREVIEW / DIALER */}
            <section className="flex-1 flex flex-col bg-[#FDFBF2]/50 items-center justify-center p-20">
                <div className="text-center max-w-md space-y-8">
                    <div className="w-40 h-40 bg-white rounded-[3rem] shadow-xl border border-white flex items-center justify-center mx-auto text-[#c6862e]">
                        <Zap size={64} />
                    </div>
                    <h2 className="text-4xl font-serif text-gray-900 tracking-tight">Connect with Your Match</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">Engage in a safe and private conversation with your prospective matches. Choose a profile from your recent interactions to start a consultation.</p>
                </div>
            </section>

            {/* Cinematic Call Interaction Overlay */}
            <AnimatePresence>
                {isCalling && activeRecord && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-[#0A0A0A] flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A] via-black to-[#2A2A2A]" />
                        <motion.img initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2 }} src={activeRecord.avatar} className="absolute inset-0 w-full h-full object-cover grayscale blur-2xl pointer-events-none" />
                        
                        <div className="relative z-10 w-full max-w-6xl px-12 flex flex-col items-center gap-20">
                            <div className="flex flex-col items-center gap-10 text-center">
                                <motion.div animate={{ boxShadow: ["0 0 60px #c6862e22", "0 0 120px #c6862e66", "0 0 60px #c6862e22"] }} transition={{ duration: 4, repeat: Infinity }} className="relative">
                                    <img src={activeRecord.avatar} className="w-64 h-64 rounded-[6rem] object-cover border-8 border-white/10 shadow-3xl" />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#c6862e] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-3xl border-4 border-[#0A0A0A] whitespace-nowrap">Connecting with {activeRecord.name}...</div>
                                </motion.div>
                                <h2 className="text-8xl font-serif text-white mb-6 tracking-tighter">{activeRecord.name}</h2>
                            </div>

                            <div className="flex gap-12 items-center">
                                <button className="w-24 h-24 rounded-[3.5rem] bg-white/5 text-white flex items-center justify-center border border-white/10 backdrop-blur-3xl"><MicOff size={36} /></button>
                                <button onClick={() => setIsCalling(false)} className="w-36 h-36 rounded-[4.5rem] bg-[#801B1B] text-white flex items-center justify-center shadow-3xl hover:bg-rose-700 transition-all"><PhoneOff size={56} /></button>
                                <button className="w-24 h-24 rounded-[3.5rem] bg-white/5 text-white flex items-center justify-center border border-white/10 backdrop-blur-3xl"><VideoOff size={36} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CallsPage;
