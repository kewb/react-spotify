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

  const playlistsData = songs.map((song, index) => (
<div key={index} className="container">
  <div className="clickable-song playListSongs row">
    <div className="col-auto">
      <div>
        <img src={song.thumbnail} alt={song.name} className="img-fluid" />
      </div>
    </div>
    <div className="col d-block">
      <div className="playlist-song-info">
        <div className="playlist-song-name">{song.name}</div>
        <div className="playlist-song-artist">{song.artist}</div>
      </div>
    </div>
    <div className="col d-none d-lg-block d-xl-none">
      <div className="text-start">
        <p className="ad-details">{song.dateAdded}</p>
      </div>
    </div>
    <div className="col d-block">
      <div className="text-end">
        <p className="ad-details">{song.duration}</p>
      </div>
    </div>
  </div>
</div>

  ));

  return (
    <div>
      <div className="blurry-card">
        <div className="d-flex justify-content-center align-items-center pb-2">
          <img
            src={playlist.images[0].url}
            alt={playlist.images[0].url}
            className="albumThumbnail img-fluid rounded"
          />
          <div className="flex-grow-1 p-2">
            <p className="playlist-name">{playlist.name}</p>
            <div className="d-flex">
              <p className="playlist-creator">{playlist.owner.display_name}</p>
            </div>
          </div>
        </div>
        {playlistsData}
      </div>
    </div>
  );
};

export default PlaylistInfo;
