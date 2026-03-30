import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="dash-header">
            <div className="dash-header-inner">
                {/* Logo */}
                <div className="dash-logo">
                    <span className="logo-symbol">💒</span>
                    <span className="logo-word">ShubhVivah</span>
                </div>

                {/* Search */}
                <div className="dash-search">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search matches, city, caste..." className="search-input" />
                </div>

                {/* Right */}
                <div className="dash-header-actions">
                    <button className="header-action-btn" aria-label="Messages">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="action-badge">3</span>
                    </button>
                    <button className="header-action-btn" aria-label="Notifications">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="action-badge">5</span>
                    </button>
                    <div className="header-avatar">
                        <div className="avatar-circle">P</div>
                        <span className="avatar-online"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
