import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

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
    <div style={{ backgroundColor: '#f1f1f1' }} className='w-full'>
      <div className='flex justify-between p-4'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: '0', fontWeight: 'bold' }}>YourFitnessPRO</h1>
        </div>
        <div>
          <Link style={{ marginLeft: '1100px' }} to='/'>Home</Link>
          {user?.displayName ? (
            <>
              <Link style={{ marginLeft: '10px' }} to='/account'>Profile</Link>
              <Link style={{ marginLeft: '10px' }} to='/signin' onClick={handleSignOut}>Sign out</Link>
            </>
          ) : (
            <Link style={{ marginLeft: '10px' }} to='/signin'>Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
