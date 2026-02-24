import React, { useCallback } from 'react';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';

const ForgotPasswordView = () => {
    const { formData, setField, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['phone']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.OTP_FORGOT);
        }
    }, [validateAll, navigate]);

    return (
        <>
            <div className="title-row">
                <h1 className="welcome-title">Forgot Password</h1>
            </div>
            <p className="auth-subtitle">Enter your registered identity to reset password.</p>
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
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.LOGIN); }} className="auth-footer">
                        <ArrowLeft size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Back to Login
                    </a>
                </div>
            </form>
        </>
    );
};

export default ForgotPasswordView;
