import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, Star, MapPin, Briefcase, GraduationCap, ChevronRight, UserPlus, Zap, ShieldCheck, MessageSquare } from 'lucide-react';
import siddharthImg from '../../assets/matches/siddharth.png';

// --- Types ---
interface MatchProfile {
    id: string;
    name: string;
    image: string;
    matchPercentage: number;
    age: number;
    height: string;
    religion: string;
    caste?: string;
    location: string;
    education: string;
    profession?: string;
    isVerified: boolean;
}

// --- Mock Data ---
const mockMatches: MatchProfile[] = [
    {
        id: '1',
        name: 'Sayali Sontakke',
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        matchPercentage: 92,
        age: 26,
        height: '5\'5"',
        religion: 'Hindu',
        caste: 'Maratha',
        location: 'Pune, India',
        education: 'B.Des (UI/UX)',
        isVerified: true
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        matchPercentage: 88,
        age: 28,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Marwari',
        location: 'Mumbai, India',
        education: 'B.Tech IT',
        isVerified: true
    },
    {
        id: '3',
        name: 'John Alex',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        matchPercentage: 84,
        age: 29,
        height: '6\'0"',
        religion: 'Christian',
        location: 'Delhi, India',
        education: 'MBA',
        isVerified: false
    },
    {
        id: '4',
        name: 'Rosy Dane',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        matchPercentage: 79,
        age: 27,
        height: '5\'6"',
        religion: 'Christian',
        location: 'Bangalore, India',
        education: 'M.Com',
        isVerified: true
    },
    {
        id: '5',
        name: 'Arjun Nair',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=500&fit=crop',
        matchPercentage: 68,
        age: 31,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Malayali',
        location: 'Bengaluru, KA',
        education: 'Doctor',
        isVerified: true
    },
    {
        id: '6',
        name: 'Karan Kulkarni',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=500&fit=crop',
        matchPercentage: 90,
        age: 28,
        height: '5\'8"',
        religion: 'Hindu',
        caste: 'Brahmin',
        location: 'Hyderabad, TS',
        education: 'Data Scientist',
        isVerified: true
    },
    {
        id: '7',
        name: 'Siddharth Verma',
        image: siddharthImg,
        matchPercentage: 85,
        age: 29,
        height: '5\'10"',
        religion: 'Hindu',
        caste: 'Kayastha',
        location: 'Lucknow, UP',
        education: 'Entrepreneur',
        isVerified: false
    },
    {
        id: '8',
        name: 'Aditya Rao',
        image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=500&fit=crop',
        matchPercentage: 78,
        age: 30,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Telugu',
        location: 'Chennai, TN',
        education: 'Civil Engineer',
        isVerified: true
    }
];

const MatchesPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans overflow-x-hidden relative">
            {/* Elegant Background Accents */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-[#801B1B]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

            {/* Main Content Area */}
            <div className="max-w-[1700px] mx-auto px-6 py-12 md:px-12 relative z-20">

                {/* Header: Royal Reveal */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 pt-16"
                >
                    <div className="max-w-2xl px-4">
                        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 tracking-tight leading-none">The Gathering</h1>
                        <p className="text-[#c6862e] font-black text-[10px] uppercase tracking-[0.5em] mt-6 opacity-80">Souls woven by destiny & shared aspirations</p>
                    </div>
                </motion.header>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Filter Deck: Glass Control Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-[350px] bg-white/30 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white/50 shadow-2xl sticky top-28 flex-shrink-0"
                    >
                        <h2 className="text-2xl font-serif text-gray-900 mb-10 text-center tracking-tight">Refine Affinity</h2>

                        <div className="space-y-10">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-4 text-center">Spiritual Origin</label>
                                <div className="space-y-3">
                                    {['All', 'Hindu', 'Christian', 'Sikh'].map(rel => (
                                        <button
                                            key={rel}
                                            onClick={() => setActiveFilter(rel)}
                                            className={`w-full py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === rel ? 'bg-[#c6862e] text-white shadow-xl' : 'bg-white/50 text-gray-400 hover:text-gray-900 border border-transparent hover:border-white/50'}`}
                                        >
                                            {rel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c6862e] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by essence..."
                                    className="w-full bg-white/50 border border-white rounded-[2rem] py-5 pl-14 pr-6 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#c6862e] outline-none transition-all"
                                />
                            </div>

                            <button className="w-full py-6 bg-[#1A1A1A] text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#c6862e] transition-all shadow-2xl hover:scale-[1.02] active:scale-95">
                                Harmonize Results
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Grid: Profile Gallery */}
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        <AnimatePresence>
                            {mockMatches.map((profile, i) => (
                                <motion.div
                                    key={profile.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -15, transition: { type: 'spring', stiffness: 300 } }}
                                    className="bg-white/30 backdrop-blur-3xl rounded-[4rem] p-4 border border-white/50 shadow-2xl flex flex-col group relative overflow-hidden"
                                >
                                    {/* Cinematic Portrait */}
                                    <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden">
                                        <img
                                            src={profile.image}
                                            alt={profile.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                                        {/* Match Badge */}
                                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-[#c6862e] text-[10px] font-black px-5 py-2.5 rounded-2xl shadow-2xl border border-white flex items-center gap-2">
                                            <Zap size={14} fill="currentColor" className="fill-[#c6862e]/20" />
                                            {profile.matchPercentage}% Sync
                                        </div>

                                        {profile.isVerified && (
                                            <div className="absolute top-6 left-6 p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-[#c6862e] border border-white shadow-xl">
                                                <ShieldCheck size={18} />
                                            </div>
                                        )}

                                        <div className="absolute bottom-8 left-8">
                                            <h3 className="text-3xl font-serif text-white mb-2 leading-tight">{profile.name}</h3>
                                            <div className="flex items-center gap-4 text-white/70 text-sm font-bold tracking-tight">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-[#c6862e]" />
                                                    {profile.location.split(',')[0]}
                                                </div>
                                                <span className="opacity-30">•</span>
                                                <span>{profile.age} yrs</span>
                                            </div>
                                        </div>

                                        {/* Quick Action Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto">
                                            <button className="w-16 h-16 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-all delay-75 hover:scale-110 active:scale-95">
                                                <Heart size={26} className="text-[#801B1B]" />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/messages/${profile.id}`)}
                                                className="w-16 h-16 rounded-full bg-[#c6862e] text-white flex items-center justify-center shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-all delay-150 hover:scale-110 active:scale-95"
                                            >
                                                <MessageSquare size={26} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="p-8 pt-10 flex flex-col flex-1">
                                        <div className="grid grid-cols-2 gap-4 mb-10">
                                            <div className="bg-white/50 py-4 px-4 rounded-3xl border border-white shadow-sm flex flex-col">
                                                <div className="flex items-center gap-2 mb-2 text-[#c6862e]">
                                                    <GraduationCap size={14} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Knowledge</span>
                                                </div>
                                                <p className="text-[13px] font-black text-gray-800 tracking-tight truncate">{profile.education}</p>
                                            </div>
                                            <div className="bg-white/50 py-4 px-4 rounded-3xl border border-white shadow-sm flex flex-col">
                                                <div className="flex items-center gap-2 mb-2 text-[#c6862e]">
                                                    <Briefcase size={14} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Essence</span>
                                                </div>
                                                <p className="text-[13px] font-black text-gray-800 tracking-tight truncate">{profile.religion}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/matches/${profile.id}`)}
                                            className="w-full py-6 bg-[#1A1A1A] text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-2xl hover:bg-[#c6862e] transition-all group/btn"
                                        >
                                            View Essence <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatchesPage;
