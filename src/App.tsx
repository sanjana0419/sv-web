import React, { useState } from 'react';
import LandingPage from './pages/auth/LandingPage';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <LandingPage onComplete={() => setShowSplash(false)} />;
  }

  return (
    <AppRoutes />
  );
}

export default App;
