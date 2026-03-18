import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    MessageSquare, Users, Bell, Video, Settings,
    Search, Phone, Video as VideoIcon,
    Send, Smile, Star, MapPin, ChevronRight,
    ShieldCheck, Calendar, Home, Layers, Briefcase, ArrowLeft,
    Grid, List as ListIcon, Info, Heart, MoreHorizontal, MoreVertical,
    Paperclip, ImageIcon, Mic, Check, CheckCheck, X, Maximize2, 
    MicOff, VideoOff, PhoneOff, Music, Ghost, Sparkles, Filter, Plus,
    PhoneCall, UserPlus, Trash2, Clock, Globe, Compass, Layout, Zap,
    SendHorizontal, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
    time: string;
    status: 'sent' | 'delivered' | 'read';
    type?: 'text' | 'location';
    locationName?: string;
    locationAddr?: string;
}

interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastMessage: string;
    time: string;
    unread: number;
    lastSeen?: string;
    lastInteraction?: number;
}

// --- Mock Data ---
const initialContacts: Contact[] = [
    {
        id: '1',
        name: 'Sayali Sontakke',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastMessage: "The wedding venue looks divine!",
        time: '03:54',
        unread: 0,
        lastSeen: '19:00',
        lastInteraction: Date.now() - 100000
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        status: 'offline',
        lastMessage: "😊",
        time: '18:59',
        unread: 0,
        lastSeen: 'Yesterday',
        lastInteraction: Date.now() - 500000
    },
    {
        id: '3',
        name: 'Pete Jackson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastMessage: "You: Happy to hear that!",
        time: '11:13',
        unread: 0,
        lastInteraction: Date.now() - 1000000
    },
    {
        id: '4',
        name: 'Elle Johnson',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        status: 'offline',
        lastMessage: "That's great, I'll see you there",
        time: '02:53',
        unread: 0,
        lastInteraction: Date.now() - 2000000
    },
    {
        id: '5',
        name: 'Noah Pattinson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        status: 'online',
        lastMessage: "Hey checking this out!",
        time: '17:01',
        unread: 0,
        lastInteraction: Date.now() - 3000000
    }
];

const initialMessagesData: Record<string, Message[]> = {
    '1': [
        { id: 1, text: "Hey Sherry, What are you up to tonight?", sender: 'them', time: '18:56', status: 'read' },
        { id: 2, text: "Hey, Sayali. Nothing, You?", sender: 'me', time: '18:57', status: 'read' },
        { id: 3, text: "I just found this cool cafe down the street, check it out!", sender: 'them', time: '18:57', status: 'read' },
        { 
            id: 4, 
            text: "", 
            type: 'location',
            locationName: "Ritz Cafe, San Fransico",
            locationAddr: "123 Sanctuary Street, SF",
            sender: 'them', 
            time: '18:57', 
            status: 'read' 
        }
    ]
};

const MessagesPage: React.FC = () => {
    const navigate = useNavigate();
    const { id: activeId } = useParams();
    const location = useLocation();
    
    const [newMessage, setNewMessage] = useState('');
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [messagesByContact, setMessagesByContact] = useState(initialMessagesData);
    const [isCalling, setIsCalling] = useState(false);
    const [callType, setCallType] = useState<'audio' | 'video'>('video');
    const [searchTerm, setSearchTerm] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Dynamic Filter & Sort: newly interacted ones on top
    const filteredContacts = [...contacts]
        .filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => (b.lastInteraction || 0) - (a.lastInteraction || 0));
    
    const activeContact = filteredContacts.find(c => c.id === activeId) || filteredContacts[0] || initialContacts[0];
    const messages = messagesByContact[activeContact.id] || [];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeId]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        
        const now = Date.now();
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        
        const msg: Message = {
            id: now,
            text: newMessage,
            sender: 'me',
            time: timeStr,
            status: 'sent'
        };

        // Update messages
        setMessagesByContact(prev => ({ 
            ...prev, 
            [activeContact.id]: [...(prev[activeContact.id] || []), msg] 
        }));

        // Update contact last message and move to top
        setContacts(prev => prev.map(c => 
            c.id === activeContact.id 
                ? { ...c, lastMessage: `You: ${newMessage}`, time: timeStr, lastInteraction: now } 
                : c
        ));

        setNewMessage('');
    };

    const initiateCall = (type: 'audio' | 'video') => {
        setCallType(type);
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

                <div className="mt-auto">
                    <button className="text-gray-300 hover:text-gray-900"><MoreHorizontal size={32} /></button>
                </div>
            </aside>

            {/* 2. CONTACT LIST */}
            <section className="w-[450px] border-r border-[#E8E4D5] flex flex-col bg-white/40">
                <header className="p-8">
                    <div className="relative mb-8">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search contacts, conversations and more"
                            className="w-full bg-white border border-[#E8E4D5] rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 ring-[#c6862e]/30 placeholder:text-gray-400"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                    <AnimatePresence initial={false}>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map(contact => (
                                <motion.div 
                                    layout
                                    key={contact.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => navigate(`/messages/${contact.id}`)}
                                    className={`flex items-center gap-5 px-10 py-6 cursor-pointer transition-all border-b border-[#E8E4D5]/30 ${activeId === contact.id ? 'bg-white shadow-[0_10px_30px_rgba(198,134,46,0.05)]' : 'hover:bg-white/20'}`}
                                >
                                    <div className="relative">
                                        <img src={contact.avatar} className="w-14 h-14 rounded-full object-cover shadow-md" alt="" />
                                        {contact.status === 'online' && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-base font-bold text-[#1A1A1A] truncate">{contact.name}</h4>
                                            <span className="text-[11px] text-gray-400 font-medium">{contact.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[13px] text-gray-500 truncate">{contact.lastMessage}</p>
                                            {contact.unread > 0 && (
                                                <div className="w-5 h-5 bg-[#c6862e] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                                                    {contact.unread}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-20 text-gray-400 gap-4">
                                <Search size={48} strokeWidth={1} className="opacity-20" />
                                <p className="text-sm font-bold uppercase tracking-widest">No spirits found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 3. CHAT CONTENT */}
            <section className="flex-1 flex flex-col bg-[#FDFBF2]/50 relative">
                {/* Chat Header */}
                <header className="px-12 py-6 border-b border-[#E8E4D5] flex justify-between items-center bg-white/60 backdrop-blur-md">
                    {activeContact && (
                        <div className="flex items-center gap-5 cursor-pointer" onClick={() => navigate(`/matches/${activeContact.id}`)}>
                            <img src={activeContact.avatar} className="w-12 h-12 rounded-full object-cover shadow-md" alt="" />
                            <div>
                                <h3 className="text-lg font-bold text-[#1A1A1A]">{activeContact.name}</h3>
                                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">
                                    {activeContact.lastSeen ? `Last Seen at ${activeContact.lastSeen}` : activeContact.status === 'online' ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-8 text-gray-400">
                        <button className="hover:text-[#c6862e] transition-colors text-yellow-500"><Star size={24} fill="currentColor" /></button>
                        <button onClick={() => initiateCall('audio')} className="hover:text-[#c6862e] transition-colors"><Phone size={24} /></button>
                        <button onClick={() => initiateCall('video')} className="hover:text-[#c6862e] transition-colors"><VideoIcon size={24} /></button>
                    </div>
                </header>

                {/* Message Feed */}
                <div 
                    className="flex-1 overflow-y-auto no-scrollbar p-12 space-y-8 bg-gradient-to-tr from-[#FDFBF2] via-[#FDFBF2] to-blue-50/20"
                    style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(198,134,46,0.02) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(59,130,246,0.02) 0%, transparent 40%)' }}
                >
                    <div className="flex justify-center">
                        <div className="bg-white px-6 py-2.5 rounded-2xl shadow-sm text-[11px] font-black uppercase tracking-widest text-gray-400">Today</div>
                    </div>

                    <div className="space-y-6">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                {msg.type === 'location' ? (
                                    <div className="w-[380px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 p-6 space-y-4">
                                        <h4 className="font-bold text-gray-900">{msg.locationName}</h4>
                                        <div className="relative h-40 rounded-3xl overflow-hidden bg-blue-50 border border-gray-100 flex items-center justify-center group cursor-pointer">
                                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&key=YOUR_API_KEY')` }} />
                                            <div className="relative z-10 w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#c6862e] shadow-xl group-hover:scale-110 transition-transform">
                                                <Map size={24} />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                            <span>{msg.time}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`max-w-[65%] group`}>
                                        <div className={`px-8 py-5 rounded-[2rem] shadow-xl text-sm font-bold leading-relaxed border ${msg.sender === 'me' ? 'bg-[#E1F1FF] text-[#1D4ED8] border-blue-100 rounded-tr-none' : 'bg-white text-gray-800 border-gray-50 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                        <div className={`mt-2 text-[11px] text-gray-400 font-bold ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                            {msg.time}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Chat Input */}
                <footer className="px-12 py-10">
                    <div className="flex items-center gap-4 bg-white/60 p-2 rounded-[3.5rem] border border-white shadow-2xl backdrop-blur-xl">
                        <div className="flex-1 bg-white border border-gray-100 rounded-full px-10 py-4 flex items-center shadow-inner">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message"
                                className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-800 placeholder:text-gray-300"
                            />
                            <button onClick={handleSend} className="ml-4 text-[#c6862e] hover:scale-110 transition-all">
                                <SendHorizontal size={24} />
                            </button>
                        </div>
                        <button className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#c6862e] shadow-lg transition-all active:scale-95">
                            <Paperclip size={24} />
                        </button>
                        <button className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#c6862e] shadow-lg transition-all active:scale-95">
                            <Mic size={24} />
                        </button>
                    </div>
                </footer>
            </section>

            {/* Cinematic Call Overlay (Optional: only if call is active) */}
            <AnimatePresence>
                {isCalling && activeContact && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-[#0A0A0A] flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A] via-black to-[#2A2A2A]" />
                        <motion.img initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2 }} src={activeContact.avatar} className="absolute inset-0 w-full h-full object-cover grayscale blur-2xl pointer-events-none" />
                        
                        <div className="relative z-10 w-full max-w-6xl px-12 flex flex-col items-center gap-20">
                            <div className="flex flex-col items-center gap-10 text-center">
                                <motion.div animate={{ boxShadow: ["0 0 60px #c6862e22", "0 0 120px #c6862e66", "0 0 60px #c6862e22"] }} transition={{ duration: 4, repeat: Infinity }} className="relative">
                                    <img src={activeContact.avatar} className="w-64 h-64 rounded-[6rem] object-cover border-8 border-white/10 shadow-3xl" />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#c6862e] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-3xl border-4 border-[#0A0A0A] whitespace-nowrap">
                                        {callType === 'video' ? 'Video' : 'Voice'} Resonance Active
                                    </div>
                                </motion.div>
                                <div>
                                    <h2 className="text-8xl font-serif text-white mb-6 tracking-tighter">{activeContact.name}</h2>
                                    <div className="flex items-center justify-center gap-4 text-[#D4AF37] font-black text-sm uppercase tracking-[0.6em]">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" /> Connection Synchronized
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-12 items-center">
                                <button className="w-24 h-24 rounded-[3.5rem] bg-white/5 text-white flex items-center justify-center border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all hover:scale-110 active:scale-90"><MicOff size={36} /></button>
                                <button onClick={() => setIsCalling(false)} className="w-36 h-36 rounded-[4.5rem] bg-[#801B1B] text-white flex items-center justify-center shadow-3xl hover:bg-rose-700 hover:scale-110 active:scale-95 transition-all outline-none border-t-4 border-rose-400/30"><PhoneOff size={56} /></button>
                                <button className="w-24 h-24 rounded-[3.5rem] bg-white/5 text-white flex items-center justify-center border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all hover:scale-110 active:scale-90"><VideoOff size={36} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MessagesPage;
