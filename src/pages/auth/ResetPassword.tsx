import React, { useCallback } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { AUTH_VIEWS } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/useFormValidation';
import dividerImg from '../../assets/auth/divider.png';


const ResetPassword = () => {
    const { formData, showPass, setField, togglePass, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['password', 'confirmPassword']);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.HOME);
        }
    }, [validateAll, navigate]);

    return (
        <div style={{ paddingTop: '80px' }}>
            <div className="title-row" style={{ justifyContent: 'center', marginBottom: '15px' }}>
                <h1 className="welcome-title" style={{ textAlign: 'center', fontSize: '24px' }}>Reset Password</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="input-icon-wrapper">
                        <Lock className="input-icon-inner" size={16} />
                    </div>
                    <input
                        type={showPass ? 'text' : 'password'}
                        className={`auth-input ${errors.password ? 'input-error' : ''}`}
                        style={{ paddingLeft: '50px' }}
                        placeholder="New Password"
                        value={formData.password}
                        onChange={(e) => setField('password', e.target.value)}
                        onBlur={() => touchField('password')}
                        required
                    />
                    <div className="show-pass-toggle" onClick={togglePass}>
                        {showPass ? <EyeOff className="pass-toggle-icon" size={18} /> : <Eye className="pass-toggle-icon" size={18} />}
                    </div>
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <div className="input-icon-wrapper">
                        <Lock className="input-icon-inner" size={16} />
                    </div>
                    <input
                        type={showPass ? 'text' : 'password'}
                        className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        style={{ paddingLeft: '50px' }}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setField('confirmPassword', e.target.value)}
                        onBlur={() => touchField('confirmPassword')}
                        required
                    />
                    <div className="show-pass-toggle" onClick={togglePass}>
                        {showPass ? <EyeOff className="pass-toggle-icon" size={18} /> : <Eye className="pass-toggle-icon" size={18} />}
                    </div>
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>

                <p className="auth-subtitle" style={{ textAlign: 'center', fontSize: '13px', marginBottom: '20px', color: '#A68E6B' }}>
                    Password must be at least 8 characters
                </p>

                <button type="submit" className="auth-btn-primary" style={{ marginTop: '10px' }}>Change Password</button>

                <div style={{ textAlign: 'center', marginTop: '-10px' }}>
                    <a href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(AUTH_VIEWS.LOGIN); }} className="auth-footer" style={{ color: '#A68E6B', fontSize: '12px' }}>
                        Back To Login
                    </a>
                </div>

                <div className="auth-divider-flourish" style={{ marginTop: '-60px' }}>
                    <img src={dividerImg} alt="" />
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
