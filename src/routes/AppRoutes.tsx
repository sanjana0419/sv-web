import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import HomePage from '../pages/home/HomePage';
import DashboardPage from '../pages/dashboard';
import AuthContainer from '../pages/auth/AuthContainer';
import { AuthProvider } from '../context/AuthContext';
import { ProfileProvider } from '../context/ProfileContext';
import ServicesView from '../pages/servicesforuser/ServicesView';
import MatchesPage from '../pages/matches';
import MatchProfilePage from '../pages/matches/MatchProfilePage';
import MessagesPage from '../pages/messages/MessagingSystem';
import CallsPage from '../pages/calls';
import ContactsPage from '../pages/contacts';
import NotificationsPage from '../pages/notifications';
import ProfilePage from '../pages/profile/ProfilePage';
import ProfileCompletionForm from '../pages/profile/complete-profile/ProfileCompletionForm';

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <ProfileProvider>
                <Routes>
                    {/* Splash Screen First */}
                    <Route path="/" element={<LandingPage />} />
                    
                    {/* Auth Area */}
                    <Route path="/login" element={<AuthContainer />} />
                    <Route path="/register" element={<AuthContainer />} />
                    <Route path="/auth/*" element={<AuthContainer />} />
                    
                    {/* Main Protected Area */}
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/services/*" element={<ServicesView />} />
                    <Route path="/matches" element={<MatchesPage />} />
                    <Route path="/matches/:id" element={<MatchProfilePage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/messages/:id" element={<MessagesPage />} />
                    <Route path="/calls" element={<CallsPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/complete" element={<ProfileCompletionForm />} />
                    
                    {/* Other Layout Mappings */}
                    <Route path="/explore" element={<HomePage />} />
                    <Route path="/settings" element={<ProfilePage />} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProfileProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
