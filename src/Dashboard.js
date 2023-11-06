import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';

import {
    CLIENT_ID, 
    CLIENT_SECRET, 
    SPOTIFY_AUTHORIZE_ENDPOINT, 
    REDIRECT_URL_AFTER_LOGIN, 
    SCOPES_URL_PARAM 
} from './auth'

const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [nowPlaying, setNowPlaying] = useState({
        name: "Not playing",
        albumImageUrl: null,
        artistName: null
    });

    useEffect(() => {
        if (accessToken) {
            const api = new SpotifyWebApi({
                clientId: CLIENT_ID,
                accessToken: accessToken,
            });

            api.getMyCurrentPlayingTrack()
                .then(function(data) {
                    const track = data.body.item;
                    const albumImageUrl = track.album.images[0].url;
                    const artistName = track.artists[0].name;

                    setNowPlaying({
                        name: track.name,
                        albumImageUrl: albumImageUrl,
                        artistName: artistName
                    });
                })
                .catch(function(err) {
                    console.log('Something went wrong!', err);
                });
        }
    }, [accessToken]);

    return (
        <div>
            <div>{nowPlaying.name}</div>
            {nowPlaying.albumImageUrl && (
                <img src={nowPlaying.albumImageUrl} alt="Album Cover" />
            )}
            <div>{nowPlaying.artistName}</div>
        </div>
    );
}
