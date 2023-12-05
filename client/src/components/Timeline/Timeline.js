import React, { useState } from "react";
import "./styles.scss";

const Timeline = ({ onChangeRange }) => {
  const [active, setActive] = useState("long_term");

  return (
    <div className="container-fluid d-flex">
      <ul id="timeline">
        <li
          className={`timeline-button short_term ${active === "short_term" ? "active" : ""}`}
          onClick={() => {
            onChangeRange("short");
            setActive("short_term");
          }}
        >
          4 weeks
        </li>

        <li
          className={`timeline-button medium_term ${active === "medium_term" ? "active" : ""}`}
          onClick={() => {
            onChangeRange("medium");
            setActive("medium_term");
          }}
        >
          6 weeks
        </li>

        <li
          className={`timeline-button long_term ${active === "long_term" ? "active" : ""}`}
          onClick={() => {
            onChangeRange("long");
            setActive("long_term");
          }}
        >
          lifetime
        </li>
        <li
          className="timeline-button limit"
          onClick={() => {
            console.log("limit check");
          }}
        >
          {/* limit */}
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
