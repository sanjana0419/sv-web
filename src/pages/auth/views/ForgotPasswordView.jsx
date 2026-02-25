import React, { useCallback } from 'react';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import dividerImg from '../../../assets/auth/divider.png';


const ForgotPasswordView = () => {
    const { formData, setField, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['contact']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.OTP_FORGOT);
        }
    }, [validateAll, navigate]);

    return (
        <div style={{ paddingTop: '80px' }}>
            <div className="title-row" style={{ justifyContent: 'center', marginBottom: '10px' }}>
                <h1 className="welcome-title" style={{ fontSize: '24px', textAlign: 'center' }}>Forgot Password</h1>
            </div>
            <p className="auth-subtitle" style={{ textAlign: 'center', fontSize: '13px', marginBottom: '20px' }}>
                Enter your registered Email or mobile number
            </p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Mail className="input-icon" size={18} />
                    <input
                        type="text"
                        className={`auth-input ${errors.contact ? 'input-error' : ''}`}
                        placeholder="Email / Phone Number"
                        value={formData.contact}
                        onChange={(e) => setField('contact', e.target.value)}
                        onBlur={() => touchField('contact')}
                        required
                    />
                    {errors.contact && <span className="field-error">{errors.contact}</span>}
                </div>
                <button type="submit" className="auth-btn-primary" style={{ marginTop: '30px' }}>Send OTP</button>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.LOGIN); }} className="auth-footer">
                        <ArrowLeft size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Back to Login
                    </a>
                </div>
                <div className="auth-divider-flourish" style={{ marginTop: '-60px', marginBottom: '0' }}>
                    <img src={dividerImg} alt="" />
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordView;
