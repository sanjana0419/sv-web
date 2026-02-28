import React, { Suspense, lazy, useRef, useEffect, useState, useMemo } from 'react';
import '../../styles/auth.css';
import logoImg from '../../assets/auth/logo_v2.png';
import kalashImg from '../../assets/auth/kalash.png';
import haldiKumkumImg from '../../assets/auth/haldikumkum.png';
import { AuthProvider, AUTH_VIEWS, AuthView } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';

// React.lazy — code-split each view for on-demand loading
const LoginView = lazy(() => import('./login'));
const SignupView = lazy(() => import('./register'));
const ForgotPasswordView = lazy(() => import('./forgot-password'));
const OtpView = lazy(() => import('./otp'));
const ResetPasswordView = lazy(() => import('./ResetPassword'));
const CreatePasswordView = lazy(() => import('./CreatePassword'));
const HomeView = lazy(() => import('../index'));

// View component map — avoids switch statements
const VIEW_COMPONENTS: Record<AuthView, React.LazyExoticComponent<React.ComponentType<any>>> = {
    [AUTH_VIEWS.LOGIN]: LoginView,
    [AUTH_VIEWS.SIGNUP]: SignupView,
    [AUTH_VIEWS.FORGOT_PASSWORD]: ForgotPasswordView,
    [AUTH_VIEWS.OTP_LOGIN]: OtpView,
    [AUTH_VIEWS.OTP_SIGNUP]: OtpView,
    [AUTH_VIEWS.OTP_FORGOT]: OtpView,
    [AUTH_VIEWS.RESET_PASSWORD]: ResetPasswordView,
    [AUTH_VIEWS.CREATE_PASSWORD]: CreatePasswordView,
    [AUTH_VIEWS.HOME]: HomeView,
};

// Loading fallback for Suspense
const ViewLoader = () => (
    <div className="view-loader">
        <div className="view-loader-spinner"></div>
    </div>
);

// Inner component that consumes AuthContext
const AuthContent = () => {
    const { view, prevView } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);
    const [animClass, setAnimClass] = useState('view-enter');

    // Animated transitions on view change
    useEffect(() => {
        if (!prevView) return;

        setAnimClass('view-exit');

        const timer = setTimeout(() => {
            setAnimClass('view-enter');
        }, 200);

        return () => clearTimeout(timer);
    }, [view, prevView]);

    // Memoize the active view component to avoid unnecessary re-renders
    const ActiveView = useMemo(() => (VIEW_COMPONENTS[view] || LoginView) as React.LazyExoticComponent<React.ComponentType<any>>, [view]);

    // Full-page Home view (bypass the auth card structure)
    if (view === AUTH_VIEWS.HOME) {
        return (
            <div className="home-full-page-container">
                <Suspense fallback={<ViewLoader />}>
                    <ActiveView />
                </Suspense>
            </div>
        );
    }

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                {/* Left: Transparent cutout to reveal the single background wedding image */}
                <div className="auth-left"></div>

                {/* Right: The premium form panel with Figma-spec background */}
                <div className="auth-right">
                    {/* Background decoration: kalash (center-top), haldi (bottom-left), kumkum (bottom-right) */}
                    <div className="auth-right-deco">
                        <img src={kalashImg} alt="" className="deco-kalash-bg" />
                        <img src={haldiKumkumImg} alt="" className="deco-haldi-bg" />
                        <img src={haldiKumkumImg} alt="" className="deco-kumkum-bg" />
                    </div>
                    <div className="auth-header">
                        <img src={logoImg} alt="Logo" className="auth-logo-small" />
                        <div className="auth-lang">EN | HI</div>
                    </div>
                    <div ref={containerRef} className={`auth-form-container ${animClass}`}>
                        <Suspense fallback={<ViewLoader />}>
                            <ActiveView />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Root component wraps with AuthProvider
const AuthContainer = () => (
    <AuthProvider>
        <AuthContent />
    </AuthProvider>
);

export default AuthContainer;
