import React, { useCallback, useEffect } from 'react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useOtpInput } from '../hooks/useOtpInput';

const OTP_BACK_MAP = {
    [AUTH_VIEWS.OTP_LOGIN]: AUTH_VIEWS.LOGIN,
    [AUTH_VIEWS.OTP_SIGNUP]: AUTH_VIEWS.SIGNUP,
    [AUTH_VIEWS.OTP_FORGOT]: AUTH_VIEWS.FORGOT_PASSWORD,
};

const OtpView = () => {
    const { view, navigate } = useAuth();
    const { otpRefs, otp, handleChange, handleKeyDown, handlePaste, isComplete, reset } = useOtpInput(6);

    // Auto-focus first OTP box on mount
    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    const handleVerify = useCallback(() => {
        if (!isComplete) return;
        if (view === AUTH_VIEWS.OTP_FORGOT) {
            navigate(AUTH_VIEWS.RESET_PASSWORD);
        } else {
            alert('Verified!');
        }
    }, [isComplete, view, navigate]);

    const handleBack = useCallback((e) => {
        e.preventDefault();
        reset();
        navigate(OTP_BACK_MAP[view] || AUTH_VIEWS.LOGIN);
    }, [view, navigate, reset]);

    return (
        <>
            <div className="title-row">
                <h1 className="welcome-title">Verify OTP</h1>
            </div>
            <p className="auth-subtitle">We've sent a 6-digit code to your registered mobile number.</p>
            <div className="otp-container">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
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
            >
                Verify OTP
            </button>
            <p className="auth-footer">
                <a href="#" onClick={handleBack}>Back</a>
            </p>
        </>
    );
};

export default OtpView;
