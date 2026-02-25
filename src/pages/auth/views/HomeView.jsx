import React from 'react';
import logoImg from '../../../assets/auth/logo_v2.png';

const HomeView = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#FFFFE4',
            textAlign: 'center',
            padding: '20px'
        }}>
            <img
                src={logoImg}
                alt="Shubh Vivah Logo"
                style={{
                    width: '180px',
                    marginBottom: '40px',
                    opacity: '0.9'
                }}
            />
            <h1 style={{
                color: '#cb1111',
                fontSize: '64px',
                fontWeight: '800',
                fontFamily: "'Playfair Display', serif",
                margin: '0',
                letterSpacing: '2px'
            }}>
                Coming Soon
            </h1>
            <div style={{
                width: '60px',
                height: '2px',
                backgroundColor: '#D4AF37',
                margin: '30px 0'
            }}></div>
            <p style={{
                color: '#3E2723',
                fontSize: '18px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: '500',
                letterSpacing: '1px',
                opacity: '0.7'
            }}>
                Where meaningful matches begin.
            </p>
        </div>
    );
};

export default HomeView;
