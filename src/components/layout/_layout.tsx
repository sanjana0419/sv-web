import React from 'react';
import { Home, MessageSquare, Users, Compass, User, Bell, MapPin } from 'lucide-react';
import { AUTH_VIEWS } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/auth/logo_v2.png';

export const Sidebar: React.FC = () => {
    return (
        <div className="home-sidebar">
            <img src={logoImg} alt="Shubh Vivah" className="sidebar-logo" />
            <nav className="sidebar-nav">
                <a href="#" className="nav-item active">
                    <Home size={20} />
                    <span>Home</span>
                </a>
                <a href="#" className="nav-item">
                    <MessageSquare size={20} />
                    <span>Messages</span>
                </a>
                <a href="#" className="nav-item">
                    <Users size={20} />
                    <span>Community</span>
                </a>
                <a href="#" className="nav-item">
                    <Compass size={20} />
                    <span>Discover</span>
                </a>
                <a href="#" className="nav-item">
                    <User size={20} />
                    <span>Profile</span>
                </a>
            </nav>
        </div>
    );
};

export const TopHeader: React.FC = () => {
    return (
        <div className="home-header">
            <div className="user-welcome">
                <h2>Good Morning, Hello User</h2>
                <p><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Set your location</p>
            </div>
            <div className="header-actions">
                <div className="notification-bell">
                    <Bell size={20} />
                    <span className="notif-badge"></span>
                </div>
                <img src="https://ui-avatars.com/api/?name=User&background=cb1111&color=fff" alt="User Profile" className="user-profile-thumb" />
            </div>
        </div>
    );
};
