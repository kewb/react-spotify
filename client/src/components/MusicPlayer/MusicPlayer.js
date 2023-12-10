import React, { useState } from "react";
import "./styles.scss"; 

const MusicPlayer = ({ src, albumSrc, song, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    src: src,
    albumSrc: albumSrc,
    song: song,
    artist: artist,
  });

  console.log("Source", currentTrack.src);
  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const prevTrackHandler = () => {};

  const nextTrackHandler = () => {};

  const seekSliderHandler = (event) => {};

  return (
    <div id="music-player">
      <audio id="music-src" src={currentTrack.src} />

      <div className="music-info">
        <div className="music-album">
          <img src={currentTrack.albumSrc} alt="" />
        </div>

        <div className="music-details">
          <div className="music-song">{currentTrack.song}</div>
          <div className="music-artist">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="music-control">
        <div className="prev-track" onClick={prevTrackHandler}>
          <i className="fa fa-step-backward fa-1x"></i>
        </div>

        <div className="playpause-track" onClick={playPauseHandler}>
          {isPlaying ? (
            <i className="fa fa-pause-circle fa-2x"></i>
          ) : (
            <i className="fa fa-play-circle fa-2x"></i>
          )}
        </div>

        <div className="next-track" onClick={nextTrackHandler}>
          <i className="fa fa-step-forward fa-1x"></i>
        </div>
      </div>

      <div className="slider">
        <div className="seek_slider" onClick={seekSliderHandler}></div>
        <div className="seek_slider_bg"></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
