import React from 'react';
import { MessageSquare, Eye, Heart, Star, ChevronRight, Sparkles } from 'lucide-react';

export const HeroBanner = () => (
    <div className="hero-banner">
        <div className="hero-content">
            <h1>Find Your Forever</h1>
            <p>Matches curated with culture & trust</p>
        </div>
    </div>
);

export const QuickStats = () => (
    <div className="stats-container">
        <StatItem icon={<MessageSquare size={20} />} count="3" label="Messages" color="#e3f2fd" iconColor="#1976d2" />
        <StatItem icon={<Eye size={20} />} count="12" label="Views" color="#f3e5f5" iconColor="#7b1fa2" />
        <StatItem icon={<Heart size={20} />} count="5" label="Interests" color="#fff3e0" iconColor="#f57c00" />
        <StatItem icon={<Star size={20} />} count="8" label="Shortlisted" color="#e8f5e9" iconColor="#388e3c" />
    </div>
);

const StatItem = ({ icon, count, label, color, iconColor }: any) => (
    <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: color, color: iconColor }}>
            {icon}
        </div>
        <div className="stat-info">
            <h3>{count}</h3>
            <p>{label}</p>
        </div>
    </div>
);

export const ServiceCard = ({ title, description, image }: any) => (
    <div className="service-card">
        <div className="service-img-frame">
            <img src={image} alt={title} />
        </div>
        <div className="service-info">
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    </div>
);

export const ProfileHealth = () => (
    <div className="health-card">
        <div className="health-header">
            <h4>Profile Health</h4>
            <span className="health-pct">15%</span>
        </div>
        <div className="progress-bar-bg">
            <div className="progress-fill"></div>
        </div>
        <p style={{ fontSize: '12px', color: '#7D6B5D', margin: '0' }}>Start by adding your basic details</p>
        <a href="#" className="complete-now-btn">Complete Now <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></a>
    </div>
);

export const RecommendationCard = () => (
    <div className="recommendation-card">
        <h5>AI Recommendation</h5>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%' }}>
                <Sparkles size={24} />
            </div>
            <p>
                Based on your activity, we recommend you message <span className="match-name">Priya (91% match)</span>
            </p>
        </div>
    </div>
);

export const JourneyCard = ({ title, description, image }: any) => (
    <div className="journey-card">
        <div className="journey-img-frame">
            <img src={image} alt={title} />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
    </div>
);

export const MatchProfileCard = ({ name, age, location, matchPct, image }: any) => (
    <div className="match-profile-card" style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none', border: 'none' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 10px' }}>
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid var(--accent-gold)',
                overflow: 'hidden'
            }}>
                <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
                position: 'absolute',
                bottom: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary-maroon)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '10px',
                whiteSpace: 'nowrap'
            }}>
                {matchPct}% Match
            </div>
        </div>
        <h5 style={{ fontSize: '16px', margin: '0', color: 'var(--text-dark)' }}>{name}, {age}</h5>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0' }}>{location}</p>
        <a href="#" style={{ fontSize: '11px', color: 'var(--primary-maroon)', fontWeight: '600', textDecoration: 'none' }}>Why this match?</a>
    </div>
);

export const EventGalleryCard = ({ title, date, image }: any) => (
    <div className="event-card">
        <img src={image} alt={title} className="event-img" />
        <div className="event-details">
            <h5>{title}</h5>
            <p className="event-date">{date}</p>
        </div>
    </div>
);

export const VendorHighlight = ({ icon, title, count }: any) => (
    <div className="vendor-card">
        <div className="vendor-icon-circle">
            {icon}
        </div>
        <h5 style={{ margin: '0 0 5px', fontSize: '16px', color: 'var(--text-dark)' }}>{title}</h5>
        <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-muted)' }}>{count} Verified Vendors</p>
    </div>
);

export const CommunitySnippet = ({ user, text, time }: any) => (
    <div className="community-post">
        <div className="post-header">
            <img src={`https://ui-avatars.com/api/?name=${user}&background=random`} className="post-user-img" alt={user} />
            <div>
                <h6 style={{ margin: '0', fontSize: '14px', color: 'var(--text-dark)' }}>{user}</h6>
                <p style={{ margin: '0', fontSize: '10px', color: 'var(--text-muted)' }}>{time}</p>
            </div>
        </div>
        <p className="post-content">{text}</p>
    </div>
);

export const ProfileQuickEdit = () => (
    <div className="health-card" style={{ marginTop: '25px' }}>
        <h4 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '15px' }}>Complete Your Profile</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ padding: '10px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0' }}>Photos Added</p>
                <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-maroon)', margin: '0' }}>0/5</p>
            </div>
            <div style={{ padding: '10px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0' }}>Trust Score</p>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#00C853', margin: '0' }}>Low</p>
            </div>
        </div>
        <button style={{
            width: '100%',
            background: 'var(--primary-maroon)',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            marginTop: '15px',
            fontWeight: '600',
            cursor: 'pointer'
        }}>
            Edit Profile Details
        </button>
    </div>
);
