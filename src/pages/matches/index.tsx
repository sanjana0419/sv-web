import React, { useState } from 'react';
import './MatchesPage.css';

const matchesData = [
    {
        id: 1,
        name: 'Anjali',
        age: 26,
        location: 'Pune, India',
        profession: 'Software Engineer',
        tags: ['Hindu', 'B.Tech', "5'4\""],
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80',
        verified: true,
        online: true,
    },
    {
        id: 2,
        name: 'Priya',
        age: 24,
        location: 'Mumbai, India',
        profession: 'UI/UX Designer',
        tags: ['Sikh', 'M.Des', "5'6\""],
        image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=600&q=80',
        verified: true,
        online: false,
    },
    {
        id: 3,
        name: 'Sneha',
        age: 27,
        location: 'Bangalore, India',
        profession: 'Data Scientist',
        tags: ['Jain', 'MS', "5'5\""],
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
        verified: false,
        online: true,
    },
    {
        id: 4,
        name: 'Riya',
        age: 25,
        location: 'Delhi, India',
        profession: 'Marketing Manager',
        tags: ['Hindu', 'MBA', "5'3\""],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
        verified: true,
        online: true,
    }
];

const MatchesPage: React.FC = () => {
    const [age, setAge] = useState(24);
    const [activeButtons, setActiveButtons] = useState<Record<number, string[]>>({});

    const handleButtonClick = (profileId: number, buttonType: string) => {
        setActiveButtons(prev => {
            const current = prev[profileId] || [];
            if (current.includes(buttonType)) {
                return { ...prev, [profileId]: current.filter(t => t !== buttonType) };
            } else {
                return { ...prev, [profileId]: [...current, buttonType] };
            }
        });
    };

    return (
        <div className="matches-container">
            {/* Header Section */}
            <header className="matches-header">
                <div className="header-content">
                    <h1 className="matches-title">Your Matches</h1>
                    <p className="matches-subtitle">Where meaningful connections begin</p>
                </div>

                {/* Filters Section */}
                <div className="matches-filters">
                    <div className="filter-item">
                        <label>Age Range: {age}</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="18"
                                max="60"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                className="range-slider"
                            />
                        </div>
                    </div>
                    <div className="filter-item">
                        <label>Location</label>
                        <select className="filter-select">
                            <option>All Cities</option>
                            <option>Pune</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Religion</label>
                        <select className="filter-select">
                            <option>Any</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Sikh</option>
                            <option>Christian</option>
                            <option>Jain</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Marital Status</label>
                        <select className="filter-select">
                            <option>Any</option>
                            <option>Never Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                            <option>Awaiting Divorce</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Profession</label>
                        <select className="filter-select">
                            <option>Any</option>
                            <option>Engineer</option>
                            <option>Doctor</option>
                            <option>Business</option>
                            <option>Teacher</option>
                            <option>Govt. Job</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="matches-content">
                {/* Matches Grid */}
                <main className="matches-grid-section">
                    <div className="matches-grid">
                        {matchesData.map((profile) => (
                            <div key={profile.id} className="profile-card">
                                <div className="card-image-wrapper">
                                    <img src={profile.image} alt={profile.name} className="profile-image" />
                                    <div className="image-gradient"></div>
                                    <div className="profile-overlay-info">
                                        <h3 className="profile-name-age">{profile.name}, {profile.age}</h3>
                                    </div>
                                    <button className="save-icon">⭐</button>
                                </div>
                                <div className="card-details">
                                    <div className="info-row">
                                        <span className="info-icon">📍</span>
                                        <span className="info-text">{profile.location}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-icon">💼</span>
                                        <span className="info-text">{profile.profession}</span>
                                    </div>
                                    <div className="profile-tags">
                                        {profile.tags.map((tag, index) => (
                                            <span key={index} className="tag-badge">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="card-actions">
                                        <button 
                                            className={`interest-btn ${(activeButtons[profile.id] || []).includes('interest') ? 'active' : ''}`}
                                            onClick={() => handleButtonClick(profile.id, 'interest')}
                                        >
                                            ✨ Interest
                                        </button>
                                        <button 
                                            className={`like-btn ${(activeButtons[profile.id] || []).includes('like') ? 'active' : ''}`}
                                            onClick={() => handleButtonClick(profile.id, 'like')}
                                        >
                                            ❤️ Like
                                        </button>
                                        <button 
                                            className={`shortlist-btn ${(activeButtons[profile.id] || []).includes('shortlist') ? 'active' : ''}`}
                                            onClick={() => handleButtonClick(profile.id, 'shortlist')}
                                        >
                                            ⭐ Shortlist
                                        </button>
                                        <button 
                                            className={`view-btn ${(activeButtons[profile.id] || []).includes('view') ? 'active' : ''}`}
                                            onClick={() => handleButtonClick(profile.id, 'view')}
                                        >
                                            View Full Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Side Panel */}
                <aside className="matches-sidebar">
                    <div className="match-journey-card">
                        <h2 className="journey-title">Your Match Journey</h2>
                        
                        <div className="journey-stats">
                            <div className="journey-stat-item">
                                <span className="stat-icon">❤️</span>
                                <div className="stat-info">
                                    <span className="stat-count">24</span>
                                    <span className="stat-label">Matches Found</span>
                                </div>
                            </div>
                            <div className="journey-stat-item">
                                <span className="stat-icon">✨</span>
                                <div className="stat-info">
                                    <span className="stat-count">6</span>
                                    <span className="stat-label">New Today</span>
                                </div>
                            </div>
                            <div className="journey-stat-item">
                                <span className="stat-icon">⭐</span>
                                <div className="stat-info">
                                    <span className="stat-count">8</span>
                                    <span className="stat-label">Shortlisted</span>
                                </div>
                            </div>
                        </div>

                        <div className="journey-divider"></div>

                        <div className="profile-strength-section">
                            <div className="strength-header">
                                <span className="strength-title">Profile Strength</span>
                                <span className="strength-value">75%</span>
                            </div>
                            <div className="horizontal-progress-bar">
                                <div className="progress-fill" style={{ width: '75%' }}></div>
                            </div>
                            <p className="strength-note">75% Complete</p>
                        </div>

                        <div className="recent-matches-section">
                            <h3 className="section-title">Recent Matches</h3>
                            <div className="avatar-group">
                                {matchesData.slice(0, 4).map((m, i) => (
                                    <div key={m.id} className="avatar-wrapper" style={{ zIndex: 4 - i }}>
                                        <img src={m.image} alt={m.name} className="mini-avatar" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="view-all-matches-cta">
                            View All Matches
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MatchesPage;
