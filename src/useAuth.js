import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || null);
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem("expiresIn") || null);

  useEffect(() => {
    if (code) {
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then((res) => {
          const { accessToken, refreshToken, expiresIn } = res.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setExpiresIn(expiresIn);

          // Store tokens and expiresIn in local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expiresIn);

          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          window.location = "/";
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    // Convert expiresIn to milliseconds since it's typically provided in seconds
    const expiresInMs = parseInt(expiresIn) * 1000;
    const refreshInterval = expiresInMs - Date.now() - 60000; // Refresh 60 seconds before expiration

    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        axios
          .post("http://localhost:3001/refresh", {
            refreshToken,
          })
          .then((res) => {
            const { accessToken, expiresIn } = res.data;
            setAccessToken(accessToken);
            setExpiresIn(expiresIn);

            // Update tokens and expiresIn in local storage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expiresIn);
          })
          .catch(() => {
            window.location = "/";
          });
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}
