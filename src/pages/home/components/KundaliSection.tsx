import React from 'react';
import './KundaliSection.css';

const KundaliSection: React.FC = () => {
    return (
        <div className="kundali-card">
            <div className="kundali-glow"></div>
            
            <div className="kundali-orbit">
                <div className="orbit-dot dot-1"></div>
                <div className="orbit-dot dot-2"></div>
                <div className="orbit-dot dot-3"></div>
            </div>

            <div className="kundali-content">
                <div className="kundali-header-row">
                    <div className="kundali-icon-wrap">
                        <span className="kundali-icon">🕉️</span>
                    </div>
                    <div className="kundali-info">
                        <h3>Pruthvi Parmal</h3>
                        <p>Mesh • Krittika • Manglik (N)</p>
                    </div>
                </div>

                <div className="kundali-status">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Astro-Compatible
                </div>

                <div className="kundali-tags">
                    <span className="kundali-tag">Sun: Aries</span>
                    <span className="kundali-tag">Moon: Taurus</span>
                    <span className="kundali-tag">31/36 Gunas</span>
                </div>

                <div className="kundali-actions">
                    <button className="kundali-btn kundali-btn-primary">
                        Match Kundali
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </button>
                    <button className="kundali-btn kundali-btn-outline">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default KundaliSection;
