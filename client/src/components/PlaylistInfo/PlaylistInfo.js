import React from "react";
import "./styles.scss"; // Import the CSS file
import { formatDurationForHumans } from "../../utils";
const PlaylistInfo = ({ playlist }) => {
  if (!playlist) {
    return <p>Select a playlist to view details.</p>;
  }

  const songs = playlist.tracks.items.map((item) => {
    return {
      thumbnail: item.track.album.images[1].url,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      dateAdded: item.added_at,
      duration: formatDurationForHumans(item.track.duration_ms),
      preview_url: item.track.preview_url,
      identifier: item.external_ids,
    };
  });
  //   console.log(playlist);

  const playlistsData = songs.map((song, index) => (
    <div>
      <div className="container">
        <div class="clickable-song playListSongs">
          {/* <p className="index">{index + 1}</p> */}
          <img src={song.thumbnail} alt={song.name} width="50px"></img>
          <div className="playlist-song-info">
            <div className="playlist-song-name">{song.name}</div>
            <div className="playlist-song-artist">{song.artist}</div>
          </div>
          <p className="ad-details">{song.album}</p>
          <p className="ad-details">{song.dateAdded}</p>
          <p className="ad-details">{song.duration}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="blurry-card">
        <div className="">
          <img
            src={playlist.images[0].url}
            alt={playlist.images[0].url}
            className="albumThumbnail"
            width="50px"
            height="50px"
          ></img>
          <div>
            <p className="playlist-name">{playlist.name}</p>
            <div className="d-flex">
              <p className="playlist-creator">{playlist.owner.display_name}</p>
            </div>
            {playlistsData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
