import React from 'react';
import { Globe } from 'lucide-react';
import './signup.css';
import weddingBg from '../../assets/auth/wedding.jpeg';
import logoImg from '../../assets/auth/logo_v2.png';
import kalashImg from '../../assets/auth/kalash.png';

const Signup = () => {
    const [selectedLang, setSelectedLang] = React.useState('EN');
    const languages = ['EN', 'HI', 'MR'];

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
                        <div className="nav-lang-switcher">
                            <Globe size={14} className="switcher-icon" />
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    className={`lang-segment ${selectedLang === lang ? 'active' : ''} focus:outline-none`}
                                    onClick={() => setSelectedLang(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
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

                            <div className="flex flex-col gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="w-full h-[54px] flex items-center justify-center bg-gradient-to-r from-[#CB1111] via-[#B00000] to-[#8B0000] text-white font-bold text-sm tracking-[1.2px] uppercase rounded-xl shadow-[0_10px_25px_-5px_rgba(203,17,17,0.35)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_15px_35px_-5px_rgba(203,17,17,0.45)] active:scale-[0.98] outline-none focus:outline-none cursor-pointer relative overflow-hidden"
                                >
                                    <span className="relative z-10">Send OTP</span>
                                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]"></div>
                                </button>

                                <button
                                    type="button"
                                    className="w-full h-[54px] flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.1)] active:scale-[0.98] outline-none focus:outline-none cursor-pointer"
                                >
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
