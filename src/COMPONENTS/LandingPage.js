import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import '../CSS/LandingPage.css'

const LandingPage = ({ usageCount, setUsageCount }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = () => {
    setUsageCount((prevCount) => prevCount + 1);
    setShowLogin(false); // Close the login modal
  };

  const handleSignupSuccess = () => {
    setUsageCount((prevCount) => prevCount + 1);
    setShowSignup(false); // Close the signup modal
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Song Finder</h1>
      <p className="usage-info">{`You have ${2 - usageCount} uses remaining`}</p>
      <button onClick={() => setShowLogin(true)} className="btn">Login</button>
      <button onClick={() => setShowSignup(true)} className="btn">Sign Up</button>

      {showLogin && (
        <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />
      )}
      {showSignup && (
        <SignupModal onSignupSuccess={handleSignupSuccess} onClose={() => setShowSignup(false)} />
      )}
    </div>
  );
};

export default LandingPage;