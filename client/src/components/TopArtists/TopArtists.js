import React, { useState, useEffect } from "react";
import "./styles.scss";
import Timeline from "../Timeline/Timeline";
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from "../../spotify";
import { catchErrors } from "../../utils";

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopArtistsLong,
    medium: getTopArtistsMedium,
    short: getTopArtistsShort,
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsLong();
      setTopArtists(data.items);
    };
    catchErrors(fetchData);
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range]();
    setTopArtists(data.items);
    setActiveRange(range);
  };

  const topArtistsElem = topArtists
    ? topArtists.map((item, index) => (
        <div className="d-flex align-items-center" key={item.id}>
          <div>{index + 1}</div>
          <img
            className="artist-img m-2"
            src={item.images[1].url}
            alt={item.name}
          />

          <div className="d-flex align-items-center">
            <div>{item.name}</div>
          </div>
        </div>
      ))
    : null;
  return (
    <div className="blurry-card">
      <Timeline className="" onChangeRange={changeRange}></Timeline>
      <div className="text-white">{topArtistsElem}</div>
    </div>
  );
}
