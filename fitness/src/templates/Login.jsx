import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [user, navigate]);
  

  return (
      <div style={{ backgroundColor: "#F8F8F8", padding: "40px", display: "flex", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ maxWidth: "240px" }}>
          <h1 style={{ fontFamily: "Montserrat", fontSize: "36px", margin: "0 0 30px" }}>Sign in</h1>
          <GoogleButton style={{ backgroundColor: "#DB4437", color: "#FFFFFF" }} onClick={handleGoogleSignIn} />
        </div>
      </div>
  );
};

export default Signin;