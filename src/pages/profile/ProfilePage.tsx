import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, MapPin, Briefcase, GraduationCap, 
    Wind, Utensils, Coffee, Star, ShieldCheck, 
    ArrowLeft, Save, Sparkles, User, Heart,
    Settings, Globe, Shield, Zap, Bell, MessageSquare
} from 'lucide-react';

// --- Types ---
interface UserProfile {
    id: string;
    name: string;
    image: string;
    bio: string;
    profession: string;
    location: string;
    education: string;
    dob: string;
    diet: string;
    drink: string;
    smoke: string;
    spirituality: string;
    community: string;
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        id: 'user_1',
        name: 'Sherry Hamilton',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        bio: 'I love finding beauty in the details. Searching for a soul that values silence and deep conversation. Looking for a cinematic love story in real life.',
        profession: 'Cinematic Storyteller & Architect',
        location: 'San Francisco, CA',
        education: 'Masters in Fine Arts',
        dob: 'Jan 15, 1995',
        diet: 'Vegetarian',
        drink: 'No',
        smoke: 'No',
        spirituality: 'Spiritual but Independent',
        community: 'Humanist'
    });

    const handleSave = () => {
        setIsEditing(false);
        // Simulated API call notification could go here
    };

    const EditableField = ({ label, value, name, type = "text", options = [] }: any) => (
        <div className="flex flex-col gap-3 group">
            <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-[0.4em] mb-1">{label}</span>
            {isEditing ? (
                type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
                        className="bg-white/40 border border-[#E8E4D5] rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 ring-[#c6862e]/30 transition-all font-bold text-gray-800"
                    >
                        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
                        className="bg-white/40 border border-[#E8E4D5] rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 ring-[#c6862e]/30 transition-all font-bold text-gray-800"
                    />
                )
            ) : (
                <div className="text-xl font-bold text-gray-800 group-hover:text-[#c6862e] transition-colors">{value}</div>
            )}
            <div className={`h-[1px] bg-[#E8E4D5] w-20 transition-all group-hover:w-full ${isEditing ? 'hidden' : 'block'}`} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF2] text-[#1A1A1A] font-sans selection:bg-[#c6862e]/20 relative overflow-hidden pb-40">
            {/* Cinematic Background Accents */}
            <div className="fixed top-0 right-0 w-[60%] h-[60%] bg-gradient-to-br from-[#c6862e]/5 to-transparent rounded-full blur-[180px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[60%] h-[60%] bg-gradient-to-tl from-blue-100/10 to-transparent rounded-full blur-[180px] pointer-events-none -z-10" />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 h-24 px-12 z-50 flex items-center justify-between bg-white/40 backdrop-blur-2xl border-b border-[#E8E4D5]/30">
                <button 
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 hover:text-[#c6862e] transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Sanctuary
                </button>
                <div className="flex items-center gap-6">
                    {isEditing ? (
                        <button 
                            onClick={handleSave}
                            className="bg-[#1A1A1A] text-white px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 hover:bg-[#c6862e] shadow-2xl transition-all active:scale-95"
                        >
                            <Save size={18} /> Seal Profile
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-white border border-[#E8E4D5] text-[#1A1A1A] px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 hover:shadow-xl transition-all"
                        >
                            <Sparkles size={18} className="text-[#c6862e]" /> Refine Spirit
                        </button>
                    )}
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto pt-44 px-8 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-20">
                {/* Left: Interactive Portrait & Basic Shield */}
                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white p-2">
                            <img src={profile.image} className="w-full h-full object-cover rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000 scale-105" alt="Profile" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            {isEditing && (
                                <button className="absolute inset-0 m-auto w-24 h-24 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border-2 border-white/50 hover:scale-110 transition-transform shadow-2xl">
                                    <Camera size={40} />
                                </button>
                            )}
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 w-fit mb-3">
                                    <ShieldCheck size={16} className="text-[#c6862e]" /> <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Spirit</span>
                                </div>
                                <h1 className="text-5xl font-serif tracking-tight leading-none mb-2">{profile.name}</h1>
                                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60 mb-8">{profile.location}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-[#E8E4D5] space-y-10 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FDFBF2] rounded-2xl flex items-center justify-center text-[#c6862e] shadow-inner border border-white">
                                <Zap size={22} fill="currentColor" className="opacity-20" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Spiritual Signature</h3>
                        </div>
                        <div className="space-y-6">
                            <EditableField label="Faith Harmony" value={profile.spirituality} name="spirituality" />
                            <EditableField label="Lineage Origin" value={profile.community} name="community" />
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Journey & Lifestyle */}
                <div className="space-y-20">
                    {/* Bio Section */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-[120px] h-px bg-[#c6862e]" />
                            <h2 className="text-[11px] font-black text-[#c6862e] uppercase tracking-[0.6em]">The Resonance Inner Essence</h2>
                        </div>
                        <div className="bg-white p-14 rounded-[4rem] shadow-sm border border-[#E8E4D5] relative overflow-hidden group">
                           <div className="absolute -top-10 -right-10 text-gray-50 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0"><User size={200} /></div>
                           {isEditing ? (
                               <textarea 
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    className="w-full h-40 bg-white/40 border border-[#E8E4D5] rounded-3xl p-8 text-xl font-serif text-gray-800 leading-relaxed outline-none focus:ring-2 ring-[#c6862e]/30 transition-all font-bold"
                               />
                           ) : (
                               <p className="text-3xl font-serif text-gray-800 leading-relaxed italic opacity-80 pr-10 border-l-4 border-[#c6862e]/20 pl-10 relative z-10">
                                    "{profile.bio}"
                               </p>
                           )}
                        </div>
                    </section>

                    {/* Vocation & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="bg-white/40 p-12 rounded-[3.5rem] border border-white shadow-sm flex flex-col gap-8 hover:bg-white transition-all">
                            <EditableField label="Aspirational Vocation" value={profile.profession} name="profession" />
                            <EditableField label="Intellectual Aura" value={profile.education} name="education" />
                         </div>
                         <div className="bg-white/40 p-12 rounded-[3.5rem] border border-white shadow-sm flex flex-col gap-8 hover:bg-white transition-all">
                            <EditableField label="Current Sanctuary" value={profile.location} name="location" />
                            <EditableField label="Earthly Day of Resonance" value={profile.dob} name="dob" />
                         </div>
                    </div>

                    {/* Lifestyle Mandala */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[11px] font-black text-[#c6862e] uppercase tracking-[0.6em]">Lifestyle Resonance</h2>
                            <div className="flex-1 h-px bg-[#E8E4D5]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Dietary Path', value: profile.diet, name: 'diet', icon: <Utensils size={20} />, options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggitarian'] },
                                { label: 'Social Nectar', value: profile.drink, name: 'drink', icon: <Coffee size={20} />, options: ['No', 'Socially', 'Regular'] },
                                { label: 'Physical Breath', value: profile.smoke, name: 'smoke', icon: <Wind size={20} />, options: ['No', 'Socially', 'Regular'] },
                            ].map((item) => (
                                <div key={item.label} className="bg-white p-8 rounded-[3rem] border border-[#E8E4D5] shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                                     <div className="text-[#c6862e] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                     <EditableField 
                                        label={item.label} 
                                        value={item.value} 
                                        name={item.name} 
                                        type="select" 
                                        options={item.options} 
                                     />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
