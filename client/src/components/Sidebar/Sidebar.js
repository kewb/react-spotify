import React, { useState, useEffect } from "react";
import { getPlaylists, getPlaylist } from "../../spotify";
import { catchErrors } from "../../utils";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import "./styles.scss"; // Import the CSS file

export default function Sidebar() {
  const [playlistsData, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPlaylists();
        if (data.items && data.items.length > 0) {
          setPlaylists(data.items);
          const firstPlaylistInfo = await getPlaylist(data.items[0].id); // Fix the function call
          setSelectedPlaylist(firstPlaylistInfo.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleClick(id) {
    const playlistInfo = await getPlaylist(id); // Fix the function call
    // console.log('Playlist id.', playlistInfo);
    setSelectedPlaylist(playlistInfo.data);
    // console.log('Playlist data.', selectedPlaylist);
  }

  const playlistList = playlistsData.map((item, index) => (
    <div
      className="sidebar-info"
      onClick={() => handleClick(item.id)}
      data-index={index}
      key={index}
    >
      <img src={item.images[0].url} alt={item.images[0].url} />
      <div className="sidebar-playlist-info">
        <h3 className="sidebar-playlist-name">{item.name}</h3>
        <p className="sidebar-playlist-owner">
          {item.owner.display_name} - {item.type}
        </p>
      </div>
    </div>
  ));

  return (
    <div style={{ display: "flex" }}>
      <div id="sidebar-playlist">
        <div className="blurry-card mh-100">
          <div>{playlistList}</div>
        </div>
      </div>
      <div className="px-3">
        <PlaylistInfo playlist={selectedPlaylist} />
      </div>
    </div>
  );
}
