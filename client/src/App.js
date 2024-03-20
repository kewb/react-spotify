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
import History from "./components/History/History";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [color, setColor] = useState(Math.floor(Math.random() * 100));
  const [selectedTrack, setSelectedTrack] = useState(null); // State for currently selected track

  useEffect(() => {
    setAccessToken(token);
  }, []);

  // Function to handle track selection
  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div className="">
      <MeshGradientRenderer
        className="gradient w-100 h-100 position-fixed"
        colors={colors[1]}
      />

      {accessToken ? <User /> : <Login />}

      <div className="container-fluid d-flex justify-content-center text-white mt-5">
        <div>
        <Sidebar onTrackSelect={handleTrackSelect} />
        </div>
      </div>

      <div style={{ height: "40px" }}>
        <div className="h-25"></div> {/*Spacing between elems*/}
      </div>

      <History onTrackSelect={handleTrackSelect}/>

      <div style={{ height: "40px" }}>
        <div className="h-25"></div> {/*Spacing between elems*/}
      </div>

      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-center ">
        {accessToken ? (
          <TopSongs onTrackSelect={handleTrackSelect} />
        ) : null}
        <div style={{ width: "30px" }}>
          <div className="w-25"></div> {/*Spacing between elems*/}
        </div>
        {accessToken ? <TopArtists /> : null}
      </div>

      <div style={{ height: "40px" }}>
        <div className="h-25"></div> {/*Spacing between elems*/}
      </div>

      <div className="position-fixed bottom-0 end-0 p-3" id="color-toggle">
        <button
          name="color"
          onClick={() => setColor(Math.floor(Math.random() * 100))}
        >
          Random Colors
        </button>
      </div>

      {/* Render MusicPlayer with selectedTrack if available */}
      {selectedTrack && (
        <MusicPlayer currentTrack={selectedTrack} />
      )}
    </div>
  );
}
