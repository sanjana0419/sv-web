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
    heightRange: [string, string];
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
        heightRange: ["5'0\"", "6'5\""],
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
        const coreFields: (keyof UserProfile)[] = [
            'name', 'gender', 'dob', 'mobile', 'image',
            'maritalStatus', 'religion', 'community', 'motherTongue', 'height',
            'education', 'profession', 'income',
            'country', 'city',
            'diet', 'drink', 'smoke'
        ];
        
        let filledCount = 0;
        coreFields.forEach(field => {
            const val = profile[field];
            if (val && val.toString().trim() !== '') {
                filledCount++;
            }
        });

        // Family
        const familyFields: (keyof FamilyDetails)[] = ['fatherOccupation', 'motherOccupation', 'familyType', 'familyStatus'];
        familyFields.forEach(field => {
            if (profile.familyDetails[field] && profile.familyDetails[field].toString().trim() !== '') {
                filledCount++;
            }
        });

        // Hobbies
        if (profile.hobbies.length > 0) filledCount++;
        
        const totalImportantFields = coreFields.length + familyFields.length + 1;
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
