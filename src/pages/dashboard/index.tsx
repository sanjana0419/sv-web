import React, { useEffect } from 'react';
import Header from '../home/components/Header';
import MatchCard from '../home/components/MatchCard';
import StatsBar from '../home/components/StatsBar';
import ProfileCompletion from '../home/components/ProfileCompletion';
import DiscoveryMap from '../home/components/DiscoveryMap';
import KundaliSection from '../home/components/KundaliSection';
import Rellax from 'rellax';

const Dashboard = () => {
    useEffect(() => {
        const rellax = new Rellax('.rellax', {
            center: true
        });
        return () => rellax.destroy();
    }, []);

    const matches = [
        {
            name: "Priya Sharma",
            age: 24,
            city: "Indore",
            matchPercentage: 94,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            tags: ["Same City", "Similar Age"]
        },
        {
            name: "Anjali Gupta",
            age: 23,
            city: "Bhopal",
            matchPercentage: 88,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            tags: ["Marathi", "Engineer"]
        },
        {
            name: "Sneha Patel",
            age: 25,
            city: "Nagpur",
            matchPercentage: 91,
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            tags: ["Same City", "Veg"]
        }
    ];

    return (
        <div className="dashboard">
            <div className="bg-orbs">
                <div className="bg-orb orb-1 rellax" data-rellax-speed="-2"></div>
                <div className="bg-orb orb-2 rellax" data-rellax-speed="-4"></div>
                <div className="bg-orb orb-3 rellax" data-rellax-speed="-3"></div>
                <div className="bg-orb orb-4 rellax" data-rellax-speed="-5"></div>
            </div>

            <Header />

            <div className="dashboard-content">
                <div className="greeting-hero">
                    <span className="greeting-float g-float-1">💒</span>
                    <span className="greeting-float g-float-2">💍</span>
                    <span className="greeting-float g-float-3">✨</span>
                    <div className="greeting-content">
                        <div className="greeting-text">
                            <h2>Welcome back, Pruthvi! 👋</h2>
                            <p>You have 5 new match suggestions and 3 pending requests today.</p>
                        </div>
                        <div className="greeting-stats">
                            <div className="g-stat">
                                <span className="g-stat-number">94%</span>
                                <span className="g-stat-label">Top Match</span>
                            </div>
                            <div className="g-stat">
                                <span className="g-stat-number">12</span>
                                <span className="g-stat-label">New Interests</span>
                            </div>
                            <div className="g-stat">
                                <span className="g-stat-number">48</span>
                                <span className="g-stat-label">Profile Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                <StatsBar />

                <section className="section-heading">
                    <h2>Today's Best Matches</h2>
                    <span className="see-all">See All →</span>
                </section>

                <div className="match-cards-row">
                    {matches.map((match, index) => (
                        <MatchCard key={index} match={match} index={index} />
                    ))}
                </div>

                <div className="two-col-grid">
                    <ProfileCompletion />
                    <DiscoveryMap />
                </div>

                <KundaliSection />
            </div>
        </div>
    );
};

export default Dashboard;
