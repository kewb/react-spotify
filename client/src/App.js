import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import User from "./components/User/User";
import { token } from "./spotify";
import Sidebar from "./components/Sidebar/Sidebar";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <div className="">
      <MeshGradientRenderer
        className="gradient w-100 h-100"
        colors={["#C3E4FF", "#6EC3F4", "#EAE2FF", "#B9BEFF", "#B3B8F9"]}
      />
      {accessToken ? <User /> : <Login />}
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div>
          {/* <Sidebar /> */}
        </div>
      </div>
    </div>
  );
}
