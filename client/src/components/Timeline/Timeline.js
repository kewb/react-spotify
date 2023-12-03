import React from "react";
import "./styles.scss";

export default function Timeline() {
  return (
    <div className="container-fluid d-flex justify-content-end  confined">
      <ul id="timeline">
        <li className="timeline-button short_term">4 weeks</li>
        <li className="timeline-button medium_term">6 months</li>
        <li className="timeline-button long_term">lifetime</li>
        <li className="timeline-button limit">show all</li>
      </ul>
    </div>
  );
}
