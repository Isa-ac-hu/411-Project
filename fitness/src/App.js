import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './templates/Account';
import Signin from './templates/Login';
import Home from './templates/Home'; 

function App() {

  return (
    <AuthContextProvider>
      <div className="App">
        <header style={{ backgroundColor: '#333', padding: '20px', height:'100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <Route path='/' element={<Home />} /> 
          <Route path='/account' element={<Account />} />  
        </Routes>
        
      </div>
    </AuthContextProvider>
  );
}

export default App;
