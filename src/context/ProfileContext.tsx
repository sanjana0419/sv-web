import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';

export interface FamilyDetails {
    fatherOccupation: string;
    motherOccupation: string;
    siblings: number;
    familyType: 'Joint' | 'Nuclear' | '';
    familyStatus: string;
}

export interface PartnerPreferences {
    ageRange: [number, number];
    heightRange: string;
    religion: string;
    education: string;
    location: string;
}

export interface UserProfile {
    id: string;
    name: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    image: string;
    bio: string;
    profession: string;
    companyName: string;
    location: string;
    city: string;
    state: string;
    country: string;
    hometown: string;
    education: string;
    college: string;
    dob: string;
    mobile: string;
    diet: 'Veg' | 'Non-Veg' | 'Vegan' | '';
    drink: 'Yes' | 'No' | 'Socially' | '';
    smoke: 'Yes' | 'No' | 'Socially' | '';
    spirituality: string;
    community: string;
    height: string;
    weight: string;
    age: number;
    complexion: string;
    maritalStatus: string;
    religion: string;
    motherTongue: string;
    income: string;
    hobbies: string[];
    languagesKnown: string[];
    hasHoroscope: boolean;
    familyDetails: FamilyDetails;
    partnerPreferences: PartnerPreferences;
}

interface ProfileContextType {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    updateFamilyDetails: (updates: Partial<FamilyDetails>) => void;
    updatePartnerPreferences: (updates: Partial<PartnerPreferences>) => void;
    completeness: number;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const initialProfile: UserProfile = {
    id: 'user_1',
    name: '',
    gender: '',
    image: '',
    bio: '',
    profession: '',
    companyName: '',
    location: '',
    city: '',
    state: '',
    country: '',
    hometown: '',
    education: '',
    college: '',
    dob: '',
    mobile: '',
    diet: '',
    drink: '',
    smoke: '',
    spirituality: '',
    community: '',
    height: '',
    weight: '',
    age: 0,
    complexion: '',
    maritalStatus: '',
    religion: '',
    motherTongue: '',
    income: '',
    hobbies: [],
    languagesKnown: [],
    hasHoroscope: false,
    familyDetails: {
        fatherOccupation: '',
        motherOccupation: '',
        siblings: 0,
        familyType: '',
        familyStatus: ''
    },
    partnerPreferences: {
        ageRange: [21, 35],
        heightRange: "5'0\" - 6'5\"",
        religion: '',
        education: '',
        location: ''
    }
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile>(() => {
        const saved = localStorage.getItem('user_profile_v2');
        return saved ? JSON.parse(saved) : initialProfile;
    });
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        localStorage.setItem('user_profile_v2', JSON.stringify(profile));
    }, [profile]);

    const completeness = useMemo(() => {
        let filledCount = 0;
        // The form has 23 distinct input fields
        const totalImportantFields = 23;

        // Basic Profile
        if (profile.name) filledCount++;
        if (profile.age && profile.age >= 18) filledCount++;
        if (profile.height) filledCount++;
        if (profile.weight) filledCount++;
        if (profile.complexion) filledCount++;
        if (profile.maritalStatus) filledCount++;
        if (profile.motherTongue) filledCount++;
        if (profile.religion) filledCount++;
        if (profile.city) filledCount++;
        
        // Education & Profession
        if (profile.profession) filledCount++;
        if (profile.companyName) filledCount++;
        if (profile.education) filledCount++;
        if (profile.income) filledCount++;
        
        // Family
        if (profile.familyDetails.fatherOccupation) filledCount++;
        if (profile.familyDetails.motherOccupation) filledCount++;
        if (profile.familyDetails.siblings > 0) filledCount++;
        if (profile.familyDetails.familyType) filledCount++;
        
        // Others
        if (profile.bio && profile.bio.trim().length > 0) filledCount++;
        if (profile.hobbies && profile.hobbies.length > 0) filledCount++;
        
        // Partner Pref
        if (profile.partnerPreferences.ageRange) filledCount++;
        if (profile.partnerPreferences.heightRange) filledCount++;
        if (profile.partnerPreferences.education) filledCount++;
        if (profile.partnerPreferences.location) filledCount++;

        return Math.min(100, Math.round((filledCount / totalImportantFields) * 100));
    }, [profile]);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const updateFamilyDetails = (updates: Partial<FamilyDetails>) => {
        setProfile(prev => ({
            ...prev,
            familyDetails: { ...prev.familyDetails, ...updates }
        }));
    };

    const updatePartnerPreferences = (updates: Partial<PartnerPreferences>) => {
        setProfile(prev => ({
            ...prev,
            partnerPreferences: { ...prev.partnerPreferences, ...updates }
        }));
    };

    return (
        <ProfileContext.Provider value={{ 
            profile, 
            updateProfile, 
            updateFamilyDetails, 
            updatePartnerPreferences, 
            completeness, 
            currentStep, 
            setCurrentStep 
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error('useProfile must be used within a ProfileProvider');
    return context;
};
