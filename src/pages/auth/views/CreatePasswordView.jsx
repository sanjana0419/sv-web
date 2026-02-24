import React, { useCallback } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import dividerImg from '../../../assets/auth/divider.png';


const CreatePasswordView = () => {
    const { formData, showPass, setField, togglePass, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['password', 'confirmPassword']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.LOGIN);
        }
    }, [validateAll, navigate]);

    return (
        <>
            <div className="title-row" style={{ justifyContent: 'center' }}>
                <h1 className="welcome-title" style={{ textAlign: 'center' }}>Create new Password</h1>
            </div>
            <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: '10px' }}>
                Password must be at least 8 characters
            </p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Lock className="input-icon" size={18} />
                    <input
                        type={showPass ? 'text' : 'password'}
                        className={`auth-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Enter Strong Password"
                        value={formData.password}
                        onChange={(e) => setField('password', e.target.value)}
                        onBlur={() => touchField('password')}
                        required
                    />
                    <div className="show-pass-toggle" onClick={togglePass}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <Lock className="input-icon" size={18} />
                    <input
                        type={showPass ? 'text' : 'password'}
                        className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setField('confirmPassword', e.target.value)}
                        onBlur={() => touchField('confirmPassword')}
                        required
                    />
                    <div className="show-pass-toggle" onClick={togglePass}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="auth-btn-primary">Create Account</button>
                <div className="auth-divider-flourish">
                    <img src={dividerImg} alt="" />
                </div>
            </form>
        </>
    );
};

export default CreatePasswordView;
