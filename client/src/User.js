import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { getUserInfo, logout, getMyCurrentPlayingTrack } from "./spotify";
import { catchErrors } from "./utils";
import SpotifyWebApi from "spotify-web-api-node";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";

export default function User() {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({
    name: "Not playing",
    albumImageUrl: null,
    artistName: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists, topArtists, topTracks } =
        await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
      console.log(user);
    };
    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getMyCurrentPlayingTrack();
      const track = data.item;
      const albumImageUrl = track.album.images[1].url;
      const artistName = track.artists[0].name;

      setNowPlaying({
        name: track.name,
        albumImageUrl: albumImageUrl,
        artistName: artistName,
      });
      console.log(data);
    };
    catchErrors(fetchData());
  }, []);

  // Render data from the fetched information
  return (
    <div>
      <p>User: {user ? user.display_name : "Loading..."}</p>
      <img
        className="rounded"
        src={user ? user.images[0].url : "Image"}
        alt=""
      ></img>
      <p>Total Playlists: {playlists ? playlists.total : 0}</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {nowPlaying.albumImageUrl && (
          <img
            className="img-fluid rounded w-10 h-auto"
            src={nowPlaying.albumImageUrl}
            alt="Album Cover"
            style={{ marginRight: "10px" }}
          />
        )}
        <div>
          <div className="w-75">{nowPlaying.name}</div>
          <div>{nowPlaying.artistName}</div>
        </div>
      </div>
    <Sidebar/>

    </div>
  );
}
