import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getUserInfo, logout, getMyCurrentPlayingTrack } from "../../spotify";
import { catchErrors } from "../../utils";
import SpotifyWebApi from "spotify-web-api-node";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import TopAlbums from "../TopAlbums/TopAlbums";
import "./styles.scss"; // Import the CSS file

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
      try {
        const { data } = await getMyCurrentPlayingTrack();

        // Check if there is a currently playing track
        if (data && data.item) {
          const track = data.item;

          // Check if album and images properties exist
          if (track.album && track.album.images && track.album.images[1]) {
            const albumImageUrl = track.album.images[1].url;
            const artistName = track.artists[0].name;

            setNowPlaying({
              name: track.name,
              albumImageUrl: albumImageUrl,
              artistName: artistName,
            });
          } else {
            // Handle the case where album or images properties are missing
            setNowPlaying({
              name: track.name,
              albumImageUrl: null,
              artistName: track.artists[0].name,
            });
          }
        } else {
          // Handle the case where there is no currently playing track
          setNowPlaying({
            name: "Not playing",
            albumImageUrl: null,
            artistName: null,
          });
        }

        console.log(data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching current playing track:", error);
      }
    };

    catchErrors(fetchData());
  }, []);

  // Render data from the fetched information
  return (
    <div className="bg-dark-gray">
      <div className="d-flex justify-content-between confined bg-gray px-2">
        {" "}
        <div className="d-flex align-items-center">
          <img
            className="user-img mr-3 "
            src={user ? user.images[1].url : "Image"}
            alt=""
          />
          <p className="mb-2 ml-1">{user ? user.display_name : "Loading..."}</p>
        </div>
        <div className="d-flex align-items-center">
          <p>Now Playing</p>
          {nowPlaying.albumImageUrl && (
            <img
              className="mr-3 def-image"
              src={nowPlaying.albumImageUrl}
              alt="Album Cover"
            />
          )}
          <div>
            <div className="w-75 mb-1">{nowPlaying.name}</div>
            <div>{nowPlaying.artistName}</div>
          </div>
        </div>

      </div>
      <div className="confined d-flex align-items-end overflow-auto justify gap-3 py-1 ">
          <a className="border-bottom border-3 text-decoration-none fw-bold">Overview</a>
          <a className="text-decoration-none fw-bold">Songs</a>
          <a className="text-decoration-none fw-bold">Artists</a>
          <a className="text-decoration-none fw-bold">Albums</a>
          <a className="text-decoration-none fw-bold">Genres</a>
        </div>
    </div>
  );
}
