const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; // obtained from Spotify API docs
const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_REDIRECT_URL; // once logged in -> redirect to home
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

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  SPOTIFY_AUTHORIZE_ENDPOINT,
  REDIRECT_URL_AFTER_LOGIN,
  SCOPES_URL_PARAM,
};
