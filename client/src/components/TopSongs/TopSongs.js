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
      const { data } = await getTopTracksLong();
      setTopTracks(data.items);
    };
    catchErrors(fetchData);
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range]();
    setTopTracks(data.items);
    setActiveRange(range);
  };

  const topTracksElem = topTracks
    ? topTracks.map((item, index) => (
        <div className="d-flex align-items-center" key={item.id}>
          <img
            className="w-25 p-2 h-auto rounded-2"
            src={item.album.images[0].url}
            alt={item.name}
          />

          <div className="d-flex flex-column">
            <div>{item.name}</div>
            <div className="d-flex flex-row gap-1">
              {item.artists.map((artist, index) => (
                <div key={index}>
                  {artist.name}
                  {index < item.artists.length - 1 ? " / " : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    : null;

  console.log(activeRange);

  return (
    <div className="blurry-card">
      <Timeline
        className=""
        onChangeRange={changeRange}
      ></Timeline>
      <div>{topTracksElem}</div>
    </div>
  );
}
