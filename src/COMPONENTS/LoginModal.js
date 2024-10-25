import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, provider, auth } from '../SERVICES/firebase';
import { FcGoogle } from 'react-icons/fc';


const LoginModal = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onLoginSuccess(); // Notify the landing page on successful login
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to log in with Google');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // Notify the landing page on successful login
    } catch (error) {
      console.error('Email login error:', error);
      setError('Failed to log in with email and password');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleEmailLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          {error && <p className="error-message">{error}</p>}<br/>
          <button type="submit" className="submit-button">Log in</button>
        </form><br/>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <FcGoogle className="google-icon" /> Continue with Google
        </button><br/><br/>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;