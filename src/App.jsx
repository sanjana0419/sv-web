import React, { useState } from 'react';
import Splash from './pages/auth/Splash';
import AuthContainer from './pages/auth/AuthContainer';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <AuthContainer />
  );
}

export default App;
