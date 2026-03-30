import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../context/ProfileContext';
import './ProfileCompletion.css';

const ProfileCompletion: React.FC = () => {
    const { completeness, profile } = useProfile();
    const navigate = useNavigate();
    const [animatedPercent, setAnimatedPercent] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const circumference = 2 * Math.PI * 54;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        
        // Animated counting effect
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentPercent = Math.floor(easeOutProgress * completeness);
            
            setAnimatedPercent(currentPercent);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, completeness]);

    const offset = circumference - (animatedPercent / 100) * circumference;

    const steps = [
        { icon: '📸', label: 'Photos', done: !!profile.image },
        { icon: '👨👩👧', label: 'Family', done: !!profile.familyDetails.fatherOccupation || !!profile.familyDetails.motherOccupation || !!profile.familyDetails.familyType },
        { icon: '🪐', label: 'Kundali', done: profile.hasHoroscope },
        { icon: '💼', label: 'Career', done: !!profile.profession },
    ];

    return (
        <div
            ref={cardRef}
            className="pc-3d-card"
        >
            <div className="pc-3d-header">
                <h3>Complete Your Profile</h3>
                <span className="pc-3d-badge">{animatedPercent}%</span>
            </div>

            {/* SVG Ring with Gradient */}
            <div className="pc-ring-wrap">
                <svg className="pc-ring-svg" viewBox="0 0 120 120">
                    <defs>
                        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--crimson)" />
                            <stop offset="100%" stopColor="var(--crimson-light)" />
                        </linearGradient>
                    </defs>
                    <circle
                        className="pc-ring-bg"
                        cx="60" cy="60" r="54"
                        fill="none"
                        strokeWidth="8"
                    />
                    <circle
                        className="pc-ring-fill"
                        cx="60" cy="60" r="54"
                        fill="none"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="pc-ring-center">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className="pc-ring-number">{animatedPercent}</span>
                        <span className="pc-ring-unit">%</span>
                    </div>
                </div>
            </div>

            {/* Step indicators */}
            <div className="pc-steps">
                {steps.map((step, i) => (
                    <div key={i} className={`pc-step ${step.done ? 'step-done' : ''}`}>
                        <div className="pc-step-icon">{step.icon}</div>
                        <span className="pc-step-label">{step.label}</span>
                        {step.done && (
                            <svg className="pc-step-check" width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>

            <button 
                className="pc-cta-btn"
                onClick={() => navigate('/profile/complete')}
            >
                <span>{animatedPercent >= 100 ? 'Edit Profile' : 'Complete Now'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default ProfileCompletion;
