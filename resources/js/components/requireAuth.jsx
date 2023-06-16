import React, { useState, useEffect } from 'react';
import axios from 'axios';

const requireAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user-data');
        if (response.data.id) {
          setUser(response.data);
        }else{
          setUser('error');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default requireAuth;