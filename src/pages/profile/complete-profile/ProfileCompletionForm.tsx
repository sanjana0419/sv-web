import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Phone, Calendar, Heart, GraduationCap, 
    Briefcase, MapPin, Users, Utensils, Sparkles, 
    Camera, Check, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { useProfile } from '../../../context/ProfileContext';
import ProfileCompletion from '../../home/components/ProfileCompletion';
import '../../home/components/ProfileCompletion.css';

const steps = [
    { title: 'Basic', icon: <User size={18} /> },
    { title: 'Personal', icon: <Heart size={18} /> },
    { title: 'Career', icon: <GraduationCap size={18} /> },
    { title: 'Location', icon: <MapPin size={18} /> },
    { title: 'Family', icon: <Users size={18} /> },
    { title: 'Lifestyle', icon: <Utensils size={18} /> },
    { title: 'Partner', icon: <Sparkles size={18} /> },
    { title: 'Destiny', icon: <Check size={18} /> }
];

const HaldiKumkumProfileForm: React.FC = () => {
    const { 
        profile, 
        updateProfile, 
        updateFamilyDetails, 
        updatePartnerPreferences, 
        completeness, 
        currentStep, 
        setCurrentStep 
    } = useProfile();

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const Input = ({ label, name, type = "text", value, onChange, placeholder, options = [], isSelect = false }: any) => (
        <div className="relative group mb-6">
            <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-2 px-1">
                {label}
            </label>
            {isSelect ? (
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full bg-[#FFFFF0] border-2 border-[#D4AF37]/20 rounded-2xl py-4 px-6 text-sm font-bold text-gray-800 outline-none focus:border-[#D4AF37]/60 focus:ring-4 ring-[#D4AF37]/10 transition-all appearance-none cursor-pointer"
                >
                    <option value="">Select {label}</option>
                    {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-[#FFFFF0] border-2 border-[#D4AF37]/20 rounded-2xl py-4 px-6 text-sm font-bold text-gray-800 outline-none focus:border-[#D4AF37]/60 focus:ring-4 ring-[#D4AF37]/10 transition-all placeholder:text-gray-400"
                />
            )}
            <div className="absolute right-6 top-[42px] pointer-events-none opacity-20 group-focus-within:opacity-40 transition-opacity">
                {isSelect && <ArrowRight size={16} className="rotate-90" />}
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Basic Details
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="md:col-span-2 flex flex-col items-center mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37]/20 p-1 relative overflow-hidden bg-white shadow-xl transition-transform group-hover:scale-105">
                                    {profile.image ? (
                                        <img src={profile.image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#FFFFF0] text-[#D4AF37]">
                                            <Camera size={40} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-[#801B1B] text-white p-2 rounded-full shadow-lg border-2 border-white">
                                    <Sparkles size={14} />
                                </div>
                            </div>
                            <span className="mt-4 text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">Aura Snapshot</span>
                        </div>
                        <Input label="Full Name" value={profile.name} onChange={(e: any) => updateProfile({ name: e.target.value })} placeholder="Enter your full name" />
                        <div className="mb-6">
                            <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-4 px-1">Gender</label>
                            <div className="flex gap-4">
                                {['Male', 'Female', 'Other'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => updateProfile({ gender: opt as any })}
                                        className={`flex-1 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${profile.gender === opt ? 'bg-[#801B1B] border-[#801B1B] text-white shadow-lg' : 'bg-white border-[#D4AF37]/20 text-gray-500 hover:border-[#D4AF37]/40'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Input label="Date of Birth" type="date" value={profile.dob} onChange={(e: any) => updateProfile({ dob: e.target.value })} />
                        <Input label="Mobile Number" value={profile.mobile} onChange={(e: any) => updateProfile({ mobile: e.target.value })} placeholder="+91 00000 00000" />
                    </div>
                );
            case 1: // Personal Information
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Input label="Marital Status" isSelect options={['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce']} value={profile.maritalStatus} onChange={(e: any) => updateProfile({ maritalStatus: e.target.value })} />
                        <Input label="Height" isSelect options={["5'0\"", "5'2\"", "5'4\"", "5'6\"", "5'8\"", "5'10\"", "6'0\"", "6'2\"", "6'4\""]} value={profile.height} onChange={(e: any) => updateProfile({ height: e.target.value })} />
                        <Input label="Religion" isSelect options={['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain', 'Buddhist', 'Spiritual']} value={profile.religion} onChange={(e: any) => updateProfile({ religion: e.target.value })} />
                        <Input label="Community / Caste" value={profile.community} onChange={(e: any) => updateProfile({ community: e.target.value })} placeholder="Enter your community" />
                        <Input label="Mother Tongue" isSelect options={['Hindi', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Tamil', 'Telugu', 'English']} value={profile.motherTongue} onChange={(e: any) => updateProfile({ motherTongue: e.target.value })} />
                        <div className="flex items-center gap-4 mt-8 px-2">
                             <div 
                                onClick={() => updateProfile({ hasHoroscope: !profile.hasHoroscope })}
                                className={`w-14 h-8 rounded-full transition-all cursor-pointer relative p-1 ${profile.hasHoroscope ? 'bg-[#801B1B]' : 'bg-gray-200'}`}
                             >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all transform ${profile.hasHoroscope ? 'translate-x-6' : 'translate-x-0'}`} />
                             </div>
                             <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-800">Generate Horoscope</h4>
                                <p className="text-[10px] text-gray-400 font-bold">Recommended for better matches</p>
                             </div>
                        </div>
                    </div>
                );
            case 2: // Education & Career
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Input label="Highest Qualification" isSelect options={['Bachelors', 'Masters', 'Doctorate', 'Diploma', 'Other']} value={profile.education} onChange={(e: any) => updateProfile({ education: e.target.value })} />
                        <Input label="College / University" value={profile.college} onChange={(e: any) => updateProfile({ college: e.target.value })} placeholder="University Name" />
                        <Input label="Occupation" value={profile.profession} onChange={(e: any) => updateProfile({ profession: e.target.value })} placeholder="Software Engineer, Doctor, etc." />
                        <Input label="Company Name" value={profile.companyName} onChange={(e: any) => updateProfile({ companyName: e.target.value })} placeholder="Where do you work?" />
                        <Input label="Annual Income" isSelect options={['Below 5 LPA', '5-10 LPA', '10-20 LPA', '20-50 LPA', '50 LPA+']} value={profile.income} onChange={(e: any) => updateProfile({ income: e.target.value })} />
                    </div>
                );
            case 3: // Location Details
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Input label="Country" isSelect options={['India', 'USA', 'UK', 'Canada', 'Australia', 'UAE']} value={profile.country} onChange={(e: any) => updateProfile({ country: e.target.value })} />
                        <Input label="State" value={profile.state} onChange={(e: any) => updateProfile({ state: e.target.value })} placeholder="Enter state" />
                        <Input label="City" value={profile.city} onChange={(e: any) => updateProfile({ city: e.target.value })} placeholder="Enter city" />
                        <Input label="Hometown" value={profile.hometown} onChange={(e: any) => updateProfile({ hometown: e.target.value })} placeholder="Where are you originally from?" />
                    </div>
                );
            case 4: // Family Details
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Input label="Father's Occupation" value={profile.familyDetails.fatherOccupation} onChange={(e: any) => updateFamilyDetails({ fatherOccupation: e.target.value })} placeholder="e.g. Businessman" />
                        <Input label="Mother's Occupation" value={profile.familyDetails.motherOccupation} onChange={(e: any) => updateFamilyDetails({ motherOccupation: e.target.value })} placeholder="e.g. Homemaker" />
                        <Input label="Number of Siblings" type="number" value={profile.familyDetails.siblings} onChange={(e: any) => updateFamilyDetails({ siblings: parseInt(e.target.value) })} />
                        <div className="mb-6">
                            <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-4 px-1">Family Type</label>
                            <div className="flex gap-4">
                                {['Joint', 'Nuclear'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => updateFamilyDetails({ familyType: opt as any })}
                                        className={`flex-1 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${profile.familyDetails.familyType === opt ? 'bg-[#801B1B] border-[#801B1B] text-white shadow-lg' : 'bg-white border-[#D4AF37]/20 text-gray-500 hover:border-[#D4AF37]/40'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Input label="Family Status" isSelect options={['Middle Class', 'Upper Middle Class', 'Rich/Affluent']} value={profile.familyDetails.familyStatus} onChange={(e: any) => updateFamilyDetails({ familyStatus: e.target.value })} />
                    </div>
                );
            case 5: // Lifestyle
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-4 px-1">Dietary Path</label>
                                <div className="flex gap-4">
                                    {['Veg', 'Non-Veg', 'Vegan'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => updateProfile({ diet: opt as any })}
                                            className={`flex-1 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${profile.diet === opt ? 'bg-[#D4AF37] border-[#D4AF37] text-white shadow-lg' : 'bg-white border-[#D4AF37]/20 text-gray-500 hover:border-[#D4AF37]/40'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-4 px-1">Drinking</label>
                                    <div className="flex flex-col gap-2">
                                        {['No', 'Socially', 'Yes'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => updateProfile({ drink: opt as any })}
                                                className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${profile.drink === opt ? 'bg-[#801B1B] border-[#801B1B] text-white' : 'bg-white border-[#D4AF37]/20 text-gray-400'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase text-[#801B1B]/60 tracking-[0.2em] mb-4 px-1">Smoking</label>
                                    <div className="flex flex-col gap-2">
                                        {['No', 'Socially', 'Yes'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => updateProfile({ smoke: opt as any })}
                                                className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${profile.smoke === opt ? 'bg-[#801B1B] border-[#801B1B] text-white' : 'bg-white border-[#D4AF37]/20 text-gray-400'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6: // Partner Preferences
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="md:col-span-2 mb-10 bg-[#FFFFF0] p-6 rounded-[2.5rem] border border-[#D4AF37]/10">
                            <h4 className="text-sm font-black text-[#801B1B] uppercase tracking-widest mb-6 px-1 flex items-center gap-3">
                                <Sparkles size={16} /> Partner Resonance
                            </h4>
                            <div className="space-y-8 px-2">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Age Range</span>
                                        <span className="text-[#801B1B]">{profile.partnerPreferences.ageRange[0]} - {profile.partnerPreferences.ageRange[1]} years</span>
                                    </div>
                                    <div className="h-2 bg-[#D4AF37]/10 rounded-full relative">
                                        <div className="absolute inset-y-0 left-[10%] right-[30%] bg-[#801B1B] rounded-full" />
                                        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#801B1B] rounded-full shadow-lg cursor-pointer" />
                                        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#801B1B] rounded-full shadow-lg cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Input label="Preferred Religion" isSelect options={['Hindu', 'Muslim', 'Sikh', 'Christian', 'All']} value={profile.partnerPreferences.religion} onChange={(e: any) => updatePartnerPreferences({ religion: e.target.value })} />
                        <Input label="Preferred Education" isSelect options={['Bachelors', 'Masters', 'Any']} value={profile.partnerPreferences.education} onChange={(e: any) => updatePartnerPreferences({ education: e.target.value })} />
                    </div>
                );
            case 7: // Destiny / Final
                return (
                    <div className="flex justify-center py-8">
                        <div className="w-full max-w-sm transform scale-110">
                            <ProfileCompletion />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF2] selection:bg-[#D4AF37]/20 py-12 px-6">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/mandala-ornament.png')]" />
            
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-2">Refining Your Spirit</h1>
                        <p className="text-sm font-medium text-gray-500 tracking-wide">Complete your sanctuary profile to find your destined counterpart.</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Soul Completion</span>
                            <span className="text-2xl font-serif text-[#801B1B]">{completeness}%</span>
                        </div>
                        <div className="w-48 h-1.5 bg-white rounded-full overflow-hidden shadow-sm border border-[#D4AF37]/10">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${completeness}%` }}
                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#801B1B]"
                            />
                        </div>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="bg-white/80 backdrop-blur-xl border border-[#D4AF37]/10 rounded-full py-4 px-8 flex justify-between items-center mb-12 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.2)]">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            onClick={() => setCurrentStep(index)}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep === index ? 'bg-[#801B1B] text-white scale-110 shadow-lg' : index < currentStep ? 'bg-[#D4AF37] text-white' : 'bg-[#FFFFF0] text-gray-300'}`}>
                                {index < currentStep ? <Check size={16} /> : step.icon}
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest hidden md:block ${currentStep === index ? 'text-[#801B1B]' : 'text-gray-300'}`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-[#D4AF37]/10 overflow-hidden mb-24">
                    <div className="p-10 md:p-16">
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif text-gray-800 mb-2">{steps[currentStep].title} Details</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</p>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Nav */}
                    <div className="bg-[#FFFFF0]/80 backdrop-blur-md border-t border-[#D4AF37]/10 px-10 md:px-16 py-8 flex justify-between items-center">
                        <button 
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 0 ? 'opacity-0' : 'text-gray-400 hover:text-[#801B1B]'}`}
                        >
                            <ArrowLeft size={16} /> Retreat
                        </button>
                        <div className="flex gap-4">
                            {currentStep < steps.length - 1 && (
                                <button className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]/60 hover:text-[#D4AF37] transition-all">Skip</button>
                            )}
                            <button 
                                onClick={currentStep === steps.length - 1 ? () => window.location.href='/home' : handleNext}
                                className="bg-[#801B1B] text-white px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-[#a02020] shadow-xl hover:-translate-y-1 transition-all active:translate-y-0"
                            >
                                {currentStep === steps.length - 1 ? 'Enter Sanctuary Dashboard' : 'Next Resonance'}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HaldiKumkumProfileForm;
