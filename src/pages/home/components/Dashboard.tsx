import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './Header';
import MatchCard from './MatchCard';
import StatsBar from './StatsBar';
import ProfileCompletion from './ProfileCompletion';
import DiscoveryMap from './DiscoveryMap';
import KundaliSection from './KundaliSection';
import './Dashboard.css';

interface Match {
    name: string;
    age: number;
    city: string;
    matchPercentage: number;
    image: string;
    tags: string[];
}

interface DashboardProps {
    onNavigate?: (page: 'home' | 'dashboard') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { scrollY } = useScroll();
    
    // Parallax effects for background orbs using Framer Motion
    const orb1Y = useTransform(scrollY, [0, 1000], [0, -200]);
    const orb2Y = useTransform(scrollY, [0, 1000], [0, -400]);
    const orb3Y = useTransform(scrollY, [0, 1000], [0, -300]);
    const orb4Y = useTransform(scrollY, [0, 1000], [0, -500]);

    const matches: Match[] = [
        {
            name: "Priya Sharma",
            age: 24,
            city: "Indore",
            matchPercentage: 94,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1-auto-format&fit=crop&w=400&q=80",
            tags: ["Same City", "Similar Age"]
        },
        {
            name: "Anjali Gupta",
            age: 23,
            city: "Bhopal",
            matchPercentage: 88,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1-auto-format&fit=crop&w=400&q=80",
            tags: ["Marathi", "Engineer"]
        },
        {
            name: "Sneha Patel",
            age: 25,
            city: "Nagpur",
            matchPercentage: 91,
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1-auto-format&fit=crop&w=400&q=80",
            tags: ["Same City", "Veg"]
        }
    ];

    return (
        <div className="dashboard-wrapper">
            {/* Background orbs with Framer Motion Parallax */}
            <div className="bg-orbs">
                <motion.div className="bg-orb orb-1" style={{ y: orb1Y }}></motion.div>
                <motion.div className="bg-orb orb-2" style={{ y: orb2Y }}></motion.div>
                <motion.div className="bg-orb orb-3" style={{ y: orb3Y }}></motion.div>
                <motion.div className="bg-orb orb-4" style={{ y: orb4Y }}></motion.div>
            </div>

            {/* Sticky header */}
            <Header onNavigate={onNavigate} />

            {/* Dashboard Content */}
            <div className="dashboard-content-main">
                {/* Greeting Hero */}
                <div className="greeting-hero-section">
                    <div className="greeting-float g-float-1">💒</div>
                    <div className="greeting-float g-float-2">💍</div>
                    <div className="greeting-float g-float-3">✨</div>
                    <div className="greeting-content-box">
                        <div className="greeting-text">
                            <h2>Welcome back, Pruthvi! 👋</h2>
                            <p>You have 5 new match suggestions and 3 pending requests today.</p>
                        </div>
                        <div className="greeting-stats-grid">
                            <div className="g-stat-item">
                                <span className="g-stat-number">94%</span>
                                <span className="g-stat-label">Top Match</span>
                            </div>
                            <div className="g-stat-item">
                                <span className="g-stat-number">12</span>
                                <span className="g-stat-label">New Interests</span>
                            </div>
                            <div className="g-stat-item">
                                <span className="g-stat-number">48</span>
                                <span className="g-stat-label">Profile Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="dashboard-stats-row">
                    <StatsBar />
                </div>

                {/* Matches */}
                <div className="section-header-row">
                    <h2>Today's Best Matches</h2>
                    <span className="see-all-link">See All →</span>
                </div>

                <div className="match-cards-row-grid">
                    {matches.map((match, index) => (
                        <MatchCard key={index} match={match} index={index} />
                    ))}
                </div>

                {/* Profile + Discovery side by side */}
                <div className="two-column-dashboard-grid">
                    <ProfileCompletion />
                    <DiscoveryMap />
                </div>

                {/* Kundali */}
                <KundaliSection />
            </div>
        </div>
    );
};

export default Dashboard;
