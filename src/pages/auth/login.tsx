import React, { useCallback } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AUTH_VIEWS } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import dividerImg from '../../assets/auth/divider.png';


const LoginPage = () => {
    const { formData, showPass, setField, togglePass, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['contact', 'password']);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.HOME);
        }
    }, [validateAll, navigate]);

    return (
        <>
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
                <div className="form-group">
                    <Lock className="input-icon" size={18} />
                    <input
                        type={showPass ? 'text' : 'password'}
                        className={`auth-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setField('password', e.target.value)}
                        onBlur={() => touchField('password')}
                        required
                    />
                    <div className="show-pass-toggle" onClick={togglePass}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                    {errors.password && <span className="field-error">{errors.password || ''}</span>}
                </div>
                <div className="forgot-link-container">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.FORGOT_PASSWORD); }} className="forgot-link">
                        Forgot password?
                    </a>
                </div>

                <div className="or-divider">
                    <span className="or-text">or</span>
                </div>

                <button type="button" className="google-btn-pill">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                    <span>Join with Google</span>
                </button>

                <div className="auth-divider-flourish">
                    <img src={dividerImg} alt="" />
                </div>

                <button type="submit" className="auth-btn-primary">Log In</button>
            </form>
            <p className="auth-footer">
                Don't have an account ? <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.SIGNUP); }}>sign up</a>
            </p>
        </>
    );
};

export default LoginPage;
