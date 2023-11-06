import React from 'react'
import { Container } from 'react-bootstrap';
// import { CLIENT_ID,  
//     SPOTIFY_AUTHORIZE_ENDPOINT, 
//     REDIRECT_URL_AFTER_LOGIN, 
//     SCOPES_URL_PARAM } from './auth';
const CLIENT_ID="4ecb8bef7c0048c2b086bd189b368941";
const REDIRECT_URL_AFTER_LOGIN="http://localhost:3000/"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; // obtained from Spotify API docs
const SPACE_DELIMITER = "%20";
const SCOPES = ['user-read-email','user-read-playback-state','user-follow-read','user-read-recently-played', 'user-library-read', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read','user-read-currently-playing'];

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=4ecb8bef7c0048c2b086bd189b368941&response_type=code&redirect_uri=http://localhost:3000/&scope=${SCOPES_URL_PARAM}&show_dialog=true`;
// const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&show_dialog=true`;
export default function Login() {
  return <Container 
  className='d-flex justify-content-center align-items-center'
  style={{minHeight:"100vh"}}
  >
    <a className='btn btn-success btn-lg' href={AUTH_URL}>
        Login with Spotify
        </a>
  </Container>
}
