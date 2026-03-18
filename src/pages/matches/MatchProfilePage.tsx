import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, MessageSquare, MapPin, Share2,
    ArrowLeft, ShieldCheck, Star, Zap,
    Calendar, Briefcase, GraduationCap, Users,
    Coffee, Wind, Utensils, MoreHorizontal,
    Phone, Video, CheckCircle2
} from 'lucide-react';
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
    about: string;
    familyDetails: {
        fatherStatus: string;
        motherStatus: string;
        siblings: string;
    };
    lifestyle: {
        diet: string;
        drink: string;
        smoke: string;
    }
}

// --- Mock Data ---
const mockMatches: MatchProfile[] = [
    {
        id: '1',
        name: 'Sayali Sontakke',
        image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        age: 26,
        height: '5\'5"',
        religion: 'Hindu',
        caste: 'Maratha',
        location: 'Pune, India',
        education: 'B.Des (UI/UX)',
        profession: 'Web Designer at Creative Hub',
        about: 'Creative soul with a passion for designing beautiful digital experiences. I love traveling, spicy food, and weekend hikes.',
        familyDetails: {
            fatherStatus: 'Business',
            motherStatus: 'Homemaker',
            siblings: '1 Brother'
        },
        lifestyle: {
            diet: 'Vegetarian',
            drink: 'No',
            smoke: 'No'
        }
    },
    {
        id: '2',
        name: 'Rohit Agarwal',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        matchPercentage: 88,
        age: 28,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Marwari',
        location: 'Mumbai, India',
        education: 'B.Tech IT',
        profession: 'Software Engineer at GlobalTech',
        about: 'Tech enthusiast who loves coding by day and cooking by night. Looking for someone who appreciates a good laugh and deep conversations.',
        familyDetails: {
            fatherStatus: 'Retired',
            motherStatus: 'Homemaker',
            siblings: '1 Sister'
        },
        lifestyle: {
            diet: 'Vegetarian',
            drink: 'No',
            smoke: 'No'
        }
    }
    // ... other matches can be added back if needed, but for the redesign focus, let's keep it compact
];

const MatchProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<MatchProfile | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const foundProfile = mockMatches.find(p => p.id === id);
        if (foundProfile) {
            setProfile(foundProfile);
        }
    }, [id]);

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF2] py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-serif text-gray-900 mb-6">Profile Beyond Reach</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c6862e] mb-10">This essence is not currently visible in this realm</p>
                    <button
                        onClick={() => navigate('/matches')}
                        className="bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-[#c6862e] transition-all shadow-2xl"
                    >
                        Return to Matches
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans selection:bg-rose-100 selection:text-rose-600 overflow-x-hidden">
            {/* Elegant Background Accents */}
            <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tl from-[#801B1B]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

            {/* 1. TOP CINEMATIC BAR */}
            <nav className="fixed top-0 left-0 right-0 h-24 bg-white/30 backdrop-blur-2xl border-b border-white/40 z-50 flex items-center justify-between px-10">
                <button
                    onClick={() => navigate('/matches')}
                    className="flex items-center text-gray-900 font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#c6862e] transition-all group"
                >
                    <ArrowLeft size={20} className="mr-3 transform group-hover:-translate-x-2 transition-transform" />
                    Back to Matches
                </button>
                <div className="hidden md:flex items-center gap-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Viewing Essence of <span className="text-gray-900">{profile.name}</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-4 bg-white/50 border border-white rounded-2xl text-gray-400 hover:text-[#c6862e] transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="p-4 bg-white/50 border border-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </nav>

            {/* 2. MAIN CONTENT AREA */}
            <main className="max-w-[1400px] mx-auto pt-36 px-6 pb-32 relative z-10">
                <div className="flex flex-col xl:flex-row gap-12 items-start">

                    {/* Left Panel: The Portrait (Glass Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full xl:w-[500px] shrink-0 sticky xl:top-36"
                    >
                        <div className="bg-white/30 backdrop-blur-3xl rounded-[4rem] p-4 border border-white/50 shadow-2xl overflow-hidden group">
                            <div className="relative rounded-[3.5rem] overflow-hidden h-[650px]">
                                <img
                                    src={profile.image}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt={profile.name}
                                />
                                {/* Overlay Information */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                <div className="absolute top-8 right-8 flex flex-col gap-4">
                                    <div className="bg-white/95 backdrop-blur-md text-[#c6862e] font-black px-6 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
                                        <Zap size={16} fill="currentColor" className="fill-[#c6862e]/20" />
                                        <span className="text-sm tracking-widest">{profile.matchPercentage}% Sync</span>
                                    </div>
                                    <div className="bg-white/95 backdrop-blur-md text-[#1A1A1A] font-black p-3 rounded-2xl shadow-2xl border border-white flex items-center justify-center">
                                        <ShieldCheck size={20} />
                                    </div>
                                </div>

                                <div className="absolute bottom-12 left-10">
                                    <h1 className="text-5xl font-serif text-white mb-4 leading-tight">{profile.name}</h1>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2 text-white/80 font-bold tracking-tight">
                                            <MapPin size={18} className="text-[#c6862e]" />
                                            {profile.location}
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                        <div className="flex items-center gap-2 text-white/80 font-bold tracking-tight">
                                            <Calendar size={18} className="text-[#c6862e]" />
                                            {profile.age} Years
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Portrait Actions */}
                            <div className="p-8 flex items-center gap-4">
                                <button
                                    onClick={() => navigate(`/messages/${profile.id}`)}
                                    className="flex-1 py-6 bg-[#1A1A1A] text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-[#c6862e] transition-all active:scale-95"
                                >
                                    <MessageSquare size={20} className="stroke-[2.5]" /> Initiate Whispers
                                </button>
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`w-20 h-20 rounded-[2.5rem] border-2 flex items-center justify-center transition-all active:scale-90 ${isLiked ? 'bg-[#801B1B] border-[#801B1B] text-white shadow-xl shadow-[#801B1B]/30' : 'bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:border-rose-100 shadow-xl'}`}
                                >
                                    <Heart size={32} fill={isLiked ? "currentColor" : "none"} className="stroke-[2.5]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel: The Essence (Scrollable Details) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 space-y-12"
                    >
                        {/* 1. About Section */}
                        <div className="bg-white/30 backdrop-blur-3xl rounded-[4rem] p-12 border border-white/50 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-gray-100 transition-colors group-hover:text-[#c6862e]/10">
                                <Star size={80} strokeWidth={1} />
                            </div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#c6862e] mb-8">Personal Reflection</h2>
                            <p className="text-2xl font-serif text-gray-800 leading-relaxed italic opacity-80 pl-6 border-l-4 border-[#c6862e]/20">
                                "{profile.about}"
                            </p>
                        </div>

                        {/* 2. Grid Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Essence of Origin */}
                            <div className="bg-white/40 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#FDFBF2] rounded-2xl flex items-center justify-center text-[#c6862e] shadow-inner border border-white">
                                        <Users size={22} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Divine Heritage</h3>
                                </div>
                                <ul className="space-y-6">
                                    {[
                                        { label: 'Spiritual Belief', value: profile.religion, icon: <Star size={14} /> },
                                        { label: 'Caste Lineage', value: profile.caste || 'Open to Destiny', icon: <div className="w-1.5 h-1.5 bg-[#c6862e] rounded-full" /> },
                                        { label: 'Mother Tongue', value: 'Marathi', icon: <MessageSquare size={14} /> }
                                    ].map((item, i) => (
                                        <li key={i} className="flex justify-between items-center group/item p-4 rounded-2xl hover:bg-white transition-all">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-300 group-hover/item:text-[#c6862e] transition-colors">{item.icon}</span>
                                                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover/item:text-gray-900">{item.label}</span>
                                            </div>
                                            <span className="text-base font-serif text-gray-800">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Intellectual Aura */}
                            <div className="bg-white/40 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#FDFBF2] rounded-2xl flex items-center justify-center text-[#1A1A1A] shadow-inner border border-white">
                                        <GraduationCap size={22} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Intellectual Aura</h3>
                                </div>
                                <ul className="space-y-6">
                                    {[
                                        { label: 'Education Seal', value: profile.education, icon: <GraduationCap size={14} /> },
                                        { label: 'Vocation', value: profile.profession || 'Pursuing Purpose', icon: <Briefcase size={14} /> },
                                        { label: 'Location Sync', value: profile.location, icon: <MapPin size={14} /> }
                                    ].map((item, i) => (
                                        <li key={i} className="flex flex-col gap-2 group/item p-4 rounded-2xl hover:bg-white transition-all">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                                                <span className="text-gray-200 group-hover/item:text-[#c6862e] transition-all">{item.icon}</span>
                                            </div>
                                            <span className="text-lg font-serif text-gray-800">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Family Constellation */}
                            <div className="bg-white/40 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#FDFBF2] rounded-2xl flex items-center justify-center text-[#801B1B] shadow-inner border border-white">
                                        <Heart size={22} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Family Constellation</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { label: 'Paternal Root', value: profile.familyDetails.fatherStatus },
                                        { label: 'Maternal Grace', value: profile.familyDetails.motherStatus },
                                        { label: 'Bond Hierarchy', value: profile.familyDetails.siblings }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/30 p-6 rounded-3xl border border-white flex justify-between items-center hover:bg-white hover:shadow-md transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                                            <span className="text-base font-black text-gray-800">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lifestyle Resonance */}
                            <div className="bg-white/40 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#FDFBF2] rounded-2xl flex items-center justify-center text-[#c6862e] shadow-inner border border-white">
                                        <Coffee size={22} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Lifestyle Resonance</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { label: 'Dietary Path', value: profile.lifestyle.diet, icon: <Utensils size={16} /> },
                                        { label: 'Social Spirit', value: profile.lifestyle.drink === 'No' ? 'Pure' : 'Occasional', icon: <Coffee size={16} /> },
                                        { label: 'Physical Breath', value: profile.lifestyle.smoke === 'No' ? 'Sacred' : 'Temporal', icon: <Wind size={16} /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6 p-6 rounded-3xl border border-white hover:bg-white transition-all bg-white/20">
                                            <div className="text-gray-300 group-hover:text-[#c6862e]">{item.icon}</div>
                                            <div>
                                                <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</span>
                                                <span className="text-base font-black text-gray-800">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA: Divine Connection Call */}
                        <div className="bg-[#1A1A1A] rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#c6862e]/20 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <h3 className="text-4xl font-serif mb-6 leading-tight">Proceed with Resonance?</h3>
                                    <p className="text-white/40 font-bold leading-relaxed max-w-md uppercase text-[10px] tracking-[0.3em]">
                                        Unlock deeper layers of compatibility and initiate a secure video resonance to witness the synchronicity.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="w-20 h-20 rounded-[2.5rem] bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
                                        <Phone size={32} />
                                    </button>
                                    <button className="w-20 h-20 rounded-[2.5rem] bg-[#c6862e] border border-white/20 flex items-center justify-center hover:scale-110 shadow-2xl shadow-[#c6862e]/30 transition-all text-white">
                                        <Video size={32} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default MatchProfilePage;
