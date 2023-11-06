import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Login';
import Dashboard from "./Dashboard";
import axios from 'axios';

function App() {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedRefreshToken = localStorage.getItem('refreshToken');

  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(storedAccessToken);
  //const [refreshToken, setRefreshToken] = useState(storedRefreshToken);

  // Function to refresh the access token using the refresh token
  const refreshToken = async (newRefreshToken) => {
    try {
      const response = await axios.post("http://localhost:3001/refresh", {
        refreshToken: newRefreshToken,
      });
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      setAccessToken(null);
      setAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Function to check if the token is about to expire and refresh it
  const checkTokenExpiration = () => {
    if (accessToken) {
      const tokenExpirationTime = localStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (currentTime >= tokenExpirationTime) {
        refreshToken(storedRefreshToken); // Pass the storedRefreshToken
      }
    }
  }

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);

      // Schedule token expiration check every few minutes
      const expirationCheckInterval = setInterval(() => {
        checkTokenExpiration();
      }, 5 * 60 * 1000); // Check every 5 minutes

      // Clear the interval when the component unmounts
      return () => clearInterval(expirationCheckInterval);
    }
  }, [accessToken]);

  return authenticated ? <Dashboard /> : <Login />;
}

export default App;
