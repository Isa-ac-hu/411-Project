import React from 'react';
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Signin from './templates/Login';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/').then(res => res.json()).then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header style={{ backgroundColor: '#f1f1f1', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<Signin />} />
        </Routes>
        </AuthContextProvider>
        </div>
      </header>
      <main style={{ padding: '20px', textAlign: 'left' }}>
        <section style={{ marginBottom: '20px' }}>
          <h2>Get fit with YourFitnessPRO</h2>
          <p>Our platform provides personalized fitness plans tailored to your goals and fitness level.</p>
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h2>Features</h2>
          <ul>
            <li>Features</li>
            <li>Features</li>
            <li>Features</li>
            <li>Features</li>
          </ul>
        </section>
        <section>
          <h2>Sign up today</h2>
          <p>Join our community of fitness enthusiasts today and start your journey to a healthier you.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
