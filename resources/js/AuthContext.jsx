import React, { createContext, useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user-data');
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        navigate('/login')
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Additional logic, such as storing the user data in local storage or cookies
  };

  const logout = () => {
    setUser(null);
    // Additional logic, such as clearing stored user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
