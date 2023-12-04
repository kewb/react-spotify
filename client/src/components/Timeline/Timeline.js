// Timeline.js
import React from "react";
import "./styles.scss";

const Timeline = ({ onChangeRange }) => {
  return (
    <div className="container-fluid d-flex">
      <ul id="timeline">
        <li
          className="timeline-button short_term"
          onClick={() => onChangeRange("short")}
        >
          4 weeks
        </li>

        <li
          className="timeline-button medium_term"
          onClick={() => onChangeRange("medium")}
        >
          6 weeks
        </li>

        <li
          className="timeline-button long_term"
          onClick={() => {
            onChangeRange("long");
          }}
        >
          lifetime
        </li>
        <li
          className="timeline-button limit"
          onClick={() => {
            console.log("limit check")
          }}
        >
          limit
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
