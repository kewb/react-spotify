import React, { useState, useEffect } from 'react';
import { getUserInfo, logout, getMyCurrentPlayingTrack } from './spotify';
import { catchErrors } from './utils';
import SpotifyWebApi from 'spotify-web-api-node';


export default function User() {
    const [user, setUser] = useState(null);
    const [followedArtists, setFollowedArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [nowPlaying, setNowPlaying] = useState({
      name: "Not playing",
      albumImageUrl: null,
      artistName: null
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
        setUser(user);
        setFollowedArtists(followedArtists);
        setPlaylists(playlists);
        setTopArtists(topArtists);
        setTopTracks(topTracks);
      };
      catchErrors(fetchData());
    }, []);
  
    // Render data from the fetched information
    return (
      <div>
        <p>User: {user ? user.display_name : 'Loading...'}</p>
        <p>Total Playlists: {playlists ? playlists.total : 0}</p>
  
        {/* Render other data as needed */}
        <p>Followed Artists: {followedArtists ? followedArtists.length : 0}</p>
        <p>Top Artists: {topArtists ? topArtists.length : 0}</p>
        <p>Top Tracks: {topTracks ? topTracks.length : 0}</p>
      </div>
    );
  }
  