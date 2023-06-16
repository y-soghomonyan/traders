import React from 'react';
import axios from 'axios';


const LogoutButton = () => {


  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      window.location.href = 'login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <span onClick={handleLogout}>Logout</span>
  );
};

export default LogoutButton;