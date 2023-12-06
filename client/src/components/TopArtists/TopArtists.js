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
  const [topArtists, setTopArtists] = useState([]);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopArtistsLong,
    medium: getTopArtistsMedium,
    short: getTopArtistsShort,
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiCalls[activeRange]();
      setTopArtists(data.items);
    };
    catchErrors(fetchData);
  }, [activeRange]);

  const fetchData = async (range) => {
    const { data } = await apiCalls[range]();
    setTopArtists(data.items);
  };

  useEffect(() => {
    fetchData(activeRange);
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range]();
    setTopArtists(data.items);
    setActiveRange(range);
  };

  const topArtistsElem = topArtists ? (
    topArtists.map((item, index) => (
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
  ) : (
    <div>Loading...</div>
  );
  return (
    <div id="top-artists">
      {" "}
      <div className="blurry-card">
        <div className="title px-3">TOP ARTISTS</div>
        <Timeline className="" onChangeRange={changeRange}></Timeline>
        <div className="text-white">{topArtistsElem}</div>
      </div>
    </div>
  );
}
