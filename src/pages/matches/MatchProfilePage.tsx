import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        name: 'Rohan Malhotra',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
        matchPercentage: 88,
        age: 28,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Punjabi',
        location: 'Mumbai, MH',
        education: 'MBA Finance',
        profession: 'Investment Banker',
        about: 'I am a career-oriented individual who values family and traditions. Looking for a partner who is understanding, supportive, and shares similar values.',
        familyDetails: {
            fatherStatus: 'Business',
            motherStatus: 'Homemaker',
            siblings: '1 Sister (Married)'
        },
        lifestyle: {
            diet: 'Vegetarian',
            drink: 'Occasionally',
            smoke: 'No'
        }
    },
    {
        id: '2',
        name: 'Amit Patel',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        matchPercentage: 92,
        age: 30,
        height: '5\'9"',
        religion: 'Hindu',
        caste: 'Gujarati',
        location: 'Ahmedabad, GJ',
        education: 'Software Architect',
        profession: 'Software Architect at Tech Firm',
        about: 'Passionate about technology and travel. I believe in a balanced life and am looking for someone who enjoys both intellectual conversations and spontaneous adventures.',
        familyDetails: {
            fatherStatus: 'Retired',
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
        id: '3',
        name: 'Sahil Deshmukh',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
        matchPercentage: 75,
        age: 29,
        height: '5\'10"',
        religion: 'Hindu',
        caste: 'Maratha',
        location: 'Pune, MH',
        education: 'IAS Officer',
        profession: 'Civil Services',
        about: 'Dedicated to public service with a deep respect for our cultural roots. I seek a companion who is academically inclined and grounded.',
        familyDetails: {
            fatherStatus: 'Govt. Employee',
            motherStatus: 'Teacher',
            siblings: 'None'
        },
        lifestyle: {
            diet: 'Non-Vegetarian',
            drink: 'No',
            smoke: 'No'
        }
    },
    {
        id: '4',
        name: 'Vikram Singh',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop',
        matchPercentage: 82,
        age: 27,
        height: '6\'0"',
        religion: 'Hindu',
        caste: 'Rajput',
        location: 'Delhi, NCR',
        education: 'Commercial Pilot License',
        profession: 'Pilot',
        about: 'Love flying and exploring new places. I have a modern outlook but stay connected to my traditions. Looking for a partner who is adventurous and kind-hearted.',
        familyDetails: {
            fatherStatus: 'Armed Forces (Retd.)',
            motherStatus: 'Homemaker',
            siblings: '2 Sisters'
        },
        lifestyle: {
            diet: 'Non-Vegetarian',
            drink: 'Occasionally',
            smoke: 'No'
        }
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
        education: 'MBBS, MD',
        profession: 'Doctor',
        about: 'A dedicated medical professional who values empathy and compassion. I enjoy reading and quiet evenings. Searching for a soulmate who is understanding of a doctor\'s schedule.',
        familyDetails: {
            fatherStatus: 'Doctor',
            motherStatus: 'Doctor',
            siblings: '1 Brother (Doctor)'
        },
        lifestyle: {
            diet: 'Eggetarian',
            drink: 'No',
            smoke: 'No'
        }
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
        education: 'MS Data Science',
        profession: 'Data Scientist',
        about: 'Analytical by day, musician by night. I love playing the guitar and attending live concerts. Looking for someone with a good sense of humor and a positive vibe.',
        familyDetails: {
            fatherStatus: 'Engineer',
            motherStatus: 'Banker',
            siblings: '1 Sister'
        },
        lifestyle: {
            diet: 'Vegetarian',
            drink: 'Occasionally',
            smoke: 'No'
        }
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
        education: 'B.Tech',
        profession: 'Entrepreneur',
        about: 'Running my own startup in the EdTech space. I am ambitious and driven, looking for a partner to share life\'s ups and downs with equal enthusiasm.',
        familyDetails: {
            fatherStatus: 'Business',
            motherStatus: 'Homemaker',
            siblings: '1 Brother'
        },
        lifestyle: {
            diet: 'Non-Vegetarian',
            drink: 'Yes',
            smoke: 'No'
        }
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
        education: 'M.Tech Civil Engineering',
        profession: 'Civil Engineer',
        about: 'A simple guy with straightforward values. I enjoy spending time with family and close friends. Seeking a partner who appreciates the simple joys of life.',
        familyDetails: {
            fatherStatus: 'Govt. Contractor',
            motherStatus: 'Homemaker',
            siblings: '2 Sisters (Married)'
        },
        lifestyle: {
            diet: 'Non-Vegetarian',
            drink: 'Occasionally',
            smoke: 'No'
        }
    }
];

const MatchProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<MatchProfile | null>(null);

    useEffect(() => {
        // Find profile by ID, in a real app this would be an API call
        const foundProfile = mockMatches.find(p => p.id === id);
        if (foundProfile) {
            setProfile(foundProfile);
        }
    }, [id]);

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF2]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
                <button 
                    onClick={() => navigate('/matches')}
                    className="bg-[#8B0000] text-white px-6 py-2 rounded-full hover:bg-rose-900 transition-colors"
                >
                    Back to Matches
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans selection:bg-rose-100 selection:text-rose-600 pb-20">
            {/* Header / Nav */}
            <div className="bg-white shadow-sm border-b border-rose-100 sticky top-0 z-30">
                <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/matches')}
                        className="flex items-center text-rose-800 hover:text-rose-600 font-medium transition-colors group"
                    >
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Matches
                    </button>
                    <div className="font-serif text-xl font-bold text-rose-900">
                        Profile Details
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 mt-12">
                <div className="bg-white rounded-3xl shadow-lg border border-rose-50 overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* Left Side - Image & Quick Actions */}
                    <div className="w-full lg:w-[450px] relative shrink-0">
                        <div className="h-[500px] lg:h-full relative overflow-hidden">
                            <img 
                                src={profile.image} 
                                alt={profile.name} 
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay for bottom actions */}
                            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            {/* Match Badge */}
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-rose-900 font-bold px-4 py-2 rounded-full shadow-lg border border-rose-100 flex items-center gap-2">
                                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                {profile.matchPercentage}% Match
                            </div>

                            {/* Floating Name (Mobile/Tablet generally, or styled here) */}
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h1 className="text-4xl font-bold font-serif mb-2">{profile.name}</h1>
                                <p className="text-white/90 font-medium text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {profile.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="flex-1 p-8 md:p-12 h-full">
                        
                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-gray-100">
                            <button className="flex-1 min-w-[200px] bg-[#8B0000] hover:bg-rose-900 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Send Interest
                            </button>
                            <button className="w-14 h-14 rounded-full border-2 border-rose-100 flex items-center justify-center text-gray-500 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all bg-white shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <button className="w-14 h-14 rounded-full border-2 border-yellow-100 flex items-center justify-center text-gray-500 hover:text-yellow-600 hover:border-yellow-200 hover:bg-yellow-50 transition-all bg-white shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        </div>

                        {/* About Section */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold font-serif text-rose-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed text-lg bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50">
                                "{profile.about}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            
                            {/* Basic Info */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Basic Details
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Age / Height</span>
                                        <span className="font-medium text-gray-800">{profile.age} yrs, {profile.height}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Religion</span>
                                        <span className="font-medium text-gray-800">{profile.religion}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Caste</span>
                                        <span className="font-medium text-gray-800">{profile.caste || 'Not Specified'}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Education & Career */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Education & Career
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Education</span>
                                        <span className="font-medium text-gray-800 text-right">{profile.education}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Profession</span>
                                        <span className="font-medium text-gray-800 text-right">{profile.profession || 'Not Specified'}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Family Details */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Family Details
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Father</span>
                                        <span className="font-medium text-gray-800">{profile.familyDetails.fatherStatus}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Mother</span>
                                        <span className="font-medium text-gray-800">{profile.familyDetails.motherStatus}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Siblings</span>
                                        <span className="font-medium text-gray-800">{profile.familyDetails.siblings}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Lifestyle */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Lifestyle
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Diet</span>
                                        <span className="font-medium text-gray-800">{profile.lifestyle.diet}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Drink</span>
                                        <span className="font-medium text-gray-800">{profile.lifestyle.drink}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Smoke</span>
                                        <span className="font-medium text-gray-800">{profile.lifestyle.smoke}</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchProfilePage;
