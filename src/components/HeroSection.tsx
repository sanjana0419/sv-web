import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);


    return (
        <section className={`hero-section ${isVisible ? 'hero-visible' : ''}`}>
            {/* Glassmorphism background layers */}
            <div className="hero-glass-bg">
                <div className="hero-glass-blob blob-a"></div>
                <div className="hero-glass-blob blob-b"></div>
                <div className="hero-glass-blob blob-c"></div>
                <div className="hero-glass-circle circle-1"></div>
                <div className="hero-glass-circle circle-2"></div>
                <div className="hero-glass-circle circle-3"></div>
            </div>

            {/* Top Navigation */}
            <nav className="hero-nav">
                <div className="hero-nav-inner">
                    <div className="hero-logo">
                        <span className="logo-icon">💒</span>
                        <span className="logo-text">ShubhVivah</span>
                    </div>
                    <div className="hero-nav-links">
                        <a href="#" className="nav-link active">Home</a>
                        <a href="#" className="nav-link">Matches</a>
                        <a href="#" className="nav-link">Profiles</a>
                        <a href="#" className="nav-link">Kundali</a>
                        <a href="#" className="nav-link">About</a>
                    </div>
                    <div className="hero-nav-actions">
                        <button className="nav-login-btn">Log In</button>
                        <button className="nav-register-btn">Register</button>
                    </div>
                </div>
            </nav>

            <div className="hero-container">
                {/* ====== LEFT SIDE ====== */}
                <div className="hero-left">
                    <span className="hero-tagline">Because you deserve the best!</span>

                    <h1 className="hero-heading">
                        Find your <span className="text-gold">perfect match,</span>{' '}
                        not just a{' '}
                        <span className="text-crimson">profile.</span>
                    </h1>

                    <p className="hero-description">
                        You're more than just a photo. Your values, traditions, and dreams matter.
                        With Kundali matching, verified profiles, and AI-powered compatibility —
                        find the partner your family will love.
                    </p>

                    <div className="hero-cta-row">
                        <div className="hero-input-group">
                            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input type="email" placeholder="Enter your email" className="hero-input" />
                        </div>
                        <button className="hero-cta-btn">
                            <span>Get Started</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats-row">
                        <div className="hero-stat">
                            <span className="hero-stat-number">15K+</span>
                            <span className="hero-stat-label">Matches &amp; connections made everyday</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">1,456</span>
                            <span className="hero-stat-label">New profiles signup every day</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">1M+</span>
                            <span className="hero-stat-label">Families from across India</span>
                        </div>
                    </div>
                </div>

                {/* ====== RIGHT SIDE — 3D CSS Couple ====== */}
                <div className="hero-right">
                    <div className="hero-couple-scene">
                        {/* Replaced 3D CSS couple with image */}
                        <div className="couple-glow-ring"></div>
                        <img
                            src="https://images.unsplash.com/photo-1583934555083-b56578492058?w=800&auto=format&fit=crop&q=60"
                            alt="Indian Wedding Couple"
                            className="hero-couple-img"
                        />
                    </div>

                    {/* Floating decorative icons */}
                    <div className="float-icon float-heart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e74c3c">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>

                    <div className="float-icon float-ring">
                        <span>💍</span>
                    </div>

                    <div className="float-icon float-camera">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                        </svg>
                    </div>

                    <div className="float-icon float-star">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#d4a853">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>

                    {/* Filter Tags */}
                    <div className="float-tags">
                        <span className="float-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>
                            Hindu
                        </span>
                        <span className="float-tag tag-highlight">25-30 Years</span>
                        <span className="float-tag">Nagpur</span>
                    </div>

                    {/* Profile Card */}
                    <div className="float-profile-card card-1">
                        <div className="float-profile-avatar">P</div>
                        <div className="float-profile-info">
                            <span className="float-profile-name">Priya Sharma</span>
                            <span className="float-profile-city">Indore, MP</span>
                        </div>
                        <button className="float-select-btn">Select</button>
                    </div>

                    <div className="float-profile-card card-2">
                        <div className="float-profile-avatar avatar-blue">A</div>
                        <div className="float-profile-info">
                            <span className="float-profile-name">Anjali Gupta</span>
                            <span className="float-profile-city">Bhopal, MP</span>
                        </div>
                        <button className="float-select-btn">Select</button>
                    </div>

                    {/* Premium Card */}
                    <div className="float-premium-card">
                        <div className="premium-card-shine"></div>
                        <div className="premium-card-label">MEMBERSHIP ID</div>
                        <div className="premium-card-number">3829 4820 4629 5025</div>
                        <div className="premium-card-bottom">
                            <div>
                                <span className="premium-card-label-sm">MEMBER NAME</span>
                                <span className="premium-card-value">Pruthvi</span>
                            </div>
                            <div>
                                <span className="premium-card-label-sm">VALID THRU</span>
                                <span className="premium-card-value">12/27</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
