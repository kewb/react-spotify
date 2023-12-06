import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getRecentlyPlayed } from "../../spotify";
import { catchErrors } from "../../utils";
export default function History() {
  const [history, setHistory] = useState([
    {
      name: "Nil",
      artist: "Nil",
      img: "",
      id: "",
      played_at: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      const updatedHistory = data.items.map((item) => ({
        name: item.track.name,
        artist: item.track.artists[0].name, // Assuming first artist
        img: item.track.album.images[0].url, // Assuming first image
        id: item.track.id,
        played_at: item.played_at,
      }));

      setHistory(updatedHistory);
      console.log(data);
    };
    catchErrors(fetchData());
  }, []);

  const historyElem = history
    ? history.map((item, index) => (
        <div key={index} className="container">
          <div className="d-flex align-items-center text-white" key={index}>
            <div className="index" style={{ width: "20px" }}>
              {index + 1}
            </div>
            <img
              className="top-song-img m-1 h-auto rounded"
              src={item.img}
              alt={`album cover for ${item.name}`}
            />
            <div>
              <div>{item.name}</div>
              <div>{item.artist}</div>
            </div>
          </div>
        </div>
      ))
    : null;

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="blurry-card">
        <div className="title px-3">Track history</div>

        <div>{historyElem}</div>
      </div>
    </div>
  );
}
