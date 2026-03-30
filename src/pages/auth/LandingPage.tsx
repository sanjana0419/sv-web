import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import logoImg from '../../assets/auth/logo_v2.png';
import weddingBg from '../../assets/auth/wedding.jpeg';

interface LandingPageProps {
    onComplete?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onComplete }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            } else {
                navigate('/login');
            }
        }, 2000); // Shorter for better responsiveness
        return () => clearTimeout(timer);
    }, [onComplete, navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-bg">
                <img src={weddingBg} alt="Wedding Background" className="splash-bg-img" />
                <div className="splash-overlay"></div>
            </div>

            <div className="splash-content">
                <div className="logo-container">
                    <img src={logoImg} alt="Shubh Vivah Logo" className="splash-logo" />
                </div>
                <div className="splash-text-area">
                    <h2 className="splash-tagline">Connecting Hearts, Celebrating Traditions</h2>
                    <div className="splash-loader-container">
                        <div className="splash-loader-bar"></div>
                    </div>
                </div>
            </div>

            <div className="splash-footer">
                <p>© 2026 Shubh Vivah Matrimony</p>
            </div>
        </div>
    );
};

export default LandingPage;
