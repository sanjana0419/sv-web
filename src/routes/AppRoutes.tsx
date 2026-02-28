import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/auth/LandingPage';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import HomePage from '../pages/index';
import AuthContainer from '../pages/auth/AuthContainer';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthContainer />} />
                <Route path="/auth/*" element={<AuthContainer />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
