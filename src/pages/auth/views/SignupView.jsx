import React, { useCallback } from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';

const SignupView = () => {
    const { formData, setField, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['phone']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.OTP_SIGNUP);
        }
    }, [validateAll, navigate]);

    return (
        <>
            <div className="title-row">
                <h1 className="welcome-title">Welcome</h1>
            </div>
            <p className="auth-subtitle">Enter your details to find your harmony.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Mail className="input-icon" size={18} />
                    <input
                        type="text"
                        className={`auth-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="Email / Phone Number"
                        value={formData.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        onBlur={() => touchField('phone')}
                        required
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <button type="submit" className="auth-btn-primary">Send OTP</button>
            </form>
            <div className="or-divider">
                <span className="or-text">or</span>
            </div>
            <button type="button" className="google-btn-pill">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                <span>Join with Google</span>
            </button>
            <p className="auth-footer">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.LOGIN); }}>Sign In</a>
            </p>
        </>
    );
};

export default SignupView;
