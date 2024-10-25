import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth } from '../SERVICES/firebase';

const SignupModal = ({ onSignupSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignupSuccess(); // Notify the landing page on successful signup
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create an account');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="signup-form">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Sign up</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SignupModal;