import React from 'react';

interface Profile {
    id: number;
    name: string;
    age: number;
    location: string;
    rating: number;
    images: string[];
    details: string;
}

const profiles: Profile[] = [
    {
        id: 1, name: 'Sanya Verma', age: 24, location: 'Pune, MH', rating: 4.9,
        images: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
        ],
        details: '24 Yrs, Software'
    },
    {
        id: 2, name: 'Ananya Singh', age: 26, location: 'Mumbai, MH', rating: 4.9,
        images: [
            'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        ],
        details: '26 Yrs, Doctor'
    },
    {
        id: 3, name: 'Zara Khan', age: 25, location: 'Delhi, NCR', rating: 4.9,
        images: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
        ],
        details: '25 Yrs, Interior'
    },
    {
        id: 4, name: 'Mira Kapoor', age: 24, location: 'Bangalore, KA', rating: 4.9,
        images: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
        ],
        details: '24 Yrs, Architect'
    }
];

const RecommendedProfiles: React.FC = () => {
    return (
        <section className="recommended-section">
            <h2 className="section-heading">Recommended Profiles</h2>
            <div className="profiles-grid">
                {profiles.map((profile) => (
                    <div key={profile.id} className="profile-tile tilt-card">
                        <div className="pt-img-wrap">
                            <div className="pt-carousel-track">
                                {profile.images.map((img, i) => (
                                    <img key={i} src={img} alt={profile.name} className="pt-img" />
                                ))}
                                {/* Clone first image for infinite loop if needed, though CSS animation uses 400% width for 4 steps */}
                                <img src={profile.images[0]} alt={profile.name} className="pt-img" />
                            </div>
                            <div className="pt-img-overlay"></div>
                            <div className="pt-badge">Verified</div>
                            <button className="pt-fav-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        <div className="pt-content">
                            <div className="pt-row-main">
                                <h3 className="pt-name">{profile.name}</h3>
                                <div className="pt-rating">
                                    {profile.rating} <span>★</span>
                                </div>
                            </div>
                            <div className="pt-loc-row">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {profile.location}
                            </div>
                            <div className="pt-footer">
                                <div className="pt-tags">
                                    {profile.details.split(', ').map((tag, i) => (
                                        <span key={i} className="pt-micro-tag">{tag}</span>
                                    ))}
                                </div>
                                <button className="pt-connect-btn">Connect</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedProfiles;
