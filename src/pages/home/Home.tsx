import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfileCompletion from './components/ProfileCompletion';
import RecommendedProfiles from './components/RecommendedProfiles';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Gallery from './components/Gallery';


const Home: React.FC = () => {
    const [view, setView] = React.useState<'dashboard' | 'matches' | 'search' | 'services'>('dashboard');
    const exploreRef = React.useRef<HTMLDivElement>(null);

    const handleExplore = () => {
        if (view !== 'dashboard') {
            setView('dashboard');
            setTimeout(() => {
                exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans selection:bg-rose-100 selection:text-rose-600 overflow-x-hidden">
            {/* Sidebar - Floating Glassmorphism */}
            <Sidebar currentView={view} onViewChange={setView} />

            {/* Conditionally Render Views */}
            <AnimatePresence mode="wait">
                {view === 'dashboard' ? (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                    >
                        {/* Hero Section - Full Screen with Explore Interaction */}
                        <Hero onExplore={handleExplore} />

                        {/* Main Content Area - Revealed on Scroll */}
                        <div ref={exploreRef} className="max-w-[1700px] mx-auto px-6 md:px-12 lg:pl-48 lg:pr-12 pb-20 relative z-20 mt-12 scroll-mt-20">
                            <div className="flex flex-col lg:flex-row gap-10 items-start">
                                {/* Left Column */}
                                <main className="flex-1 w-full lg:w-[65%] space-y-12">
                                    {/* Profile Completion */}
                                    <ProfileCompletion />

                                    {/* Main Feed */}
                                    <RecommendedProfiles />
                                </main>

                                {/* Right Column - Success Stories & Activity */}
                                <div className="hidden lg:block w-[400px]">
                                    <RightSidebar />
                                </div>
                            </div>
                        </div>

                        {/* Full Width Gallery/Services Section */}
                        <div className="w-full">
                            <Gallery />
                        </div>
                    </motion.div>

                ) : (
                    <motion.div
                        key="other"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center min-h-screen lg:pl-48"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-gray-900 mb-4 capitalize">{view} Section</h2>
                            <p className="text-gray-500">This section is coming soon.</p>
                            <button
                                onClick={() => setView('dashboard')}
                                className="mt-8 px-8 py-3 bg-[#c6862e] text-white rounded-full font-black shadow-lg"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Footer */}
            <footer className="bg-white py-12 border-t border-gray-100 mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 text-sm">© 2026 Shubh Vivah. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-rose-600 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-rose-600 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-rose-600 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.67.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.67.072 4.947c.2 4.337 2.617 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.67-.014 4.947-.072c4.338-.2 6.78-2.617 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.67-.072-4.947c-.2-4.338-2.617-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
