import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[300px] m-auto'>
      <div>
        <h2 style={{ marginLeft: '20px' }}>Welcome, {user?.displayName}</h2>
        {/* maybe a weather api here that will say like, 'the weather today is ____*/}
      </div>
    </div>
  );
};

export default Account;