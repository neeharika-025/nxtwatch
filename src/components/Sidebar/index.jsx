import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext";
import "./index.css";

const Sidebar = () => {
  const { isDarkTheme, activeTab, changeActiveTab } = useContext(ThemeContext);

  return (
    <div className={`sidebar-container ${isDarkTheme ? "dark" : "light"}`}>
        <div className="side">

        
      <ul className="sidebar-menu">
        <Link
          to="/"
          className="sidebar-link"
          onClick={() => changeActiveTab("HOME")}
        >
          <li
            className={`sidebar-item ${activeTab === "HOME" ? "active" : ""} ${isDarkTheme ? "dark" : ""}`}
          >
            <AiFillHome className="sidebar-icon" />
            <span>Home</span>
          </li>
        </Link>

        <Link
          to="/trending"
          className="sidebar-link"
          onClick={() => changeActiveTab("TRENDING")}
        >
          <li
            className={`sidebar-item ${activeTab === "TRENDING" ? "active" : ""} ${isDarkTheme ? "dark" : ""}`}
          >
            <AiFillFire className="sidebar-icon" />
            <span>Trending</span>
          </li>
        </Link>

        <Link
          to="/gaming"
          className="sidebar-link"
          onClick={() => changeActiveTab("GAMING")}
        >
          <li
            className={`sidebar-item ${activeTab === "GAMING" ? "active" : ""} ${isDarkTheme ? "dark" : ""}`}
          >
            <SiYoutubegaming className="sidebar-icon" />
            <span>Gaming</span>
          </li>
        </Link>

        <Link
          to="/saved-videos"
          className="sidebar-link"
          onClick={() => changeActiveTab("SAVED")}
        >
          <li
            className={`sidebar-item ${activeTab === "SAVED" ? "active" : ""} ${isDarkTheme ? "dark" : ""}`}
          >
            <MdPlaylistAdd className="sidebar-icon" />
            <span>Saved Videos</span>
          </li>
        </Link>
      </ul>

      <div className="sidebar-footer">
        <h3 className={`sidebar-footer-heading ${isDarkTheme ? "dark" : ""}`}>
          CONTACT US
        </h3>
        <div className="social-icons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-icon"
          />
        </div>
        <p className={`sidebar-footer-text ${isDarkTheme ? "dark" : ""}`}>
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
