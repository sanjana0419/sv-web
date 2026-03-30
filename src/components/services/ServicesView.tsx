import React, { useState } from 'react';
import './ServicesView.css';

const servicesList = [
    { id: 1, title: 'E-Invites', icon: '💌', img: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&q=80', active: true },
    { id: 2, title: 'Venues', icon: '🏰', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', active: true },
    { id: 3, title: 'Catering', icon: '🍽️', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', active: true },
    { id: 4, title: 'Photography', icon: '📸', img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80', active: true },
    { id: 5, title: 'Decor', icon: '✨', img: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80', active: true },
    { id: 6, title: 'Jewellery', icon: '💍', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80', active: false },
    { id: 7, title: 'Mehandi', icon: '🌿', img: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=600&q=80', active: false },
    { id: 8, title: 'Makeup', icon: '💄', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', active: false },
    { id: 9, title: 'Honeymoon', icon: '✈️', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', active: false },
    { id: 10, title: 'Event Mgmt', icon: '📋', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', active: false }
];

const ServicesView = () => {
    // Hover state to preview the image on desktop
    const [hoveredService, setHoveredService] = useState(servicesList[0].img);
    const [fadeState, setFadeState] = useState(false);

    const handleServiceHover = (img) => {
        if (hoveredService === img) return;
        setFadeState(true);
        setTimeout(() => {
            setHoveredService(img);
            setFadeState(false);
        }, 300); // match css transition
    };

    return (
        <div className="svd-page-wrapper">

            {/* ── TOP DASHBOARD (Header + Countdown side-by-side on grid) ── */}
            <header className="svd-top-dashboard">
                <div className="svd-header-left">
                    <h1 className="svd-main-title">Premium Services</h1>
                    <p className="svd-main-subtitle">Because every love story deserves perfection.</p>
                    <div className="svd-divider-line"></div>
                    <p className="svd-body-text">
                        Discover a curated collection of elite vendors, heritage venues, and specialized artists to craft your perfect wedding journey.
                    </p>

                    <button className="svd-primary-btn">
                        Explore Catalog <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>

                <div className="svd-header-right">
                    {/* Floating Wedding Countdown Card */}
                    <div className="svd-countdown-card">
                        <div className="svd-cd-top">
                            <div className="svd-cd-text">
                                <span className="svd-cd-label">Wedding Tracker</span>
                                <h2 className="svd-cd-heading">The Big Day Awaits!</h2>
                            </div>

                            <div className="svd-progress-circle">
                                <svg className="svd-circular-chart" viewBox="0 0 36 36">
                                    <path className="svd-circle-bg"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="svd-circle"
                                        strokeDasharray="0, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="svd-progress-text">
                                    <span className="svd-progress-num">0%</span>
                                    <span className="svd-progress-lbl">Done</span>
                                </div>
                            </div>
                        </div>

                        <div className="svd-cd-bottom">
                            <div className="svd-linear-bg">
                                <div className="svd-linear-fill" style={{ width: '0%' }}></div>
                            </div>
                            <div className="svd-linear-lbl">0 of 9 Services Booked</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── RECOMMENDED CARDS (Cinematic Desktop Grid) ── */}
            <section className="svd-recommended-section">
                <div className="svd-section-header">
                    <h3 className="svd-section-title">Recommended</h3>
                </div>

                <div className="svd-cinematic-grid">
                    {/* Card 1 */}
                    <div className="svd-feat-card">
                        <img src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&q=80" alt="E-Invites" />
                        <div className="svd-feat-overlay">
                            <div className="svd-badge gold">Digital</div>
                            <h4 className="svd-feat-title">Premium E-Invites</h4>
                            <p className="svd-feat-desc">Interactive RSVP tracking.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="svd-feat-card">
                        <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80" alt="Venues" />
                        <div className="svd-feat-overlay">
                            <div className="svd-badge silver">Heritage</div>
                            <h4 className="svd-feat-title">Luxury Venues</h4>
                            <p className="svd-feat-desc">Exclusive royal palaces.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="svd-feat-card">
                        <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80" alt="Catering" />
                        <div className="svd-feat-overlay">
                            <div className="svd-badge bronze">Culinary</div>
                            <h4 className="svd-feat-title">Royal Catering</h4>
                            <p className="svd-feat-desc">Global cuisine masterchefs.</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="svd-feat-card">
                        <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80" alt="Photography" />
                        <div className="svd-feat-overlay">
                            <div className="svd-badge gold">Cinematic</div>
                            <h4 className="svd-feat-title">Photography</h4>
                            <p className="svd-feat-desc">Candid & drone specialists.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INTERACTIVE SERVICE DIRECTORY ── */}
            <section className="svd-directory-section">
                <div className="svd-section-header">
                    <h3 className="svd-section-title">All Services</h3>
                    <div className="svd-view-all">View All <span>&rarr;</span></div>
                </div>

                <div className="svd-directory-grid">
                    {/* Left: Text/Icon Grid */}
                    <div className="svd-services-list-grid">
                        {servicesList.map(service => (
                            <div
                                key={service.id}
                                className="svd-service-list-item"
                                onMouseEnter={() => handleServiceHover(service.img)}
                            >
                                <span className="svd-svc-icon">{service.icon}</span>
                                <span className="svd-svc-name">{service.title}</span>
                                <span className="svd-svc-arrow">›</span>
                            </div>
                        ))}
                    </div>
                    {/* Right: Dynamic Preview Image */}
                    <div className="svd-service-preview-pane">
                        <div className="svd-preview-card">
                            <img
                                src={hoveredService}
                                alt="Service Preview"
                                className={`svd-preview-img ${fadeState ? 'fade-out' : 'fade-in'}`}
                            />
                            <div className="svd-preview-overlay">
                                <span className="svd-preview-tag">Preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ── ELITE AGENCIES (50/50 Split Pane) ── */}
            <section className="svd-elite-section">
                <div className="svd-section-header">
                    <h3 className="svd-section-title">Elite Management & Agencies</h3>
                </div>

                <div className="svd-elite-split">
                    {/* Orange Tint Card */}
                    <div className="svd-elite-panel orange-panel">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80" alt="Event Management" />
                        <div className="svd-elite-over">
                            <span className="svd-elite-sup">Orchestrating Grandeur</span>
                            <h4 className="svd-elite-heading">Event<br />Management</h4>
                            <span className="svd-elite-vip">VIP Experience</span>
                        </div>
                    </div>

                    {/* Standard Elite Card */}
                    <div className="svd-elite-panel dark-panel">
                        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=80" alt="Agencies" />
                        <div className="svd-elite-over">
                            <span className="svd-elite-sup">Global Network</span>
                            <h4 className="svd-elite-heading">Premium<br />Agencies</h4>

                            <button className="svd-elite-circular-btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UPCOMING SERVICES ── */}
            <section className="svd-upcoming-section">
                <div className="svd-section-header">
                    <h3 className="svd-section-title">Upcoming Services</h3>
                </div>

                <div className="svd-upcoming-grid">
                    <div className="svd-upcoming-card">
                        <div className="svd-upc-icon">🚁</div>
                        <div className="svd-upc-info">
                            <h4>Charter Helicopters</h4>
                            <p>Premium aerial arrivals for the grand entry.</p>
                            <span className="svd-upc-tag">Coming Soon</span>
                        </div>
                    </div>

                    <div className="svd-upcoming-card">
                        <div className="svd-upc-icon">🎻</div>
                        <div className="svd-upc-info">
                            <h4>International Artists</h4>
                            <p>Global symphony orchestras and performers.</p>
                            <span className="svd-upc-tag">In Pipeline</span>
                        </div>
                    </div>

                    <div className="svd-upcoming-card">
                        <div className="svd-upc-icon">👗</div>
                        <div className="svd-upc-info">
                            <h4>Couture Rentals</h4>
                            <p>Rent authentic designer bridal trousseau.</p>
                            <span className="svd-upc-tag">Beta Testing</span>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ height: '80px' }}></div>
        </div>
    );
};

export default ServicesView;
