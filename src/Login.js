import React from 'react'
import { Container } from 'react-bootstrap';
import { CLIENT_ID,  
    SPOTIFY_AUTHORIZE_ENDPOINT, 
    REDIRECT_URL_AFTER_LOGIN, 
    SCOPES_URL_PARAM } from './auth';
    const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&show_dialog=true`;

    //const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
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
