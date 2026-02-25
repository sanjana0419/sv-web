import React, { useCallback } from 'react';
import { Mail } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import dividerImg from '../../../assets/auth/divider.png';


const SignupView = () => {
    const { formData, setField, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['contact']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.OTP_SIGNUP);
        }
    }, [validateAll, navigate]);

    return (
        <div style={{ paddingTop: '0px' }}>
            <div className="title-row" style={{ justifyContent: 'center' }}>
                <h1 className="welcome-title" style={{ textAlign: 'center', fontSize: '40px' }}>Welcome</h1>
            </div>
            <p className="auth-subtitle" style={{
                textAlign: 'center',
                fontStyle: 'italic',
                color: '#D4AF37',
                fontSize: '14px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: '500'
            }}>
                "where meaningful matches begin"
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

                <div className="or-divider" style={{ marginTop: '7px' }}>
                    <span className="or-text">or</span>
                </div>

                <button type="button" className="google-btn-pill" style={{ marginTop: '-15px' }}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                    <span>Join with Google</span>
                </button>

                <div className="auth-divider-flourish">
                    <img src={dividerImg} alt="" />
                </div>

                <button type="submit" className="auth-btn-primary">Send OTP</button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate(AUTH_VIEWS.LOGIN); }}>Log In</a>
            </p>
        </div>
    );
};

export default SignupView;
