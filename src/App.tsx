import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
}

export default App;

