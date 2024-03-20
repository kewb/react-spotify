import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

const MusicPlayer = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const audioRef = useRef(null);
  const sliderRef = useRef(null);

  // Effect for track change
  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrack && currentTrack.src) {
      audio.src = currentTrack.src;
      audio.load();
      if (isPlaying) {
        audio
          .play()
          .catch((error) => console.error("Error playing the track:", error));
      }
    }

    // Update duration on track load
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [currentTrack]);

  // Effect for handling play/pause
  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  // Update slider value based on currentTime
  useEffect(() => {
    setSliderValue((currentTime / duration) * 100);
  }, [currentTime, duration]);

  // Event listeners for updating time
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const seekSliderHandler = (event) => {
    const audio = audioRef.current;
    const slider = sliderRef.current;
    if (!slider || !audio.duration) return;

    const sliderWidth = slider.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const seekTime = (clickX / sliderWidth) * audio.duration;

    audio.currentTime = seekTime;
    setCurrentTime(seekTime); // Directly set to seekTime for immediate feedback
    const newSliderValue = (seekTime / audio.duration) * 100;
    setSliderValue(newSliderValue); // Adjust the slider value based on the seek
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div id="music-player">
      <audio ref={audioRef} src={currentTrack.src}></audio>

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
        <button className="prev-track" aria-label="Previous track">
          <i className="fa fa-step-backward fa-1x"></i>
        </button>

        <button
          className="playpause-track"
          onClick={playPauseHandler}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <i className="fa fa-pause-circle fa-2x"></i>
          ) : (
            <i className="fa fa-play-circle fa-2x"></i>
          )}
        </button>

        <button className="next-track" aria-label="Next track">
          <i className="fa fa-step-forward fa-1x"></i>
        </button>
      </div>

      <div className="slider" onClick={seekSliderHandler} ref={sliderRef}>
        <div className="seek_slider_bg"></div>
        <div
          className="seek_slider"
          style={{ width: `${sliderValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
