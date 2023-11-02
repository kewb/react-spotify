import React, { useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

import {
    CLIENT_ID, 
    CLIENT_SECRET, 
    SPOTIFY_AUTHORIZE_ENDPOINT, 
    REDIRECT_URL_AFTER_LOGIN, 
    SCOPES_URL_PARAM 
} from './auth'

const currentlyPlaying = "https://api.spotify.com/v1/me/player/currently-playing";


const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
});



export default function Dashboard({code}) {
    const accessToken = useAuth(code);
    const spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID,
        accessToken: accessToken,
    });
    const [nowPlaying, setNowPlaying] = useState("Not playing")
    spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data) {
    console.log('Now playing: ' + data.body.item.name);
    setNowPlaying(data.body.item.name);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

    return <div>{nowPlaying}</div>
    
  
}
