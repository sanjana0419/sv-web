import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_VIEWS, AuthView } from '../../context/AuthContext';
import { useOtpInput } from '../../hooks/useOtpInput';
import dividerImg from '../../assets/auth/divider.png';

const OTP_BACK_MAP: Partial<Record<AuthView, AuthView>> = {
    [AUTH_VIEWS.OTP_LOGIN]: AUTH_VIEWS.LOGIN,
    [AUTH_VIEWS.OTP_SIGNUP]: AUTH_VIEWS.SIGNUP,
    [AUTH_VIEWS.OTP_FORGOT]: AUTH_VIEWS.FORGOT_PASSWORD,
};

const OtpVerification = () => {
    const { view, navigate, formData, isSubmitting, setSubmitting } = useAuth();
    const routerNavigate = useNavigate();
    const { otpRefs, otp, handleChange, handleKeyDown, handlePaste, isComplete, reset } = useOtpInput(6);

    // Auto-focus first OTP box on mount
    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    const handleVerify = useCallback(async () => {
        if (!isComplete || isSubmitting) return;

        setSubmitting(true);
        // Simulate verification delay
        setTimeout(() => {
            setSubmitting(false);
            // Determine target view based on flow source
            switch (view) {
                case AUTH_VIEWS.OTP_FORGOT:
                    navigate(AUTH_VIEWS.RESET_PASSWORD);
                    break;
                case AUTH_VIEWS.OTP_SIGNUP:
                    navigate(AUTH_VIEWS.CREATE_PASSWORD);
                    break;
                case AUTH_VIEWS.OTP_LOGIN:
                    // Success entry for existing user login
                    routerNavigate('/home');
                    break;
                default:
                    // If view state is lost or ambiguous, default to create password for safety in signup context
                    navigate(AUTH_VIEWS.CREATE_PASSWORD);
            }
        }, 800);
    }, [isComplete, isSubmitting, view, navigate, routerNavigate, setSubmitting]);

    const handleBack = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        reset();
        navigate(OTP_BACK_MAP[view] || AUTH_VIEWS.LOGIN);
    }, [view, navigate, reset, isSubmitting]);

    return (
        <div className="pt-0">
            <div className="title-row justify-center">
                <h1 className="welcome-title text-center">Verify OTP</h1>
            </div>
            <p className="auth-subtitle text-center">
                We've sent a 6-digit code to {formData.contact}
            </p>
            <div className="otp-container">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => { if (otpRefs.current) otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className={`otp-box ${digit ? 'otp-filled' : ''}`}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={i === 0 ? handlePaste : undefined}
                        autoComplete="one-time-code"
                        disabled={isSubmitting}
                    />
                ))}
            </div>
            <button
                className={`auth-btn-primary ${(!isComplete || isSubmitting) ? 'btn-disabled' : ''}`}
                onClick={handleVerify}
                disabled={!isComplete || isSubmitting}
                style={{ margin: '30px auto 15px' }}
            >
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className="otp-back-link">
                <a href="#" onClick={handleBack} className="auth-footer">
                    Back
                </a>
            </div>
            <div className="auth-divider-flourish">
                <img src={dividerImg} alt="decorative flourish" />
            </div>
        </div>
    );
};

export default OtpVerification;
