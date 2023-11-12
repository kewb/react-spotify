import React from "react";
import { Container } from "react-bootstrap";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-email",
  "user-read-playback-state",
  "user-follow-read",
  "user-read-recently-played",
  "user-library-read",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-read-currently-playing",
];

const LOGIN_URI = "http://localhost:8888/login";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=4ecb8bef7c0048c2b086bd189b368941&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-read-currently-playing";

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a href={LOGIN_URI} className="btn btn-lg btn-success">
        Login with Spotify
      </a>
    </Container>
  );
}
