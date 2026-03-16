import React from 'react';
import { motion } from 'framer-motion';
import { Search, Send, CheckCircle2, MoreHorizontal, Filter } from 'lucide-react';

interface PriorityConversation {
    id: number;
    name: string;
    image: string;
    match: number;
    unread: number;
    online: boolean;
}

interface Message {
    id: number;
    name: string;
    image: string;
    match: number;
    lastMessage: string;
    time: string;
    unread: number;
    verified: boolean;
    online: boolean;
}

const priorityConversations: PriorityConversation[] = [
    {
        id: 1,
        name: 'Ananya',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        match: 96,
        unread: 2,
        online: true
    },
    {
        id: 2,
        name: 'Priya',
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        match: 92,
        unread: 1,
        online: false
    }
];

const messages: Message[] = [
    {
        id: 1,
        name: 'Priya M.',
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        match: 92,
        lastMessage: 'Are you free this weekend for a coffee?',
        time: '1h ago',
        unread: 1,
        verified: true,
        online: false
    },
    {
        id: 2,
        name: 'Sneha K.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        match: 85,
        lastMessage: 'That sounds like a great plan.',
        time: '3h ago',
        unread: 0,
        verified: false,
        online: true
    },
    {
        id: 3,
        name: 'Riya J.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        match: 78,
        lastMessage: 'Hi Rahul! Thanks for connecting.',
        time: '1d ago',
        unread: 0,
        verified: true,
        online: false
    },
    {
        id: 4,
        name: 'Meera P.',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
        match: 70,
        lastMessage: 'Will check and let you know.',
        time: '2d ago',
        unread: 0,
        verified: false,
        online: false
    }
];

const Messages: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col pt-8 px-8">
            {/* Header */}
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Messages</h1>
                    <p className="text-gray-500 font-medium mt-1">Your conversations</p>
                </div>
                <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-400 hover:text-[#c6862e]">
                    <Search size={22} />
                </button>
            </header>

            {/* Priority Conversations */}
            <section className="mb-10">
                <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    Priority Conversations
                    <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                    {priorityConversations.map((pc) => (
                        <motion.div
                            key={pc.id}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center bg-white p-5 rounded-[2.5rem] min-w-[140px] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group"
                        >
                            <div className="relative mb-3">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                    <img src={pc.image} className="w-full h-full object-cover" alt={pc.name} />
                                </div>
                                {pc.online && (
                                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                                )}
                                <div className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                    {pc.unread}
                                </div>
                            </div>
                            <h3 className="text-sm font-black text-gray-900 mb-1 flex items-center gap-1">
                                {pc.name}
                                <CheckCircle2 size={12} className="text-blue-500 fill-blue-500" />
                            </h3>
                            <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#c6862e] transition-colors">{pc.match}% Match</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8">
                {['All', 'Unread', 'Mutual Interest', 'Verified'].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all ${i === 0 ? 'bg-rose-900 text-white shadow-lg shadow-rose-900/20' : 'bg-gray-100/50 text-gray-500 hover:bg-gray-200/50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Start a Conversation Banner */}
            <div className="mb-10 p-8 rounded-[3rem] bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-sm relative overflow-hidden group">
                {/* Decorative icons */}
                <div className="absolute top-6 left-6 text-rose-300 opacity-50 group-hover:scale-125 transition-transform">
                    <Send size={24} className="rotate-[15deg]" />
                </div>

                <div className="relative z-10 text-center max-w-md mx-auto">
                    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-center gap-2">
                        <span className="text-rose-600">✨</span> Start a Conversation
                    </h3>
                    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <p className="flex-1 text-sm italic text-gray-500 text-left px-2">
                            "What's your favorite travel memory?"
                        </p>
                        <button className="bg-rose-900 text-white p-3 rounded-2xl hover:bg-rose-800 transition-all active:scale-90">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat List */}
            <div className="flex flex-col gap-6">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-6 p-4 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all cursor-pointer group"
                    >
                        {/* Avatar Cell */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#c6862e]/30 transition-all">
                                <img src={msg.image} className="w-full h-full object-cover" alt={msg.name} />
                            </div>
                            {msg.online && (
                                <div className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                            )}
                        </div>

                        {/* Content Cell */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h4 className="text-base font-black text-gray-900 flex items-center gap-1.5">
                                        {msg.name}
                                        {msg.verified && <CheckCircle2 size={14} className="text-blue-500 fill-blue-500" />}
                                    </h4>
                                    <span className="text-[11px] font-bold text-rose-600">{msg.match}% Match</span>
                                </div>
                                <span className="text-xs font-medium text-gray-400">{msg.time}</span>
                            </div>
                            <p className={`text-sm ${msg.unread > 0 ? 'text-gray-900 font-extrabold' : 'text-gray-500 font-medium'} truncate line-clamp-1`}>
                                {msg.lastMessage}
                            </p>
                        </div>

                        {/* Action Cell */}
                        <div className="flex flex-col items-end gap-2 pr-2">
                            {msg.unread > 0 && (
                                <div className="bg-rose-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-rose-900/30">
                                    {msg.unread}
                                </div>
                            )}
                            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
