import React, { useState, useEffect } from "react";
import "./styles.scss";
import Timeline from "../Timeline/Timeline";
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
} from "../../spotify";
import { catchErrors } from "../../utils";

export default function TopSongs({ onTrackSelect }) {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopTracksLong,
    medium: getTopTracksMedium,
    short: getTopTracksShort,
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiCalls[activeRange]();
      setTopTracks(data.items);
    };
    catchErrors(fetchData);
  }, [activeRange]);

  const fetchData = async (range) => {
    const { data } = await apiCalls[range]();
    setTopTracks(data.items);
  };

  useEffect(() => {
    fetchData(activeRange);
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range]();
    setTopTracks(data.items);
    setActiveRange(range);
  };

  const handleClick = (src, albumSrc, song, artist) => {
    onTrackSelect({ src, albumSrc, song, artist });
  };

  const topTracksElem = topTracks
    ? topTracks.map((item, index) => (
        <div className="d-flex align-items-center" key={item.id}>
          <div className="index" style={{ width: "20px" }}>
            {index + 1}
          </div>
          <img
            className="top-song-img m-1 h-auto rounded"
            src={item.album.images[0].url}
            alt={item.name}
            onClick={() =>
              handleClick(
                item.preview_url,
                item.album.images[1].url,
                item.name,
                item.artists
                  .map((artist, artistIndex) => artist.name)
                  .join(" / ")
              )
            }
            style={{ cursor: "pointer" }}
          />

          <div className="d-flex flex-column text-white">
            <div>{item.name}</div>
            <div className="d-flex flex-row gap-1">
              {item.artists.map((artist, artistIndex) => (
                <div key={artistIndex}>
                  {artist.name}
                  {artistIndex < item.artists.length - 1 ? " / " : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    : null;

  return (
    <div id="top-songs-container">
      <div className="blurry-card mb-2">
        <div className="title px-3">TOP SONGS</div>
        <Timeline className="" onChangeRange={changeRange}></Timeline>
        <div>{topTracksElem}</div>
      </div>
    </div>
  );
}
