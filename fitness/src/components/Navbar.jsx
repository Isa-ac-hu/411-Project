import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import '../App.css';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{color: "white", fontSize: '30px', margin: '0', marginRight:'700px', fontWeight: 'bold', fontFamily: 'Inter' }}>
              <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>YourFitnessPRO</Link>
          </h1>
          <nav>
              <ul>
                  {user?.displayName ? (
                      <>
                          <li><Link to='/account'>Profile</Link></li>
                          <li><Link to='/totalcal'>View Calories</Link></li>
                          <li><Link to='/signin' onClick={handleSignOut}>Sign out</Link></li>
                      </>
                  ) : (
                      <li><Link to='/signin'>Sign in</Link></li>
                  )}
                  <li><Link to='/'>Home</Link></li>
                  <li className="contact"><Link to='/contact'>Contact</Link></li>
              </ul>
          </nav>
      </div>

  );
};

export default Navbar;
