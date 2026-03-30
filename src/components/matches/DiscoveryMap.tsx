import React, { useEffect, useRef, useState } from 'react';
import './DiscoveryMap.css';

const DiscoveryMap = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const nearbyProfiles = [
        { x: '35%', y: '30%', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80', delay: 0 },
        { x: '60%', y: '55%', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80', delay: 0.3 },
        { x: '25%', y: '60%', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80', delay: 0.6 },
    ];

    return (
        <div
            className={`discovery-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="discovery-header">
                <div className="discovery-title-group">
                    <div className="discovery-icon-wrap">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                        </svg>
                    </div>
                    <div>
                        <h3>Discover Around You</h3>
                        <p>3 profiles near Duttawadi, Nagpur</p>
                    </div>
                </div>
                <button className="explore-btn">
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* 3D Radar Map */}
            <div className="radar-container">
                <div className="radar-perspective">
                    <div className="radar-ring ring-1"></div>
                    <div className="radar-ring ring-2"></div>
                    <div className="radar-ring ring-3"></div>
                    <div className="radar-sweep"></div>

                    {/* Center pin */}
                    <div className="radar-center">
                        <div className="center-pulse"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--crimson-light)">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                    </div>

                    {/* User markers */}
                    {nearbyProfiles.map((profile, i) => (
                        <div
                            key={i}
                            className="profile-marker"
                            style={{
                                left: profile.x,
                                top: profile.y,
                                animationDelay: `${profile.delay}s`
                            }}
                        >
                            <img src={profile.img} alt="Nearby profile" loading="lazy" />
                            <div className="marker-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="view-nearby-btn">
                <span className="btn-shimmer-nearby"></span>
                <span>View All Nearby Matches</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default DiscoveryMap;
