import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getRecentlyPlayed } from "../../spotify";
import { catchErrors } from "../../utils";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

export default function History() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let isMounted = true; // To prevent memory leaks

    const fetchData = async () => {
      try {
        const { data } = await getRecentlyPlayed();
        const updatedHistory = data.items.map((item) => ({
          name: item.track.name,
          artist: item.track.artists[0].name, // Assuming first artist
          img: item.track.album.images[0].url, // Assuming first image
          id: item.track.id,
          played_at: item.played_at,
          preview_url: item.track.preview_url,
        }));

        if (isMounted) {
          setHistory(updatedHistory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or provide feedback to the user
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  const handleClick = (src, albumSrc, song, artist) => {
    console.log("Clicked on:", song, "by", artist);
    
    // Set the new selected track in the state
    setSelectedTrack({ src, albumSrc, song, artist });
  };
  

  const historyElem = history.map((item, index) => (
    <div key={index} className="container">
      <div className="d-flex align-items-center text-white" key={index}>
        <div className="index" style={{ width: "20px" }}>
          {index + 1}
        </div>
        <img
          className="top-song-img m-1 h-auto rounded"
          src={item.img}
          alt={`album cover for ${item.name}`}
          onClick={() =>
            handleClick(item.preview_url, item.img, item.name, item.artist)
          }
          style={{ cursor: "pointer" }}
        />

        <div>
          <div>{item.name}</div>
          <div>{item.artist}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container-fluid"> {}
      <div className="d-flex justify-content-center">
        <div className="blurry-card">
          <div className="title px-3">Track history</div>
          <div>{historyElem}</div>
        </div>
      </div>
      {selectedTrack && (
  <MusicPlayer
    currentTrack={selectedTrack} // Pass the currentTrack object as a prop
  />
)}
    </div>
  );
}
