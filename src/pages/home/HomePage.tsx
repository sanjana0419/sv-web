import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, UserRoundPen, Settings, Trophy, Zap, Construction, CreditCard, ArrowRight } from 'lucide-react';
import './HomePage.css';
import { useProfile } from '../../context/ProfileContext';
import ServicesSection from '../servicesforuser/ServicesSection';
import ServicesView from '../servicesforuser/ServicesView';
import MessagingSystem from '../messages/MessagingSystem';
import './MagicCard.css';
import logoVideo from '../../assets/0220 (1).mp4';
import backVid from '../../assets/backvid.mp4';
import brideImg from '../../assets/bride.png';
import groomImg from '../../assets/groom.png';
import carImg1 from '../../assets/wedding-couple.jpg';
import carImg2 from '../../assets/wedding-invitation.jpg';
import carImg3 from '../../assets/wedding-venue.jpg';
import carImg4 from '../../assets/wedding-jewellery.jpg';
import carImg5 from '../../assets/wedding-food.jpg';
import carImg6 from '../../assets/wedding-mehndi.jpg';
import carImg7 from '../../assets/wedding-decor.jpg';
import sustImg from '../../assets/sust.jpeg';

interface HomePageProps {
    onNavigate?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const navigate = useNavigate();
    const userName = "Pruthvi";
    const { completeness } = useProfile();
    const [displayPercent, setDisplayPercent] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeNavTip, setActiveNavTip] = useState('Home');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const tiltRefs = useRef([]);

    const profileTips = [
        "Add a professional photo (+15%)",
        "Describe your hobbies and interests (+10%)",
        "Add your education details (+10%)",
        "Complete your career information (+15%)",
        "Verify your mobile number (+5%)"
    ];

    const visibilityInsights = [
        {
            label: "Visibility",
            value: "5x Boost",
            icon: "ðŸš€"
        },
        {
            label: "Strength",
            value: "Elite",
            icon: "ðŸ’Ž"
        },
        {
            label: "Trust",
            value: "High",
            icon: "âœ…"
        }
    ];


    // Magic Card Mouse Tracker
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = document.querySelectorAll('.magic-card');
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
        // Sync the display percentage with the 10s CSS fill animation
        const duration = 10000; // 10s
        const startTime = Date.now() + 1200; // Offset by the animation-delay (1.2s)

        // Robust Cubic Bezier solver (matches CSS 0.4, 0, 0.2, 1)
        const solveBezier = (x: number, x1: number, y1: number, x2: number, y2: number): number => {
            const epsilon = 1e-6;

            // Cubic coefficients
            const cx = 3 * x1;
            const bx = 3 * (x2 - x1) - cx;
            const ax = 1 - cx - bx;

            const cy = 3 * y1;
            const by = 3 * (y2 - y1) - cy;
            const ay = 1 - cy - by;

            const sampleBezierX = (t: number) => ((ax * t + bx) * t + cx) * t;
            const sampleBezierY = (t: number) => ((ay * t + by) * t + cy) * t;
            const sampleBezierDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

            // Find t for given x using Newton's method
            let t = x;
            for (let i = 0; i < 8; i++) {
                const xSample = sampleBezierX(t) - x;
                if (Math.abs(xSample) < epsilon) break;
                const dX = sampleBezierDerivativeX(t);
                if (Math.abs(dX) < 1e-6) break;
                t -= xSample / dX;
            }

            return sampleBezierY(t);
        };

        const updateCounter = () => {
            const now = Date.now();
            if (now < startTime) {
                requestAnimationFrame(updateCounter);
                return;
            }

            const elapsed = now - startTime;
            const progressTime = Math.min(elapsed / duration, 1);

            // Map the current time (progressTime) to the eased progress using the same curve as CSS
            const easedProgress = solveBezier(progressTime, 0.4, 0, 0.2, 1);

            const currentVal = Math.floor(easedProgress * completeness);

            setDisplayPercent(currentVal);

            if (progressTime < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Trigger celebration exactly at 100%
                if (completeness === 100) setShowCelebration(true);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [completeness]);

    useEffect(() => {
        if (displayPercent === 100) return;
        const tipInterval = setInterval(() => {
            setCurrentTipIndex(prev => (prev + 1) % profileTips.length);
        }, 5000);
        return () => clearInterval(tipInterval);
    }, [profileTips.length, displayPercent]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        const handleScroll = () => {
            const mainEl = document.querySelector('.hp-main');
            if (mainEl) {
                const rect = mainEl.getBoundingClientRect();
                const midScreen = window.innerHeight / 2;
                // If the middle of the screen is within the bounds of the white main section
                if (rect.top <= midScreen && rect.bottom >= midScreen) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check once on mount

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const recommendedProfiles = [
        {
            name: "Sanya Verma", profession: "Software Engineer", age: 24, city: "Pune, MH",
            imgs: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
            ]
        },
        {
            name: "Ananya Singh", profession: "Doctor", age: 26, city: "Mumbai, MH",
            imgs: [
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
            ]
        },
        {
            name: "Zara Khan", profession: "Interior Designer", age: 25, city: "Delhi, NCR",
            imgs: [
                "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1546961342-ea5f62d6b401?w=400&q=80"
            ]
        },
        {
            name: "Mira Kapoor", profession: "Architect", age: 24, city: "Bangalore, KA",
            imgs: [
                "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80"
            ]
        },
        {
            name: "Ishita Rao", profession: "Professor", age: 27, city: "Hyderabad, TS",
            imgs: [
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=400&q=80"
            ]
        },
        {
            name: "Neha Trivedi", profession: "MBA Student", age: 23, city: "Indore, MP",
            imgs: [
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=80",
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
            ]
        },
        {
            name: "Priya Sharma", profession: "Fashion Designer", age: 24, city: "Jaipur, RJ",
            imgs: [
                "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80"
            ]
        },
        {
            name: "Megha Jain", profession: "Journalist", age: 25, city: "Ahmedabad, GJ",
            imgs: [
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400&q=80",
                "https://images.unsplash.com/photo-1509060408471-2bfc180f6825?w=400&q=80"
            ]
        },
    ];

    return (
        <div className={`home-page ${activeNavTip !== 'Home' ? 'hp-non-home' : ''}`} onMouseMove={handleMouseMove}>

            {/* â”€â”€ FULL-SCREEN VIDEO BACKGROUND (temporarily removed) â”€â”€ */}
            {/* <div className="hp-bg-video-wrap">
                <video
                    className="hp-bg-video"
                    src={backVid}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="hp-bg-video-overlay"></div>
            </div> */}

            {/* â”€â”€ TOP RIGHT PROFILE & NOTIFICATIONS â”€â”€ */}
            <div className="hp-top-right-nav">
                <button className="hp-notif-btn" data-tooltip="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    <span className="sn-badge">5</span>
                </button>
                <div className="hp-nav-separator"></div>
                <div className="sn-user-wrap" ref={dropdownRef}>
                    <button className={`sn-avatar-btn${dropdownOpen ? ' active' : ''}`} onClick={() => setDropdownOpen(o => !o)} data-tooltip={userName}>
                        <div className="sn-avatar">{userName[0]}</div>
                        <span className="sn-online-dot"></span>
                    </button>
                    {dropdownOpen && (
                        <div className="profile-dropdown sn-dropdown">
                            <div className="pd-user-card">
                                <div className="pd-avatar-lg">{userName[0]}</div>
                                <div className="pd-user-info">
                                    <span className="pd-name">{userName} Parmal</span>
                                    <span className="pd-meta">28 &nbsp;â€¢&nbsp; Pune, Maharashtra</span>
                                    <span className="pd-online">Online</span>
                                </div>
                            </div>
                            <div className="pd-stats">
                                <div className="pd-stat"><strong>1</strong> Photo</div>
                                <div className="pd-stat-divider" />
                                <div className="pd-stat"><strong>20%</strong> Profile</div>
                                <div className="pd-stat-divider" />
                                <div className="pd-stat"><strong>0</strong> Matches</div>
                            </div>
                            <nav className="pd-menu">
                                {[
                                    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>), label: 'Profile' },
                                    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>), label: 'Matches' },
                                    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>), label: 'Messages' },
                                    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>), label: 'Kundali' },
                                    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v4" /></svg>), label: 'Membership' },
                                ].map((item, i) => (
                                    <a href="#" className="pd-menu-item" key={i} onClick={() => setDropdownOpen(false)}>
                                        <span className="pd-menu-icon">{item.icon}</span>
                                        <span className="pd-menu-label">{item.label}</span>
                                    </a>
                                ))}
                                <a href="#" className="pd-menu-item pd-logout" onClick={() => setDropdownOpen(false)}>
                                    <span className="pd-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg></span>
                                    <span className="pd-menu-label">Logout</span>
                                </a>
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* â”€â”€ GLASS SIDE NAV â”€â”€ */}
            <nav className={`hp-sidenav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="sn-links">
                    {[
                        { tip: 'Home', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                        { tip: 'Matches', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
                        { tip: 'Search', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
                        { tip: 'Messages', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, badge: 3 },
                        { tip: 'Services', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
                    ].map((item, i) => {
                        const isActive = activeNavTip === item.tip;
                        return (
                            <a
                                key={i}
                                href="#"
                                className={`sn-link${isActive ? ' active' : ''}`}
                                data-tooltip={item.tip}
                                onClick={(e) => { e.preventDefault(); setActiveNavTip(item.tip); }}
                            >
                                {item.icon}
                                {item.badge && <span className="sn-badge">{item.badge}</span>}
                                <div className="sn-curve"></div>
                            </a>
                        );
                    })}
                </div>
            </nav>

            {/* â”€â”€ HERO BANNER â”€â”€ */}
            {activeNavTip === 'Home' && (
                <section className="hp-hero">
                    {/* â”€â”€ New: Hero Carousel (3-Row Grid Marquee) â”€â”€ */}
                    <div className="hp-hero-carousel-grid">
                        {/* Row 1 (Left) */}
                        <div className="hp-marquee-row row-left">
                            {[carImg1, carImg2, carImg3, carImg4, carImg5, carImg6, carImg7, carImg1, carImg3, carImg5, carImg7, carImg2, carImg4, carImg6,
                                carImg1, carImg2, carImg3, carImg4, carImg5, carImg6, carImg7, carImg1, carImg3, carImg5, carImg7, carImg2, carImg4, carImg6,
                            ].map((src, i) => (
                                <img key={i} className="hp-marquee-img" src={src} alt="Wedding" />
                            ))}
                        </div>
                        {/* Row 2 (Right) */}
                        <div className="hp-marquee-row row-right">
                            {[carImg4, carImg7, carImg2, carImg5, carImg1, carImg6, carImg3, carImg7, carImg4, carImg1, carImg6, carImg3, carImg5, carImg2,
                                carImg4, carImg7, carImg2, carImg5, carImg1, carImg6, carImg3, carImg7, carImg4, carImg1, carImg6, carImg3, carImg5, carImg2,
                            ].map((src, i) => (
                                <img key={i} className="hp-marquee-img" src={src} alt="Wedding" />
                            ))}
                        </div>
                        {/* Row 3 (Left) */}
                        <div className="hp-marquee-row row-left">
                            {[carImg6, carImg3, carImg5, carImg1, carImg7, carImg2, carImg4, carImg6, carImg2, carImg7, carImg3, carImg1, carImg5, carImg4,
                                carImg6, carImg3, carImg5, carImg1, carImg7, carImg2, carImg4, carImg6, carImg2, carImg7, carImg3, carImg1, carImg5, carImg4,
                            ].map((src, i) => (
                                <img key={i} className="hp-marquee-img" src={src} alt="Wedding" />
                            ))}
                        </div>
                    </div>

                    {/* â”€â”€ High-End Glass Blur Overlay â”€â”€ */}
                    <div className="hp-hero-overlay"></div>

                    <div className="hero-particles">
                        {[...Array(12)].map((_, i) => (
                            <span key={i} className="hero-dot" style={{
                                left: `${8 + (i * 7.5) % 90}%`,
                                top: `${10 + (i * 23) % 75}%`,
                                animationDelay: `${i * 0.6}s`,
                                animationDuration: `${3 + (i % 4) * 1.5}s`,
                                width: `${3 + (i % 3) * 2}px`,
                                height: `${3 + (i % 3) * 2}px`,
                            }} />
                        ))}
                    </div>

                    <div className="hp-hero-content">
                        <h1 className="hero-title">Welcome back, <span className="hero-name">{userName}!</span></h1>
                        <p className="hero-sub">Find your perfect life partner</p>
                    </div>

                    {/* â”€â”€ Glass Scroll-Down Arrow â”€â”€ */}
                    <button className="hp-scroll-arrow" onClick={() => document.querySelector('.hp-main')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll down">
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-body, Inter, sans-serif)' }}>Explore</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                </section>
            )}

            {/* â”€â”€ MAIN CONTENT â”€â”€ */}
            <main className="hp-main">
                <div className="hp-container">
                    <div className="hp-layout">

                        {/* â”€â”€ LEFT COLUMN â”€â”€ */}
                        {activeNavTip === 'Home' ? (
                            <div className="hp-left-col">
                                {/* â”€â”€ PROFILE CARD â”€â”€ */}
                                {/* â”€â”€ PROFILE CARD WRAPPER TO ISOLATE AOS â”€â”€ */}
                                <div>
                                    <div
                                        className={`profile-card extreme-premium magic-card ${showCelebration ? 'celebrating' : ''}`}
                                    >
                                        <div className="magic-card-content">
                                            {showCelebration && (
                                                <div className="pc-petals-container">
                                                    <div className="pc-photo-bed"></div>
                                                    {[...Array(60)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="pc-petal-photo"
                                                            style={{
                                                                "--x": `${Math.random() * 100}%`,
                                                                "--delay": `${Math.random() * 8}s`,
                                                                "--duration": `${7 + Math.random() * 6}s`,
                                                                "--sway": `${Math.random() * 120 - 60}px`,
                                                                "--landing-y": `${Math.random() * 15}px`,
                                                                "--rotate-start": `${Math.random() * 360}deg`,
                                                                "--rotate-mid": `${Math.random() * 720}deg`,
                                                                "--rotate-end": `${Math.random() * 360}deg`,
                                                                "--scale": `${0.6 + Math.random() * 0.7}`
                                                            } as React.CSSProperties}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="profile-card-top">
                                                <div className="pc-user-status">
                                                    <div className="pc-user-avatar-wrap">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                                                            alt="User"
                                                            className="pc-user-avatar"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pc-text-content">
                                                    <div className="pc-title-row">
                                                        <span className="profile-card-title">Profile Completion</span>
                                                    </div>
                                                    <p className="pc-subtitle">
                                                        {displayPercent === 100
                                                            ? "Your profile is more visible than 80% of users"
                                                            : <span>Unlock maximum visibility! Complete your profile to get <b className="pc-highlight-text">5x more views.</b></span>}
                                                    </p>
                                                </div>
                                                <div className="pc-percentage-badge">
                                                    {displayPercent === 100 ? (
                                                        <div className="pc-badge-circle">
                                                            <span className="pc-badge-val">100%</span>
                                                        </div>
                                                    ) : (
                                                        <div className="pc-rolling-wrap">
                                                            <div className="pc-rolling-digit">
                                                                <div className="pc-digit-reel" style={{ transform: `translateY(-${Math.floor(displayPercent / 10) * 1.2}rem)` }}>
                                                                    {[...Array(10)].map((_, i) => <span key={i}>{i}</span>)}
                                                                </div>
                                                            </div>
                                                            <div className="pc-rolling-digit">
                                                                <div className="pc-digit-reel" style={{ transform: `translateY(-${(displayPercent % 10) * 1.2}rem)` }}>
                                                                    {[...Array(10)].map((_, i) => <span key={i}>{i}</span>)}
                                                                </div>
                                                            </div>
                                                            <span className="pc-rolling-pct">%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-card-body">
                                                <div className="progress-track" style={{ "--profile-target": `${displayPercent}%` } as React.CSSProperties}>
                                                    <div className="pc-label-icon-wrap-right">
                                                        <img src={brideImg} alt="Bride" className="pc-label-bride-icon" />
                                                    </div>
                                                    <div className="progress-fill-glow"></div>
                                                    <div className="progress-fill">
                                                        <div className="progress-segments">
                                                            {[...Array(10)].map((_, i) => <div key={i} className="pc-segment"></div>)}
                                                        </div>
                                                        <div className="progress-spark"></div>
                                                    </div>
                                                    <div className="pc-traveler">
                                                        <img src={groomImg} alt="Groom" className="pc-traveler-img" />
                                                    </div>
                                                    <div className="progress-phantom"></div>
                                                </div>
                                                <div className="pc-footer-row">
                                                    <div className="pc-hint-container">
                                                        <span className="pc-hint-icon">{displayPercent === 100 ? <Trophy size={16} /> : <Zap size={16} />}</span>
                                                        <div className="pc-tip-wrapper">
                                                            {displayPercent < 100 ? (
                                                                profileTips.map((tip, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className={`pc-hint-text ${index === currentTipIndex ? 'active' : ''}`}
                                                                    >
                                                                        Next step: {tip}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="pc-hint-text active">Profile Complete!</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={`btn-continue ${displayPercent === 100 ? 'premium' : 'primary'}`}
                                                        onClick={() => navigate('/profile/complete')}
                                                    >
                                                        <span className="btn-text">
                                                            {displayPercent === 100 ? 'Edit Profile' : 'Complete Profile'}
                                                        </span>
                                                        <div className="btn-icon-circle">
                                                            <ArrowRight size={18} />
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommended Profiles */}
                                <section className="recommended-section">
                                    <h2 className="section-heading">Recommended Profiles</h2>
                                    <div className="profiles-grid">
                                        {recommendedProfiles.map((p, i) => (
                                            <div className="profile-tile magic-card tilt-card" key={i}>
                                                <div className="magic-card-content">
                                                    <div className="pt-img-wrap">
                                                        {/* Auto-scroll Carousel */}
                                                        <div className="pt-carousel-track">
                                                            {p.imgs.map((imgUrl, idx) => (
                                                                <img key={idx} src={imgUrl} alt={`${p.name} ${idx}`} className="pt-img" />
                                                            ))}
                                                            {/* Repeat first image for seamless loop */}
                                                            <img src={p.imgs[0]} alt={`${p.name} 0`} className="pt-img" />
                                                        </div>

                                                        {/* Glass Blur Overlay at Bottom */}
                                                        <div className="pt-img-overlay"></div>

                                                        <div className="pt-badge">Verified</div>
                                                        <button className="pt-fav-btn" aria-label="Add to Favorites">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                        </button>
                                                    </div>
                                                    <div className="pt-content">
                                                        <div className="pt-row-main">
                                                            <h3 className="pt-name">{p.name}</h3>
                                                            <div className="pt-rating">4.9 â˜…</div>
                                                        </div>
                                                        <div className="pt-loc-row">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                            <span className="pt-loc">{p.city}</span>
                                                        </div>
                                                        <div className="pt-footer">
                                                            <div className="pt-tags">
                                                                <span className="pt-micro-tag">{p.age} Yrs</span>
                                                                <span className="pt-micro-tag">{p.profession.split(' ')[0]}</span>
                                                            </div>
                                                            <button
                                                                className="pt-connect-btn"
                                                            >
                                                                Connect
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        ) : activeNavTip === 'Services' ? (
                            <ServicesView />
                        ) : activeNavTip === 'Messages' ? (
                            <MessagingSystem />
                        ) : (
                            <div className="hp-left-col blank-page-view" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px' }}>
                                    <div style={{ fontSize: '3.5rem', marginBottom: '16px', opacity: 0.5 }}><Construction size={48} /></div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '12px', color: '#1a0a08', fontFamily: 'var(--font-display)' }}>{activeNavTip} View</h2>
                                    <p style={{ color: '#666', fontSize: '1.1rem' }}>We are crafting something amazing here. Please check back later!</p>
                                </div>
                            </div>
                        )}

                        {/* â”€â”€ RIGHT SIDEBAR (Restored for Home only) â”€â”€ */}
                        <aside className="hp-right-col">
                            {activeNavTip === 'Home' && (
                                <>
                                    {/* Success Stories */}
                                    <div className="sidebar-card success-card magic-card tilt-card">
                                        <div className="magic-card-content">
                                            <div className="success-header">
                                                <img src={sustImg} alt="Success couple" className="success-couple-img" />
                                                <div className="success-header-overlay">
                                                    <div className="success-couple-names">Manoj & Kavitha</div>
                                                    <div className="success-couple-tag">Married 2024</div>
                                                </div>
                                                <div className="success-label">Success Stories</div>
                                            </div>
                                            <div className="success-body">
                                                <p className="success-quote">"We found each other through ShubhVivah and it has been the best decision of our lives. Thank you for making our dreams come true!"</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="sidebar-card activity-card magic-card tilt-card">
                                        <div className="magic-card-content">
                                            <h3 className="sidebar-card-title">Recent Activity</h3>
                                            <div className="activity-list">
                                                <div className="activity-item">
                                                    <div className="activity-icon likes">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                    </div>
                                                    <span className="activity-label">Likes</span>
                                                    <span className="activity-count">27K</span>
                                                </div>
                                                <div className="activity-item">
                                                    <div className="activity-icon messages">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                                    </div>
                                                    <span className="activity-label">Messages</span>
                                                    <span className="activity-count">18K</span>
                                                </div>
                                                <div className="activity-item">
                                                    <div className="activity-icon views">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                    </div>
                                                    <span className="activity-label">Profile Views</span>
                                                    <span className="activity-count">4.2K</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Links */}
                                    <div className="sidebar-card quick-links-card magic-card tilt-card">
                                        <div className="magic-card-content">
                                            <h3 className="sidebar-card-title">Quick Links</h3>
                                            <div className="quick-links-list">
                                                <a href="#" className="quick-link-item">
                                                    <Camera size={18} /> Add Photos
                                                </a>
                                                <a href="#" className="quick-link-item" onClick={(e) => { e.preventDefault(); navigate('/profile/complete'); }}>
                                                    <UserRoundPen size={18} /> Edit Profile
                                                </a>
                                                <a href="#" className="quick-link-item">
                                                    <Settings size={18} /> Preferences
                                                </a>
                                                <a href="#" className="quick-link-item">
                                                    <CreditCard size={18} /> Upgrade Plan
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </aside>
                    </div>
                </div>
            </main>

            {/* â”€â”€ SERVICES SECTION â”€â”€ */}
            {activeNavTip === 'Home' && <ServicesSection />}

            {/* â”€â”€ FOOTER â”€â”€ */}
            < footer className="hp-footer" >
                <div className="hp-container footer-inner">
                    <p className="footer-copy">Â© 2026 ShubhVivah. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </a>
                    </div>
                </div>
            </footer >
        </div >
    );
};

export default HomePage;

