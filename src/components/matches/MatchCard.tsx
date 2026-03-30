import React, { useRef } from 'react';
import './MatchCard.css';

const MatchCard = ({ match, index = 0 }) => {
    const cardRef = useRef(null);

    const data = match || {
        name: "User",
        age: 25,
        city: "City",
        matchPercentage: 85,
        image: "https://via.placeholder.com/300x400",
        tags: []
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((centerY - y) / centerY) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    };

    return (
        <div
            className="match-card-3d"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ animationDelay: `${0.15 + index * 0.12}s` }}
        >
            <div className="mc-glow"></div>
            <div className="mc-image-wrap">
                <img src={data.image} alt={data.name} className="mc-image" loading="lazy" />
                <div className="mc-image-overlay"></div>
                <div className="mc-percent-badge">{data.matchPercentage}%</div>
            </div>
            <div className="mc-info">
                <span className="mc-name">{data.name}</span>
                <span className="mc-meta">{data.age} yrs • {data.city}</span>
                {data.tags && data.tags.length > 0 && (
                    <div className="mc-tags">
                        {data.tags.map((tag, i) => (
                            <span key={i} className="mc-tag">{tag}</span>
                        ))}
                    </div>
                )}
                <button className="mc-view-btn">
                    View Profile
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MatchCard;
