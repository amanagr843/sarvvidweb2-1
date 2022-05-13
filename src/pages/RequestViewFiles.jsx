import React, { useState } from "react";
import "./MiddlePaneRequest.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import {
  useTheme,
  useThemeUpdate,
  useMenuToggle,
  useMenuUpdateToggle,
} from "../contexts/themeContext";

// New

import moonImg from "../assets/img/moon.svg";
import sunImg from "../assets/img/sun.svg";
import MenuIcon from "@material-ui/icons/MenuRounded";
import sarvvidLogoDark from "../assets/img/sarvvidLogodark.svg";
import gridIcon from "../assets/img/grid.svg";
import gridDarkIcon from "../assets/img/griddark.svg";
import mascotReq1 from "../assets/img/mascot_req1.png";
import mascotReq2 from "../assets/img/mascot_req2.png";
import axios from "axios";
import fileDownload from "js-file-download";
import { useAlert } from "react-alert";
import { dark } from "@material-ui/core/styles/createPalette";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const RequestViewFiles = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle();
  const toggleBtn = useMenuUpdateToggle();
  const classes = useStyles();

  const [fileHash, setFileHash] = useState("");
  const newAlert = useAlert();

  const downloadIpfsFile = async () => {
    try {
      const response = await axios.get(
        `https://api.sarvvid-ai.com/ipfs/get/file/${fileHash}`
      );

      fileDownload(response.data, fileHash);
      newAlert.success("file downloaded successfully");

      console.log("ipfs download resonse", response);
    } catch (err) {
      console.log(err);
      newAlert.error(err.response.message || "Failed to download file");
    }
  };

  return (
    <div
      className={`middlePane ${toggleMenu ? "" : "opened"} ${
        darkTheme ? "dark-theme" : ""
      }`}
    >
      {/* <div className="middlePane_upper">
        <SearchBar />
        <div
          className={`theme-toggle ${darkTheme ? "dark" : ""}`}
          onClick={() => toggleTheme()}
        >
          <div className="theme-btn">
            <img src={moonIcon} alt="dark" />
            <img src={sunIcon} alt="light" />
          </div>
        </div>
      </div> */}
      <div className="mobile_header" style={{ marginTop: "2rem" }}>
        <div
          className={`menu-btn ${toggleBtn ? "" : "opened"}`}
          onClick={() => toggleBtn()}
        >
          <MenuIcon
            style={{
              fontSize: "2rem",
              color: `${darkTheme ? "#fafafa" : "#000"}`,
            }}
          />
        </div>
        <div className="min_logo">
          <img src={sarvvidLogoDark} alt="logo" />
        </div>
        <div
          className={`min-theme-toggle ${darkTheme ? "dark" : ""}`}
          onClick={() => toggleTheme()}
        >
          <div className="min_theme_toggle">
            <img src={moonImg} alt="mooon" />
            <img src={sunImg} alt="sun" />
          </div>
        </div>
      </div>
      <div
        className={`middlePane_cards_request ${darkTheme ? "dark" : ""}`}
        style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
      >
        <div className="requestFiles">
          <img className="requestFilesMascot1" src={mascotReq1} alt="mascot" />
          <div className="requestFiles_content">
            <h3>Download file from hash</h3>
            <input
              type="search"
              label="Search"
              placeholder="Enter hash"
              id="outlined-search"
              className={`searchBar_text  ${darkTheme ? "dark" : ""}`}
              value={fileHash}
              onChange={(e) => setFileHash(e.target.value)}
            />

            <p>Easily access files from a single hash 🚀</p>
            <button
              type="button"
              className="requestFiles_btn"
              onClick={() => {
                downloadIpfsFile();
              }}
            >
              Download
            </button>
          </div>
          <img className="requestFilesMascot2" src={mascotReq2} alt="mascot" />
        </div>
        {/* <div className="midPane-header">
          <div className="navigation-container">
            <div className="navigation-subcontainer">
              <h2 style={{ marginRight: "auto" }}>
               Request files
              </h2>
              <div style={{ display: "flex" }} className="button_depth">
                {darkTheme ? (
                  <img src={gridDarkIcon} alt="grid" />
                ) : (
                  <img style={{ opacity: "0.5" }} src={gridIcon} alt="grid" />
                )}
              </div>
            </div>

            <Navigation />
          </div>
        </div>
        <div className="table-header">
          <p>Name</p>
          <p>Size</p>
          <p>Type</p>
        </div>
        <Route path="*" component={Card} />
        <div
          className="footer_msg"
          style={{ marginTop: "2rem", color: "#acacac" }}
        >
          <p>Made for Web3. Made with love from bharat</p>
        </div> */}
      </div>
    </div>
  );
};

export default RequestViewFiles;
