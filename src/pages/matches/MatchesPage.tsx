import React, { useState } from 'react';

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
}

// --- Mock Data ---
const mockMatches: MatchProfile[] = [
    {
        id: '1',
        name: 'Rohan Malhotra',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop', // Example realistic portrait
        matchPercentage: 88,
        age: 28,
        height: '5\'11"',
        religion: 'Hindu',
        caste: 'Punjabi',
        location: 'Mumbai, MH',
        education: 'MBA Finance'
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
        education: 'Software Architect'
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
        education: 'IAS Officer'
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
        education: 'Pilot'
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
        education: 'Doctor'
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
        education: 'Data Scientist'
    },
    {
        id: '7',
        name: 'Siddharth Verma',
        image: 'https://images.unsplash.com/photo-1550259114-ad7187f0b240?w=500&h=500&fit=crop',
        matchPercentage: 85,
        age: 29,
        height: '5\'10"',
        religion: 'Hindu',
        caste: 'Kayastha',
        location: 'Lucknow, UP',
        education: 'Entrepreneur'
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
        education: 'Civil Engineer'
    }
];

// --- Main Component ---
const MatchesPage: React.FC = () => {
    // Basic state for the form, functional in terms of holding values
    // not implementing real filtering logic to keep it purely UI driven as requested
    const [ageRange, setAgeRange] = useState('21 - 25');
    const [religion, setReligion] = useState('Hindu');
    const [location, setLocation] = useState('');
    const [education, setEducation] = useState('All Degrees');

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans selection:bg-rose-100 selection:text-rose-600">
            {/* Main Content Area */}
            <div className="max-w-[1700px] mx-auto px-6 py-12 md:px-12 relative z-20">
                
                {/* Header Titles */}
                <div className="text-center mb-10 mt-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-rose-800 mb-2">Your Potential Matches</h1>
                    <p className="text-gray-600 font-medium tracking-wide">Profiles selected based on your preferences</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Sidebar - Refine Search */}
                    <div className="w-full lg:w-[320px] bg-white rounded-2xl shadow-sm border border-rose-100 p-8 sticky top-28 flex-shrink-0">
                        <h2 className="text-2xl font-bold font-serif text-rose-800 text-center mb-8">Refine Search</h2>
                        
                        <div className="space-y-6">
                            {/* Age Range */}
                            <div className="flex flex-col items-center">
                                <label className="text-sm font-medium text-gray-700 mb-2">Age Range</label>
                                <select 
                                    value={ageRange}
                                    onChange={(e) => setAgeRange(e.target.value)}
                                    className="w-full text-center py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer"
                                >
                                    <option>18 - 21</option>
                                    <option>21 - 25</option>
                                    <option>26 - 30</option>
                                    <option>31 - 35</option>
                                    <option>36+</option>
                                </select>
                            </div>

                            {/* Religion */}
                            <div className="flex flex-col items-center">
                                <label className="text-sm font-medium text-gray-700 mb-2">Religion</label>
                                <select 
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
                                    className="w-full text-center py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer"
                                >
                                    <option>Hindu</option>
                                    <option>Muslim</option>
                                    <option>Sikh</option>
                                    <option>Christian</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col items-center">
                                <label className="text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input 
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g. Mumbai, Pune"
                                    className="w-full text-center py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Education */}
                            <div className="flex flex-col items-center">
                                <label className="text-sm font-medium text-gray-700 mb-2">Education</label>
                                <select 
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    className="w-full text-center py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer"
                                >
                                    <option>All Degrees</option>
                                    <option>Bachelors</option>
                                    <option>Masters</option>
                                    <option>Doctorate</option>
                                    <option>Undergraduate</option>
                                </select>
                            </div>

                            {/* Apply Button */}
                            <button className="w-full mt-6 bg-[#8B0000] hover:bg-rose-900 text-white font-bold py-3.5 px-6 rounded-full transition-colors shadow-md">
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Right Grid - Profiles */}
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {mockMatches.map((profile) => (
                            <div key={profile.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                                
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={profile.image} 
                                        alt={profile.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    {/* Match Badge */}
                                    <div className="absolute top-4 right-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {profile.matchPercentage}% Match
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-rose-900 text-center mb-6">{profile.name}</h3>
                                    
                                    {/* Info Grid */}
                                    <div className="space-y-3 flex-1">
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">AGE / HEIGHT</span>
                                            <span className="text-gray-800 font-medium">{profile.age} yrs • {profile.height}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">RELIGION</span>
                                            <span className="text-gray-800 font-medium text-right">{profile.religion}{profile.caste ? `, ${profile.caste}` : ''}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">LOCATION</span>
                                            <span className="text-gray-800 font-medium text-right">{profile.location}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">EDUCATION</span>
                                            <span className="text-gray-800 font-medium text-right">{profile.education}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-8 space-y-4">
                                        <div className="flex items-center gap-3">
                                            {/* Shortlist/Star */}
                                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:border-yellow-200 hover:bg-yellow-50 transition-colors shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            </button>
                                            {/* Like/Heart */}
                                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-colors shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                            {/* Send Interest */}
                                            <button className="flex-1 bg-[#8B0000] hover:bg-rose-900 text-white font-semibold py-2.5 rounded-full transition-colors truncate px-2">
                                                Send Interest
                                            </button>
                                        </div>
                                        {/* View Full Profile */}
                                        <button className="w-full border-2 border-[#8B0000] text-[#8B0000] hover:bg-rose-50 font-semibold py-2.5 rounded-full transition-colors bg-white">
                                            View Full Profile
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatchesPage;
