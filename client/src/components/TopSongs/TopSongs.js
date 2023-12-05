import React, { useState, useEffect } from "react";
import "./styles.scss";
import Timeline from "../Timeline/Timeline";
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
} from "../../spotify";
import { catchErrors } from "../../utils";

export default function TopSongs() {
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
          />

          <div className="d-flex flex-column">
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
    <div className="blurry-card text-white mb-2">
      <Timeline className="" onChangeRange={changeRange}></Timeline>
      <div>{topTracksElem}</div>
    </div>
  );
}
