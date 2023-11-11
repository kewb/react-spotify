import React, { useState, useEffect } from "react";
import { getPlaylists } from "../../spotify";
import { catchErrors } from "../../utils";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import './styles.css'; // Import the CSS file



export default function Sidebar() {
  return (
    <div>
      <div id="sidebar-playlist">
        <div className="blurry-card ">
          <div className="sidebar-info">
              <img
                className="img-fluid"
                src="https://i.scdn.co/image/ab67757000003b82f5b898d69ffe69e2a656fb44"
                alt=""
              />
              <div className="playlist-info">
                <div className="sidebar-playlist-name">Boujee</div>
                <div className="sidebar-playlist-owner">Boujee</div>
              </div>
          </div>
          <div className="sidebar-info">
              <img
                className="img-fluid"
                src="https://i.scdn.co/image/ab67757000003b82f5b898d69ffe69e2a656fb44"
                alt=""
              />
              <div className="playlist-info">
                <div className="sidebar-playlist-name">Boujee</div>
                <div className="sidebar-playlist-owner">Boujee</div>
              </div>
          </div>
          <div className="sidebar-info">
              <img
                className="img-fluid"
                src="https://i.scdn.co/image/ab67757000003b82f5b898d69ffe69e2a656fb44"
                alt=""
              />
              <div className="playlist-info">
                <div className="sidebar-playlist-name">Boujee</div>
                <div className="sidebar-playlist-owner">Boujee</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
