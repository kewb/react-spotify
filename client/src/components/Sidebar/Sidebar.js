import React, { useState, useEffect } from "react";
import { getPlaylists, getPlaylist } from "../../spotify";
import { catchErrors } from "../../utils";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import "./styles.scss"; // Import the CSS file
import TopAlbums from "../TopAlbums/TopAlbums";

export default function Sidebar({ onTrackSelect }) {
  const [playlistsData, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPlaylists();
        if (data.items && data.items.length > 0) {
          setPlaylists(data.items);
          const firstPlaylistInfo = await getPlaylist(data.items[0].id);
          setSelectedPlaylist(firstPlaylistInfo.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleClick(id) {
    const playlistInfo = await getPlaylist(id);
    setSelectedPlaylist(playlistInfo.data);
  }

  return (
    <div className="d-flex flex-column flex-sm-row">
      <div id="sidebar-playlist" className="order-1 order-sm-0 mb-3 mb-sm-0 flex-grow-1">
        <div className="blurry-card">
          {playlistsData.map((item, index) => (
            <div
              className="sidebar-info"
              onClick={() => handleClick(item.id)}
              data-index={index}
              key={index}
            >
              <img src={item.images[0].url} alt={item.images[0].url} />
              <div className="sidebar-playlist-info text-white">
                <h3 className="sidebar-playlist-name">{item.name}</h3>
                <p className="sidebar-playlist-owner">
                  {item.owner.display_name} - {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 order-0 order-sm-1">
        <PlaylistInfo playlist={selectedPlaylist} onTrackSelect={onTrackSelect} />
      </div>
    </div>
  );
}
