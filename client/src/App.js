import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import User from "./components/User/User";
import { token } from "./spotify";
import Sidebar from "./components/Sidebar/Sidebar";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";
import colors from "nice-color-palettes";
import "./index.scss";
import TopAlbums from "./components/TopAlbums/TopAlbums";
import TopSongs from "./components/TopSongs/TopSongs";
import TopArtists from "./components/TopArtists/TopArtists";
import Timeline from "./components/Timeline/Timeline";
export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [color, setColor] = useState(Math.floor(Math.random() * 100));

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <div className="">
      <MeshGradientRenderer
        className="gradient w-100 h-100 position-fixed"
        colors={colors[color]}
      />

      {accessToken ? <User /> : <Login />}
      {/* {accessToken ? <Timeline /> : null} */}

      <div style={{ height: "80px" }}>
        <div className="h-25"></div>
      </div>

      <div className="container-fluid d-flex justify-content-center text-white">
        {/* <div><Sidebar /></div> */}
      </div>

      <div style={{ height: "40px" }}>
        <div className="h-25"></div> {/*Spacing between elems*/}
      </div>

      <div className="container-fluid d-flex justify-content-center">
        {accessToken ? <TopSongs /> : null}
      </div>

      <div style={{ height: "40px" }}>
        <div className="h-25"></div> {/*Spacing between elems*/}
      </div>

      <div className="container-fluid d-flex justify-content-center">
        {accessToken ? <TopArtists /> : null}
      </div>

      <div className="position-fixed bottom-0 end-0 p-3" id="color-toggle">
        <button
          name="color"
          onClick={() => setColor(Math.floor(Math.random() * 100))}
        >
          Random Colors
        </button>
      </div>
    </div>
  );
}
