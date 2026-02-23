import React from 'react';
import './Signup.css';
import weddingBg from '../../assets/auth/wedding.jpeg';
import logoImg from '../../assets/auth/logo.png';
import kalashImg from '../../assets/auth/kalash.jpg';

const Signup = () => {
    return (
        <div className="background-wrapper">
            <div className="floating-compact-card">
                {/* LEFT PARTITION: Image Section */}
                <div className="card-left-partition">
                    <div className="preview-image-container">
                        <img src={weddingBg} alt="Wedding Couple" className="preview-img-inside" />
                    </div>
                </div>

                {/* RIGHT PARTITION: Form Section Area */}
                <div className="card-right-partition">
                    {/* Card Top Branding Area */}
                    <div className="card-internal-nav">
                        <img src={logoImg} alt="Shubh Vivah Logo" className="nav-logo-compact" />
                        <div className="nav-lang-selector-pill">EN | DL</div>
                    </div>

                    {/* Signup Content Area */}
                    <div className="signup-form-content">
                        <div className="heading-wrapper-row">
                            <h1 className="heading-text-welcome">Welcome</h1>
                            <img src={kalashImg} alt="Matrimonial Symbol" className="kalash-icon-inline" />
                        </div>
                        <p className="subtitle-entry-text">Create your account</p>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mobile-input-group">
                                <input
                                    type="text"
                                    className="rounded-form-input"
                                    placeholder="Enter Mobile Number"
                                    required
                                />
                            </div>

                            <div className="action-buttons-stack">
                                <button type="submit" className="btn-primary-otp">
                                    Send OTP
                                </button>
                                <button type="button" className="btn-google-bordered">
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                                    Join with Google
                                </button>
                            </div>
                        </form>

                        <p className="auth-footer-link-text">
                            Already have an account? <a href="#">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
