import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import ServicesSection from './ServicesSection';
import ServicesView from './ServicesView';
import MessagingSystem from './MessagingSystem';
import RecommendedProfiles from './components/RecommendedProfiles';
import './MagicCard.css';

// Asset Imports - Adjusted to match project structure
import brideImg from '../../assets/auth/bride.png';
import groomImg from '../../assets/auth/groom.png';

interface HomeProps {
    onNavigate?: (page: 'home' | 'dashboard') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const navigate = useNavigate();
    const userName = "Pruthvi";
    const [profilePercent] = useState(100);
    const [displayPercent, setDisplayPercent] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeNavTip, setActiveNavTip] = useState('Home');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const profileTips = [
        "Add a professional photo (+15%)",
        "Describe your hobbies and interests (+10%)",
        "Add your education details (+10%)",
        "Complete your career information (+15%)"
    ];

    // Magic Card Mouse Tracker
    const handleMouseMove = (e: React.MouseEvent) => {
        const cards = document.querySelectorAll('.magic-card, .tilt-card');
        cards.forEach(card => {
            const htmlCard = card as HTMLElement;
            const rect = htmlCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            htmlCard.style.setProperty('--mouse-x', `${x}px`);
            htmlCard.style.setProperty('--mouse-y', `${y}px`);
        });
    };

    useEffect(() => {
        const duration = 8000;
        const startTime = Date.now() + 1000;
        
        const updateCounter = () => {
            const now = Date.now();
            if (now < startTime) {
                requestAnimationFrame(updateCounter);
                return;
            }
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedVal = Math.floor(progress * profilePercent);
            setDisplayPercent(easedVal);
            if (progress < 1) requestAnimationFrame(updateCounter);
            else setShowCelebration(true);
        };
        requestAnimationFrame(updateCounter);
    }, [profilePercent]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const marqueeImages = [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
        'https://images.unsplash.com/photo-1519225421980-6923c89286f5?w=400',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
    ];

    return (
        <div className={`home-page ${activeNavTip !== 'Home' ? 'hp-non-home' : ''}`} onMouseMove={handleMouseMove}>
            
            {/* TOP RIGHT NAV — Merged Notify + Profile Chips */}
            <div className="hp-top-right-nav">
                <button className="hp-notif-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    <span className="sn-badge">5</span>
                </button>
                <div className="hp-nav-separator"></div>
                <div className="sn-user-wrap">
                    <button className={`sn-avatar-btn${dropdownOpen ? ' active' : ''}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="sn-avatar">{userName[0]}</div>
                        <span className="sn-online-dot"></span>
                    </button>
                </div>
            </div>

            {/* MAROON SIDE NAV — Gooey Interaction Style */}
            <nav className={`hp-sidenav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="sn-links">
                    {[
                        { tip: 'Home', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                        { tip: 'Matches', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
                        { tip: 'Services', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
                        { tip: 'Messages', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, badge: 3 },
                    ].map((item, i) => {
                        const isActive = activeNavTip === item.tip;
                        return (
                            <div key={i} className={`sn-link${isActive ? ' active' : ''}`} data-tooltip={item.tip} onClick={() => setActiveNavTip(item.tip)}>
                                {item.icon}
                                {item.badge && <span className="sn-badge">{item.badge}</span>}
                                <div className="sn-curve"></div>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* HERO BANNER — Infinite 3-Row Photo Wall */}
            {activeNavTip === 'Home' && (
                <section className="hp-hero">
                    <div className="hp-hero-carousel-grid">
                        <div className="hp-marquee-row row-left">
                            {marqueeImages.map((img, i) => <img key={i} src={img} className="hp-marquee-img" alt="Wedding" />)}
                        </div>
                        <div className="hp-marquee-row row-right">
                            {[...marqueeImages].reverse().map((img, i) => <img key={i} src={img} className="hp-marquee-img" alt="Couple" />)}
                        </div>
                        <div className="hp-marquee-row row-left">
                            {marqueeImages.map((img, i) => <img key={i} src={img} className="hp-marquee-img" alt="Gallery" />)}
                        </div>
                    </div>
                    <div className="hp-hero-overlay"></div>
                    <div className="hp-hero-content">
                        <div className="explore-pill">SHUBH MATRIMONY <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg></div>
                        <h1 className="hero-title">Welcome back, <span className="hero-name">{userName}!</span></h1>
                        <p className="hero-sub">Your journey to a perfect life partner continues</p>
                    </div>
                </section>
            )}

            {/* MAIN DASHBOARD CONTENT */}
            <main className="hp-main">
                <div className="hp-container">
                    <div className="hp-layout">
                        {activeNavTip === 'Home' ? (
                            <div className="hp-left-col">
                                <div className={`profile-card extreme-premium magic-card ${showCelebration ? 'celebrating' : ''}`}>
                                    <div className="magic-card-content">
                                        <div className="profile-card-top">
                                            <div className="pc-user-avatar-wrap">
                                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="User" />
                                            </div>
                                            <div className="pc-text-content">
                                                <div className="pc-title-row">
                                                    <span className="profile-card-title">Profile Completion</span>
                                                    <span className="pc-status-badge">{showCelebration ? 'Elite Member' : 'Step-up Profile'}</span>
                                                </div>
                                                <p className="pc-subtitle">
                                                    Unlock maximum visibility! Complete your profile to get <b className="pc-highlight-text">5x more views.</b>
                                                </p>
                                            </div>
                                            <div className="pc-percentage-badge">
                                                <div className="pc-rolling-wrap">
                                                    <span className="pc-rolling-pct">{displayPercent}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-card-body">
                                            <div className="progress-track" style={{ "--profile-target": `${displayPercent}%` } as any}>
                                                <div className="pc-label-icon-wrap-right">
                                                    <img src={brideImg} alt="Bride" className="pc-label-bride-icon" />
                                                </div>
                                                <div className="progress-fill"></div>
                                                <div className="pc-traveler">
                                                    <img src={groomImg} alt="Groom" className="pc-traveler-img" />
                                                </div>
                                            </div>
                                            <div className="pc-footer-row">
                                                <div className="pc-hint-container">
                                                    <span className="pc-hint-icon">⚡</span>
                                                    <span className="pc-hint-text active">Next step: {profileTips[currentTipIndex]}</span>
                                                </div>
                                                <button className="pc-dashboard-btn" onClick={() => onNavigate?.('dashboard')}>
                                                    Dashboard
                                                    <div className="btn-icon-circle">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <RecommendedProfiles />
                            </div>
                        ) : activeNavTip === 'Services' ? (
                            <ServicesView />
                        ) : activeNavTip === 'Messages' ? (
                            <MessagingSystem />
                        ) : (
                            <div className="hp-left-col blank-page-view">
                                <h1 className="hero-title">{activeNavTip} coming soon...</h1>
                            </div>
                        )}

                        <aside className="hp-right-col">
                            {activeNavTip === 'Home' && (
                                <>
                                    <div className="sidebar-card success-card">
                                        <div className="magic-card-content">
                                            <div className="success-header">
                                                <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400" className="success-couple-img" alt="Couple" />
                                                <div className="success-label">Success Stories</div>
                                                <div className="success-header-overlay">
                                                    <div className="success-couple-names">Manoj & Kavitha</div>
                                                    <div className="success-couple-tag">Married 2024</div>
                                                </div>
                                            </div>
                                            <div className="success-body">
                                                <p className="success-quote">"We found each other through ShubhMatrimony and it was the best decision of our lives."</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sidebar-card activity-card">
                                        <div className="sidebar-card-title">Recent Activity</div>
                                        <div className="magic-card-content activity-list">
                                            <div className="activity-item">
                                                <div className="activity-icon likes">❤</div>
                                                <div className="activity-label">Likes Received</div>
                                                <div className="activity-count">2.4K</div>
                                            </div>
                                            <div className="activity-item">
                                                <div className="activity-icon messages">💬</div>
                                                <div className="activity-label">New Messages</div>
                                                <div className="activity-count">18</div>
                                            </div>
                                            <div className="activity-item">
                                                <div className="activity-icon views">👁</div>
                                                <div className="activity-label">Profile Views</div>
                                                <div className="activity-count">482</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sidebar-card quick-links-card">
                                        <div className="sidebar-card-title">Account Tools</div>
                                        <div className="magic-card-content quick-links-list">
                                            <a href="#" className="quick-link-item">📸 Add New Photos</a>
                                            <a href="#" className="quick-link-item">✏ Edit Core Profile</a>
                                            <a href="#" className="quick-link-item">⚙ Privacy Settings</a>
                                            <a href="#" className="quick-link-item">💎 Upgrade to Premium</a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </aside>
                    </div>
                </div>
            </main>

            {activeNavTip === 'Home' && <ServicesSection />}

            <footer className="hp-footer">
                <div className="hp-container footer-inner">
                    <p className="footer-copy">© 2026 ShubhMatrimony. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
