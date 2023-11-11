import React, { useState, useEffect } from "react";
import { getPlaylists, getPlaylist } from "../../spotify";
import { catchErrors } from "../../utils";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import './styles.scss'; // Import the CSS file



export default function Sidebar() {
  const [playlistsData, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const {data} = await getPlaylists();
      setPlaylists(data.items);
    };
    catchErrors(fetchData());
  }, []);
  
  const playlistList = playlistsData.map((item, index) => (
    <div className="sidebar-info" data-index={index} key={index}>
      <img src={item.images[0].url} alt={item.images[0].url} />
      <div className="sidebar-playlist-info">
        <h3 className="sidebar-playlist-name">{item.name}</h3>
        <p className="sidebar-playlist-owner">{item.owner.display_name} - {item.type}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <div id="sidebar-playlist">
        <div className="blurry-card ">
          <div>{playlistList}</div>
        </div>
      </div>
    </div>
  );
}
