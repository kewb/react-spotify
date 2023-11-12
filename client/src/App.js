import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import User from "./User";
import { token } from "./spotify";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return accessToken ? <User /> : <Login />;
}
