import React from 'react';
import './KundaliSection.css';

const KundaliSection = () => {
    return (
        <div className="kundali-card">
            <div className="kundali-glow"></div>

            <div className="kundali-content">
                <div className="kundali-header-row">
                    <div className="kundali-icon-wrap">
                        <span className="kundali-icon">🪐</span>
                    </div>
                    <div className="kundali-info">
                        <h3>Free Kundali & Horoscope</h3>
                        <p>Discover your cosmic path & compatibility</p>
                    </div>
                </div>

                <div className="kundali-status">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4ade80">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>Your Kundali is Ready</span>
                </div>

                <div className="kundali-tags">
                    <span className="kundali-tag">Non-Manglik</span>
                    <span className="kundali-tag">Gana: Deva</span>
                </div>

                <div className="kundali-actions">
                    <button className="kundali-btn kundali-btn-outline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        View Chart
                    </button>
                    <button className="kundali-btn kundali-btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" />
                            <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        Match Kundali
                    </button>
                </div>
            </div>

            {/* Decorative orbit */}
            <div className="kundali-orbit">
                <div className="orbit-dot dot-1"></div>
                <div className="orbit-dot dot-2"></div>
                <div className="orbit-dot dot-3"></div>
            </div>
        </div>
    );
};

export default KundaliSection;
