import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Save } from 'lucide-react';
import { useProfile } from '../../../context/ProfileContext';
import brideImg from '../../../assets/bride.png';
import groomImg from '../../../assets/groom.png';
import './ProfileCompletionForm.css';

// Reusable Input component defined outside to prevent focus loss issues on re-render
const TextInput = ({ label, name, value, onChange, placeholder, type = "text", isSelect = false, options = [], min }: any) => (
    <div className="input-field-container">
        <label>{label}</label>
        {isSelect ? (
            <select
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            >
                <option value="">Select</option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                min={min}
                onChange={(e) => onChange(name, e.target.value)}
            />
        )}
    </div>
);

const ProfileCompletionForm: React.FC = () => {
    const navigate = useNavigate();
    const {
        profile,
        updateProfile,
        updateFamilyDetails,
        updatePartnerPreferences,
        completeness: completionPercent
    } = useProfile();

    // Local state to track form data
    const [formData, setFormData] = useState({
        // Personal Details
        // Personal Details
        name: profile.name || '',
        age: profile.age && profile.age > 0 ? profile.age.toString() : '',
        height: profile.height || '',
        weight: profile.weight || '',
        complexion: profile.complexion || '',
        maritalStatus: profile.maritalStatus || '',
        motherTongue: profile.motherTongue || '',
        religion: profile.religion || '',
        city: profile.city || '',

        // Career & Education
        profession: profile.profession || '',
        company: profile.companyName || '',
        education: profile.education || '',
        income: profile.income || '',

        // Family Details
        fatherOccupation: profile.familyDetails.fatherOccupation || '',
        motherOccupation: profile.familyDetails.motherOccupation || '',
        siblings: profile.familyDetails.siblings && profile.familyDetails.siblings > 0 ? profile.familyDetails.siblings.toString() : '',
        familyType: profile.familyDetails.familyType || '',

        // About & Hobbies
        aboutMe: profile.bio || '',
        hobbies: profile.hobbies.length > 0 ? profile.hobbies.join(', ') : '',

        // Partner Preferences
        prefAge: '',
        prefHeight: '',
        prefEducation: '',
        prefLocation: ''
    });

    const TOTAL_FIELDS = 23;
    const filledFields = useMemo(() => {
        let count = 0;
        if (formData.name) count++;
        if (formData.age && parseInt(formData.age) >= 18) count++;
        if (formData.height) count++;
        if (formData.weight) count++;
        if (formData.complexion) count++;
        if (formData.maritalStatus) count++;
        if (formData.motherTongue) count++;
        if (formData.religion) count++;
        if (formData.city) count++;
        if (formData.profession) count++;
        if (formData.company) count++;
        if (formData.education) count++;
        if (formData.income) count++;
        if (formData.fatherOccupation) count++;
        if (formData.motherOccupation) count++;
        if (formData.siblings && parseInt(formData.siblings) > 0) count++;
        if (formData.familyType) count++;
        if (formData.aboutMe && formData.aboutMe.trim()) count++;
        if (formData.hobbies && formData.hobbies.trim()) count++;
        if (formData.prefAge) count++;
        if (formData.prefHeight) count++;
        if (formData.prefEducation) count++;
        if (formData.prefLocation) count++;
        return count;
    }, [formData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Sync with context
        if (['fatherOccupation', 'motherOccupation', 'siblings', 'familyType'].includes(field)) {
            updateFamilyDetails({ [field]: field === 'siblings' ? parseInt(value) || 0 : value });
        } else if (field.startsWith('pref')) {
            // Correctly map form fields to nested partnerPreferences
            const prefKey = field === 'prefAge' ? 'ageRange' :
                field === 'prefHeight' ? 'heightRange' :
                    field === 'prefEducation' ? 'education' : 'location';
            updatePartnerPreferences({ [prefKey]: value });
        } else if (field === 'name') {
            updateProfile({ name: value });
        } else if (field === 'age') {
            const ageVal = parseInt(value);
            // Allow typing (empty or starting digits), but only update context if it's a valid age >= 18
            if (!value || (ageVal >= 18)) {
                updateProfile({ age: ageVal || 0 });
            }
        } else if (field === 'company') {
            updateProfile({ companyName: value });
        } else if (field === 'aboutMe') {
            updateProfile({ bio: value });
        } else if (field === 'hobbies') {
            updateProfile({ hobbies: value.split(',').map(h => h.trim()).filter(h => h !== '') });
        } else {
            // General profile update for other fields
            updateProfile({ [field]: value });
        }
    };

    return (
        <div className="profile-completion-wrapper">
            <div className="form-container">
                {/* Header Section */}
                <header className="profile-header">
                    <div className="header-left">
                        <div className="profile-img-container">
                            <img src={profile.image || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200"} alt="Profile" />
                        </div>
                        <div className="header-text">
                            <h1>{formData.name || 'Complete Your Profile'}</h1>
                            <p>Fill in your details below</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="circular-progress">
                            <svg className="progress-ring" width="80" height="80">
                                <circle
                                    className="progress-ring-circle-bg"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="4"
                                    fill="transparent"
                                    r="34"
                                    cx="40"
                                    cy="40"
                                />
                                <circle
                                    className="progress-ring-circle-main"
                                    stroke="var(--gold-accent)"
                                    strokeWidth="4"
                                    strokeDasharray={`${2 * Math.PI * 34}`}
                                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionPercent / 100)}`}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="34"
                                    cx="40"
                                    cy="40"
                                />
                            </svg>
                            <div className="progress-value">{completionPercent}%</div>
                        </div>
                        <span className="progress-label">Complete</span>
                    </div>
                </header>

                <div className="form-grid">
                    {/* Personal Details */}
                    <section className="form-card">
                        <h2 className="card-title">Personal Details</h2>
                        <div className="input-group-grid">
                            <TextInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" />
                            <TextInput label="Age" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 26" type="number" min="18" />
                            <TextInput label="Height" name="height" value={formData.height} onChange={handleChange} isSelect options={["4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\""]} />
                            <TextInput label="Weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 72 Kg" />
                            <TextInput label="Complexion" name="complexion" value={formData.complexion} onChange={handleChange} isSelect options={['Fair', 'Very Fair', 'Wheatish', 'Medium', 'Dark']} />
                            <TextInput label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} isSelect options={['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce']} />
                            <TextInput label="Mother Tongue" name="motherTongue" value={formData.motherTongue} onChange={handleChange} isSelect options={['Hindi', 'English', 'Marathi', 'Gujarati', 'Bengali', 'Punjabi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam']} />
                            <TextInput label="Religion" name="religion" value={formData.religion} onChange={handleChange} isSelect options={['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other']} />
                            <div className="full-width">
                                <TextInput label="City" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" />
                            </div>
                        </div>
                    </section>

                    {/* Career & Education */}
                    <section className="form-card">
                        <h2 className="card-title">Career & Education</h2>
                        <div className="input-group-grid">
                            <TextInput label="Profession" name="profession" value={formData.profession} onChange={handleChange} placeholder="e.g. Software Engineer" />
                            <TextInput label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Google" />
                            <TextInput label="Education" name="education" value={formData.education} onChange={handleChange} isSelect options={['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'B.Com', 'M.Com', 'BBA', 'MBA', 'MBBS', 'MD', 'PhD', 'Other']} />
                            <TextInput label="Annual Income" name="income" value={formData.income} onChange={handleChange} isSelect options={['Under ₹5 LPA', '₹5-10 LPA', '₹10-15 LPA', '₹15-25 LPA', '₹25-50 LPA', '₹50 LPA+']} />
                        </div>
                    </section>

                    {/* Family Details */}
                    <section className="form-card">
                        <h2 className="card-title">Family Details</h2>
                        <div className="input-group-grid">
                            <TextInput label="Father's Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} placeholder="e.g. Business Owner" />
                            <TextInput label="Mother's Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} placeholder="e.g. Homemaker" />
                            <TextInput label="Siblings" name="siblings" value={formData.siblings} onChange={handleChange} isSelect options={['0', '1', '2', '3', '4+']} />
                            <TextInput label="Family Type" name="familyType" value={formData.familyType} onChange={handleChange} isSelect options={['Joint', 'Nuclear']} />
                        </div>
                    </section>

                    {/* About Me */}
                    <section className="form-card">
                        <div className="about-me-header">
                            <h3>About Me</h3>
                            <span className="char-count">{formData.aboutMe.length}/180</span>
                        </div>
                        <div className="input-field-container">
                            <textarea
                                placeholder="Write a brief introduction about yourself..."
                                maxLength={180}
                                value={formData.aboutMe}
                                onChange={(e) => handleChange('aboutMe', e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Hobbies & Interests */}
                    <section className="form-card full-width">
                        <h2 className="card-title">Hobbies & Interests</h2>
                        <TextInput label="" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="e.g. Photography, Traveling, Reading, Music..." />
                    </section>

                    {/* Partner Preferences */}
                    <section className="form-card full-width">
                        <h2 className="card-title">Partner Preferences</h2>
                        <div className="input-group-grid">
                            <TextInput label="Preferred Age Range" name="prefAge" value={formData.prefAge} onChange={handleChange} placeholder="e.g. 22-28 Years" />
                            <TextInput label="Preferred Height" name="prefHeight" value={formData.prefHeight} onChange={handleChange} placeholder={"e.g. 5'2\" - 5'7\""} />
                            <TextInput label="Preferred Education" name="prefEducation" value={formData.prefEducation} onChange={handleChange} placeholder="e.g. Graduate & above" />
                            <TextInput label="Preferred Location" name="prefLocation" value={formData.prefLocation} onChange={handleChange} placeholder="e.g. Metro Cities" />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="form-footer">
                    <button className="save-btn" onClick={() => navigate('/home')}>
                        <Check size={20} /> Save & Go Home
                    </button>
                    <div className="footer-stats">
                        {completionPercent}% complete — {filledFields} of {TOTAL_FIELDS} fields filled
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ProfileCompletionForm;
