import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User } from 'lucide-react';
import { AUTH_VIEWS } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import dividerImg from '../../assets/auth/divider.png';


const RegisterPage = () => {
    const { formData, setField, navigate, isSubmitting, setSubmitting } = useAuth();
    const routerNavigate = useNavigate();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['contact', 'name']);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
            setSubmitting(true);
            // Simulate API delay
            setTimeout(() => {
                setSubmitting(false);
                navigate(AUTH_VIEWS.OTP_SIGNUP);
            }, 800);
        }
    }, [validateAll, navigate, setSubmitting]);

    return (
        <div className="pt-0">
            <div className="title-row justify-center">
                <h1 className="welcome-title register-title">Welcome</h1>
            </div>
            <p className="auth-subtitle register-subtitle">
                "where meaningful matches begin"
            </p>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <Mail className="input-icon" size={18} />
                    <input
                        type="text"
                        className={`auth-input ${errors.contact ? 'input-error' : ''}`}
                        placeholder="Email / Phone Number"
                        value={formData.contact}
                        onChange={(e) => setField('contact', e.target.value)}
                        onBlur={() => touchField('contact')}
                        aria-label="Email or Phone Number"
                        disabled={isSubmitting}
                        required
                    />
                    {errors.contact && <span className="field-error">{errors.contact}</span>}
                </div>

                <div className="form-group">
                    <User className="input-icon" size={18} />
                    <input
                        type="text"
                        className={`auth-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setField('name', e.target.value)}
                        onBlur={() => touchField('name')}
                        aria-label="Your Full Name"
                        disabled={isSubmitting}
                        required
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="or-divider" style={{ marginTop: '7px' }}>
                    <span className="or-text">or</span>
                </div>

                <button type="button" className="google-btn-pill google-btn-register" disabled={isSubmitting}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                    <span>Join with Google</span>
                </button>

                <div className="auth-divider-flourish">
                    <img src={dividerImg} alt="decorative flourish" />
                </div>

                <button type="submit" className="auth-btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register Now'}
                </button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); !isSubmitting && routerNavigate('/login'); }}>Log In</a>
            </p>
        </div>
    );
};

export default RegisterPage;
