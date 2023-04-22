import React from 'react';
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './templates/Account';
import Signin from './templates/Login';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/').then(res => res.json()).then(data => setMessage(data.message));
  }, []);

  // this is where we have the routes to the different pages,, html 
  // code does not go here
  return (
    <AuthContextProvider>
      <div className="App">
        <header style={{ backgroundColor: '#f1f1f1', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Navbar />
          </div>
        </header>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
        
      </div>
    </AuthContextProvider>
  );
}

export default App;
