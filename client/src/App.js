import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import User from "./components/User/User";
import { token } from "./spotify";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <div className="bg-secondary bg-gradient">
      {accessToken ? <User /> : <Login />}
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
