import React, { useCallback } from 'react';
import { Lock } from 'lucide-react';
import { useAuth, AUTH_VIEWS } from '../AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';

const ResetPasswordView = () => {
    const { formData, setField, navigate } = useAuth();
    const { errors, touchField, validateAll } = useFormValidation(formData, ['password', 'confirmPassword']);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (validateAll()) {
            navigate(AUTH_VIEWS.LOGIN);
        }
    }, [validateAll, navigate]);

    return (
        <>
            <div className="title-row">
                <h1 className="welcome-title">Make new Password</h1>
            </div>
            <p className="auth-subtitle">Enter Strong Password</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Lock className="input-icon" size={18} />
                    <input
                        type="password"
                        className={`auth-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Enter Strong Password"
                        value={formData.password}
                        onChange={(e) => setField('password', e.target.value)}
                        onBlur={() => touchField('password')}
                        required
                    />
                    <div className="icon-circle-float"><Lock size={12} /></div>
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <Lock className="input-icon" size={18} />
                    <input
                        type="password"
                        className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setField('confirmPassword', e.target.value)}
                        onBlur={() => touchField('confirmPassword')}
                        required
                    />
                    <div className="icon-circle-float"><Lock size={12} /></div>
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="auth-btn-primary">Create password</button>
            </form>
        </>
    );
};

export default ResetPasswordView;
