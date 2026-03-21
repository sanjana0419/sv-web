import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import HomePage from '../pages/home/Home';
import DashboardPage from '../pages/home/components/Dashboard';
import AuthContainer from '../pages/auth/AuthContainer';
import { AuthProvider } from '../context/AuthContext';
import { ProfileProvider } from '../context/ProfileContext';
import ServicesPage from '../pages/services/ServicesPage';
import CateringPage from '../pages/services/CateringPage';
import VenuePage from '../pages/services/VenuePage';
import DecorPage from '../pages/services/DecorPage';
import JewelleryPage from '../pages/services/JewelleryPage';
import MehendiPage from '../pages/services/MehendiPage';
import InvitationPage from '../pages/services/InvitationPage';
import MatchesPage from '../pages/matches/MatchesPage';
import MatchProfilePage from '../pages/matches/MatchProfilePage';
import MessagesPage from '../pages/messages/MessagesPage';
import CallsPage from '../pages/calls/CallsPage';
import ContactsPage from '../pages/contacts/ContactsPage';
import NotificationsPage from '../pages/notifications';
import ProfilePage from '../pages/profile/ProfilePage';
import ProfileCompletionForm from '../pages/profile/complete-profile/ProfileCompletionForm';

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <ProfileProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AuthContainer />} />
                        <Route path="/auth/*" element={<AuthContainer />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/catering" element={<CateringPage />} />
                        <Route path="/services/venue" element={<VenuePage />} />
                        <Route path="/services/decor" element={<DecorPage />} />
                        <Route path="/services/jewellery" element={<JewelleryPage />} />
                        <Route path="/services/mehendi" element={<MehendiPage />} />
                        <Route path="/services/invitation" element={<InvitationPage />} />
                        <Route path="/matches" element={<MatchesPage />} />
                        <Route path="/matches/:id" element={<MatchProfilePage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/messages/:id" element={<MessagesPage />} />
                        <Route path="/calls" element={<CallsPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/complete" element={<ProfileCompletionForm />} />
                        <Route path="/explore" element={<HomePage />} />
                        <Route path="/settings" element={<ProfilePage />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </BrowserRouter>
            </ProfileProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
