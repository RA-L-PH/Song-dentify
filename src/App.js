import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './SERVICES/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LandingPage from './COMPONENTS/LandingPage';
import RecordDetails from './COMPONENTS/Record&Details';

function App() {
  const [user, setUser] = useState(null);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUsageCount(0);  // Reset usage count on login
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setUsageCount(0);  // Reset usage count on logout
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <div className="App">
      {!user && <LandingPage usageCount={usageCount} setUsageCount={setUsageCount} />}
      {user && (
        <>
          <RecordDetails />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;