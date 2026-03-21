import React, { useState, useEffect, useRef } from 'react';
import './StatsBar.css';

interface Stat {
    icon: React.ReactNode;
    count: number;
    label: string;
    color: string;
    gradient: string;
}

const StatsBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const stats: Stat[] = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            count: 48,
            label: "Likes Received",
            color: "#c62848",
            gradient: "linear-gradient(135deg, #fef2f2, #fde8e8)"
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
            count: 320,
            label: "Profile Views",
            color: "#d4a853",
            gradient: "linear-gradient(135deg, #fef9f0, #fdf3e0)"
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
            count: 12,
            label: "Messages",
            color: "#6c5ce7",
            gradient: "linear-gradient(135deg, #f3f0ff, #ede9fe)"
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
            ),
            count: 67,
            label: "Shortlisted",
            color: "#00b894",
            gradient: "linear-gradient(135deg, #f0fdf4, #dcfce7)"
        }
    ];

    return (
        <div className={`stats-3d-row ${isVisible ? 'stats-visible' : ''}`} ref={ref}>
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="stat-cube"
                    style={{
                        '--stat-color': stat.color,
                        '--stat-gradient': stat.gradient,
                        animationDelay: `${i * 0.1}s`
                    } as React.CSSProperties}
                >
                    <div className="cube-front">
                        <div className="cube-icon">{stat.icon}</div>
                        <span className="cube-count">{stat.count}</span>
                        <span className="cube-label">{stat.label}</span>
                    </div>
                    <div className="cube-top"></div>
                    <div className="cube-right"></div>
                </div>
            ))}
        </div>
    );
};

export default StatsBar;
