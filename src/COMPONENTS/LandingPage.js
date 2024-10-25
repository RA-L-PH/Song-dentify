import React, { useState } from 'react';
import LoginModal from './LoginModal';
import '../CSS/LandingPage.css'

const LandingPage = ({ usageCount, setUsageCount }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setUsageCount((prevCount) => prevCount + 1);
    setShowLogin(false); // Close the login modal
  };


  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Song Finder</h1>
      <p className="usage-info">{`You have ${2 - usageCount} uses remaining`}</p>
      <button onClick={() => setShowLogin(true)} className="btn">Login</button>

      {showLogin && (
        <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default LandingPage;