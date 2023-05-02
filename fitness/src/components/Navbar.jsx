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

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#eee', width: '100%'}}>
      <div className='flex justify-between p-4'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: '0', fontWeight: 'bold',  fontFamily: 'Inter' }}>YourFitnessPRO</h1>
        </div>
        <div>
          <br />

            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {user?.displayName ? (
                        <>
                            <li><Link to='/account'>Profile</Link></li>
                            <li><Link to='/signin' onClick={handleSignOut}>Sign out</Link></li>
                        </>
                    ) : (
                        <li><Link to='/signin'>Sign in</Link></li>
                    )}
                    <li className="contact"><Link to='/contact'>Contact</Link></li>
                </ul>
            </nav>


        </div>
      </div>
    </div>
  );
};
// function TopNav() {
//   return (
//       <nav>
//         <a href="#home" className="active">Home</a>
//         <a href="#about">About</a>
//         <a href="#contact">Contact</a>
//         <a href="#news">News</a>
//         <a href="#blog">Blog</a>
//       </nav>
//   );
// }
export default Navbar;
