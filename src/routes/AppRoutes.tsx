import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import HomePage from '../pages/home/Home';
import AuthContainer from '../pages/auth/AuthContainer';
import { AuthProvider } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthContainer />} />
                    <Route path="/auth/*" element={<AuthContainer />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default AppRoutes;
