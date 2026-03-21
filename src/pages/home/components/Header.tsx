import React from 'react';
import './Header.css';

interface HeaderProps {
    onNavigate?: (page: 'home' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="home-dashboard-header">
            <div className="header-logo" onClick={() => onNavigate?.('home')} style={{ cursor: 'pointer' }}>
                <span className="logo-icon">💒</span>
                <span className="logo-text">ShubhVivah</span>
            </div>
            <nav className="header-nav">
                <div className="nav-item active" onClick={() => onNavigate?.('dashboard')} style={{ cursor: 'pointer' }}>Dashboard</div>
                <div className="nav-item">Messages</div>
                <div className="nav-item">Matches</div>
                <div className="nav-item">Search</div>
            </nav>
            <div className="header-actions">
                <div className="header-notif">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="notif-dot"></span>
                </div>
                <div className="header-user">
                    <div className="user-avatar">P</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
