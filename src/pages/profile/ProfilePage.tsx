import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, MapPin, ShieldCheck, 
    ArrowLeft, Sparkles, User, Zap, Utensils, Wind, Coffee
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { profile, completeness } = useProfile();

    const InfoField = ({ label, value }: { label: string, value: string | number }) => (
        <div className="flex flex-col gap-3 group">
            <span className="text-[10px] font-black uppercase text-[#c6862e] tracking-[0.4em] mb-1">{label}</span>
            <div className="text-xl font-bold text-gray-800 group-hover:text-[#c6862e] transition-colors">
                {value || <span className="text-gray-300 italic">Not set</span>}
            </div>
            <div className="h-[1px] bg-[#E8E4D5] w-20 transition-all group-hover:w-full" />
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
                    <div className="flex flex-col items-end gap-1 mr-4">
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#c6862e]">Completeness</span>
                        <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#c6862e]" style={{ width: `${completeness}%` }} />
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/profile/complete')}
                        className="bg-white border border-[#E8E4D5] text-[#1A1A1A] px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 hover:shadow-xl transition-all"
                    >
                        <Sparkles size={18} className="text-[#c6862e]" /> Refine Spirit
                    </button>
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto pt-44 px-8 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-20">
                {/* Left Portrait */}
                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white p-2 bg-white">
                            {profile.image ? (
                                <img src={profile.image} className="w-full h-full object-cover rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000 scale-105" alt="Profile" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-[3.5rem]">
                                    <User size={80} className="text-gray-200" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 w-fit mb-3">
                                    <ShieldCheck size={16} className="text-[#c6862e]" /> <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Spirit</span>
                                </div>
                                <h1 className="text-5xl font-serif tracking-tight leading-none mb-2">{profile.name || 'Anonymous'}</h1>
                                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60 mb-8">{profile.city}, {profile.country}</p>
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
                            <InfoField label="Religion" value={profile.religion} />
                            <InfoField label="Caste / Community" value={profile.community} />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="space-y-20">
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-[120px] h-px bg-[#c6862e]" />
                            <h2 className="text-[11px] font-black text-[#c6862e] uppercase tracking-[0.6em]">The Resonance Inner Essence</h2>
                        </div>
                        <div className="bg-white p-14 rounded-[4rem] shadow-sm border border-[#E8E4D5] relative overflow-hidden group">
                           <p className="text-3xl font-serif text-gray-800 leading-relaxed italic opacity-80 pr-10 border-l-4 border-[#c6862e]/20 pl-10 relative z-10">
                                "{profile.bio || 'Your story unfolds here...'}"
                           </p>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="bg-white/40 p-12 rounded-[3.5rem] border border-white shadow-sm flex flex-col gap-8 hover:bg-white transition-all">
                            <InfoField label="Aspirational Vocation" value={profile.profession} />
                            <InfoField label="Intellectual Aura" value={profile.education} />
                         </div>
                         <div className="bg-white/40 p-12 rounded-[3.5rem] border border-white shadow-sm flex flex-col gap-8 hover:bg-white transition-all">
                            <InfoField label="Current Sanctuary" value={profile.city} />
                            <InfoField label="Mother Tongue" value={profile.motherTongue} />
                         </div>
                    </div>

                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[11px] font-black text-[#c6862e] uppercase tracking-[0.6em]">Lifestyle Resonance</h2>
                            <div className="flex-1 h-px bg-[#E8E4D5]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Dietary Path', value: profile.diet, icon: <Utensils size={20} /> },
                                { label: 'Social Nectar', value: profile.drink, icon: <Coffee size={20} /> },
                                { label: 'Physical Breath', value: profile.smoke, icon: <Wind size={20} /> },
                            ].map((item) => (
                                <div key={item.label} className="bg-white p-8 rounded-[3rem] border border-[#E8E4D5] shadow-sm hover:shadow-xl transition-all group">
                                     <div className="text-[#c6862e] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                     <InfoField label={item.label} value={item.value} />
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
