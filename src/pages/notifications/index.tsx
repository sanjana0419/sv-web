import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Bell, Home, Search, Star, MessageSquare, Settings, 
    ArrowLeft, Heart, UserPlus, Star as StarIcon, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockNotifications = [
    {
        id: 1,
        type: 'match',
        user: 'Sayali Sontakke',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        text: 'sent you a connection request.',
        time: '5m ago',
        isUnread: true
    },
    {
        id: 2,
        type: 'like',
        user: 'Rohit Agarwal',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        text: 'liked your profile.',
        time: '2h ago',
        isUnread: false
    },
    {
        id: 3,
        type: 'system',
        user: 'System',
        avatar: 'https://images.unsplash.com/photo-1614850523296-e8c1d4704a96?auto=format&fit=crop&w=400&q=80',
        text: 'Your profile is 90% complete. Complete your profile for better visibility.',
        time: 'Yesterday',
        isUnread: false
    }
];

const NotificationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(mockNotifications);

    const handleAction = (id: number, action: 'accept' | 'decline') => {
        // Logic to remove notification after action
        setNotifications(prev => prev.filter(n => n.id !== id));
        // You could also add a toast or success message here
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    };

    const navItems = [
        { icon: <Home size={24} />, path: '/home', label: 'Home' },
        { icon: <Search size={24} />, path: '/explore', label: 'Explore' },
        { icon: <Star size={24} />, path: '/matches', label: 'Matches' },
        { icon: <MessageSquare size={24} />, path: '/messages', label: 'Messages' },
        { icon: <Bell size={24} />, path: '/notifications', label: 'Notifications', active: true },
        { icon: <Settings size={24} />, path: '/settings', label: 'Settings' }
    ];

    return (
        <div className="flex h-screen bg-[#FDFBF2] text-gray-900 font-sans overflow-hidden">
            {/* 1. App Navigation Rail */}
            <nav className="w-20 lg:w-64 border-r border-gray-200/50 flex flex-col p-4 bg-white/40 backdrop-blur-xl shrink-0">
                <div className="mb-12 px-2 lg:px-6">
                    <h1 className="text-3xl font-serif text-[#c6862e] hidden lg:block">ShubhVivah</h1>
                    <div className="w-10 h-10 bg-[#c6862e] rounded-xl flex items-center justify-center lg:hidden shadow-lg"><StarIcon className="text-white" size={20} /></div>
                </div>
                <div className="flex flex-col gap-2">
                    {navItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.active ? 'bg-white shadow-xl text-[#c6862e] scale-105' : 'hover:bg-white/60 text-gray-400 hover:text-gray-700'}`}
                        >
                            <span className="shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className={`font-bold hidden lg:block tracking-wide ${item.active ? 'text-gray-900' : ''}`}>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* 2. Notifications Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-white/10">
                <header className="px-12 py-10 flex items-center justify-between bg-white/40 backdrop-blur-xl border-b border-gray-100/50">
                    <div className="flex items-center gap-10">
                        <button onClick={() => navigate(-1)} className="p-3 bg-white shadow-md rounded-2xl text-gray-400 hover:text-[#c6862e] transition-all"><ArrowLeft size={24} /></button>
                        <div>
                            <h2 className="text-4xl font-serif text-gray-900 leading-none">Notifications</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c6862e] mt-2 opacity-60">Stay updated with your latest profile activity</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex gap-4">
                        <button 
                            onClick={markAllAsRead}
                            className="px-8 py-3 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#c6862e] transition-all"
                        >
                            Mark all as read
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-12 space-y-4 no-scrollbar">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#c6862e]">Recent Activity</h3>
                        
                        <AnimatePresence>
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className={`p-8 rounded-[3rem] border border-white flex items-center gap-8 group transition-all cursor-pointer ${notif.isUnread ? 'bg-white shadow-2xl relative' : 'bg-white/40 opacity-70 hover:opacity-100 hover:bg-white/60'}`}
                                >
                                {notif.isUnread && <div className="absolute top-8 left-4 w-2 h-2 bg-[#c6862e] rounded-full animate-pulse" />}
                                <div className="relative shrink-0">
                                    <img src={notif.avatar} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white shadow-lg" alt="" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#c6862e] shadow-md border border-gray-50">
                                        {notif.type === 'match' ? <UserPlus size={12} /> : notif.type === 'like' ? <Heart size={12} /> : <Info size={12} />}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-base text-gray-800 font-bold">
                                        <span className="text-[#c6862e] font-black">{notif.user}</span> {notif.text}
                                    </p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{notif.time}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    {notif.type === 'match' && (
                                        <>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleAction(notif.id, 'accept'); }}
                                                className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#c6862e] transition-all"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleAction(notif.id, 'decline'); }}
                                                className="px-6 py-2.5 bg-white border border-gray-100 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:text-[#c6862e] transition-all"
                                            >
                                                Decline
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-20 text-gray-400 gap-4">
                            <Bell size={48} strokeWidth={1} className="opacity-20" />
                            <p className="text-sm font-bold uppercase tracking-widest">No new notifications</p>
                        </div>
                    )}
                    </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;
