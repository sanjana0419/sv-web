import React, { useCallback, useEffect } from 'react';
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
    const { view, navigate, formData } = useAuth();
    const { otpRefs, otp, handleChange, handleKeyDown, handlePaste, isComplete, reset } = useOtpInput(6);

    // Auto-focus first OTP box on mount
    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    const handleVerify = useCallback(() => {
        if (!isComplete) return;

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
                navigate(AUTH_VIEWS.HOME);
                break;
            default:
                // If view state is lost or ambiguous, default to create password for safety in signup context
                navigate(AUTH_VIEWS.CREATE_PASSWORD);
        }
    }, [isComplete, view, navigate]);

    const handleBack = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        reset();
        navigate(OTP_BACK_MAP[view] || AUTH_VIEWS.LOGIN);
    }, [view, navigate, reset]);

    return (
        <div style={{ paddingTop: '70px' }}>
            <div className="title-row" style={{ justifyContent: 'center' }}>
                <h1 className="welcome-title" style={{ textAlign: 'center' }}>Verify OTP</h1>
            </div>
            <p className="auth-subtitle" style={{ textAlign: 'center' }}>
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
                    />
                ))}
            </div>
            <button
                className={`auth-btn-primary ${!isComplete ? 'btn-disabled' : ''}`}
                onClick={handleVerify}
                disabled={!isComplete}
                style={{ margin: '30px auto 15px' }}
            >
                Verify OTP
            </button>
            <div className="auth-divider-flourish">
                <img src={dividerImg} alt="" />
            </div>
        </div>
    );
};

export default OtpVerification;
