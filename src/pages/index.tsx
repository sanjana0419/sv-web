import React from 'react';
import '../styles/home.css';
import { Sidebar, TopHeader } from '../components/layout/_layout';
import { Search, Filter, Camera, Palette, Music, MapPin, CheckCircle } from 'lucide-react';
import {
    HeroBanner,
    QuickStats,
    ServiceCard,
    ProfileHealth,
    RecommendationCard,
    JourneyCard,
    MatchProfileCard,
    VendorHighlight,
    CommunitySnippet,
    ProfileQuickEdit
} from '../components/dashboard/ActivitySummary';

const HomeView = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <main className="home-main">
                <TopHeader />

                {/* Section: Search & Filter (New App Feature) */}
                <div className="search-filter-wrapper" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                    <div className="search-input-group" style={{
                        flex: 1,
                        background: '#fff',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 20px',
                        boxShadow: 'var(--shadow-soft)',
                        border: '1px solid rgba(212, 175, 55, 0.1)'
                    }}>
                        <Search size={18} color="#D4AF37" />
                        <input
                            type="text"
                            placeholder="Search by community, profession, or location..."
                            style={{ border: 'none', padding: '15px', width: '100%', outline: 'none', fontSize: '14px' }}
                        />
                    </div>
                    <button className="filter-btn" style={{
                        background: '#fff',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        padding: '0 20px',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-soft)'
                    }}>
                        <Filter size={18} />
                        <span style={{ fontWeight: '600' }}>Filters</span>
                    </button>
                </div>

                <div className="dashboard-grid">
                    <div className="main-panel">
                        <HeroBanner />
                        <QuickStats />

                        {/* Section 1: Today's Best Match */}
                        <div style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#3E2723', margin: 0 }}>Today's Best Match</h3>
                                <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', color: '#fff', fontSize: '10px', padding: '4px 12px', borderRadius: '15px', fontWeight: '700' }}>DAILY PICK</span>
                            </div>
                            <div style={{
                                background: '#fff',
                                padding: '30px',
                                borderRadius: '22px',
                                display: 'flex',
                                gap: '30px',
                                boxShadow: 'var(--shadow-soft)',
                                border: '1px solid rgba(212, 175, 55, 0.1)'
                            }}>
                                <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--accent-gold)', overflow: 'hidden', flexShrink: 0 }}>
                                    <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=300" alt="Priya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <h4 style={{ fontSize: '24px', margin: '0', color: '#3E2723' }}>Priya Sharma, 26</h4>
                                        <CheckCircle size={18} color="#00C853" />
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', margin: '5px 0 15px' }}>Mumbai, Maharashtra • Software Engineer</p>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-gold)' }}>★ KUNDALI MATCHED</span>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-maroon)' }}>92% MATCH</span>
                                    </div>
                                    <button style={{ background: 'var(--accent-gold)', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '50px', marginTop: '15px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)' }}>View Full Profile</button>
                                </div>
                            </div>
                        </div>

                        {/* Section: Vendor Spotlight (App Feature) */}
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '20px', color: '#3E2723' }}>Wedding Services</h3>
                            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                                <VendorHighlight icon={<Camera size={24} />} title="Photography" count="245" />
                                <VendorHighlight icon={<Palette size={24} />} title="Makeup" count="182" />
                                <VendorHighlight icon={<Music size={24} />} title="Music & DJ" count="94" />
                                <VendorHighlight icon={<MapPin size={24} />} title="Venues" count="156" />
                            </div>
                        </div>

                        {/* Section 2: Wedding Journey */}
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '5px', color: '#3E2723' }}>Your Wedding Journey</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '25px' }}>Let us help you every step of the way</p>
                            <div className="journey-grid">
                                <JourneyCard
                                    title="Verified Matchmaking"
                                    description="profiles filtered with culture and trust."
                                    image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=300"
                                />
                                <JourneyCard
                                    title="Expert Astrology"
                                    description="Free 1:1 consultation with verified experts."
                                    image="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=300"
                                />
                                <JourneyCard
                                    title="Premium Vendors"
                                    description="Mehendi, Makeup and Photography specialists."
                                    image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=300"
                                />
                                <JourneyCard
                                    title="Planning Support"
                                    description="End to end coordination for your big day."
                                    image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300"
                                />
                            </div>
                        </div>

                        {/* Section 3: People You May Like */}
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '20px', color: '#3E2723' }}>Recommended for You</h3>
                            <div className="matches-grid">
                                <MatchProfileCard name="Ananya" age="24" location="Mumbai" matchPct="95" image="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=300" />
                                <MatchProfileCard name="Neha" age="25" location="Delhi" matchPct="92" image="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=300" />
                                <MatchProfileCard name="Sneha" age="27" location="Pune" matchPct="88" image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300" />
                                <MatchProfileCard name="Riya" age="23" location="Bangalore" matchPct="85" image="https://images.unsplash.com/photo-1621184414184-0138c0dec333?auto=format&fit=crop&q=80&w=300" />
                            </div>
                        </div>
                    </div>

                    <div className="side-panel">
                        <ProfileHealth />

                        {/* New Feature: Edit Profile & Trust Score */}
                        <ProfileQuickEdit />

                        <div style={{ marginTop: '30px' }}>
                            <h4 style={{ color: '#3E2723', fontSize: '16px', marginBottom: '15px' }}>Community Updates</h4>
                            <CommunitySnippet user="Karan J." text="Found my perfect match here! The Kundali matching was really helpful." time="1h ago" />
                            <CommunitySnippet user="Sonal M." text="Just booked our reception venue through Shubh Vivah vendors. Great experience!" time="4h ago" />
                            <a href="#" style={{ display: 'block', textAlign: 'center', color: 'var(--primary-maroon)', fontSize: '12px', fontWeight: '600', textDecoration: 'none', marginTop: '10px' }}>View All Activity</a>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <RecommendationCard />
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', marginBottom: '20px', color: '#3E2723' }}>Events and More</h4>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                <ServiceCard
                                    title="Royal Reception"
                                    description="RSVP & Guest list management tools."
                                    image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=300"
                                />
                                <ServiceCard
                                    title="Destinations"
                                    description="Luxury honeymoon getaways curated for you."
                                    image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomeView;
