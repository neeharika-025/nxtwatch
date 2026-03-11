import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.css";

const NotFound = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  const notFoundImgUrl = isDarkTheme
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";

  return (
    <>
      <Header />
      <div className="not-found-container">
        <Sidebar />
        <div className={`not-found-content ${isDarkTheme ? "dark" : "light"}`}>
          <img
            src={notFoundImgUrl}
            alt="not found"
            className="not-found-image"
          />
          <h1 className={`not-found-heading ${isDarkTheme ? "dark" : ""}`}>
            Page Not Found
          </h1>
          <p className={`not-found-text ${isDarkTheme ? "dark" : ""}`}>
            we are sorry, the page you requested could not be found.
          </p>
          <Link to="/">
            <button type="button" className="home-button">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
