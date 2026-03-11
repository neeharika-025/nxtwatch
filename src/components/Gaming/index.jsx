import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import { ThreeDots } from "react-loader-spinner";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Gaming = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videosList, setVideosList] = useState([]);

  const { isDarkTheme, changeActiveTab } = useContext(ThemeContext);

  useEffect(() => {
    changeActiveTab("GAMING");
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/videos/gaming";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = data.videos.map((video) => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }));
      setVideosList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onRetry = () => {
    getVideos();
  };

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots
        color={isDarkTheme ? "#ffffff" : "#3b82f6"}
        height="50"
        width="50"
      />
    </div>
  );

  const renderFailureView = () => {
    const failureImgUrl = isDarkTheme
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";

    return (
      <div className="failure-container">
        <img src={failureImgUrl} alt="failure view" className="failure-image" />
        <h1 className={`failure-heading ${isDarkTheme ? "dark" : ""}`}>
          Oops! Something Went Wrong
        </h1>
        <p className={`failure-text ${isDarkTheme ? "dark" : ""}`}>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button" className="retry-button" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  };

  const renderVideosView = () => (
    <ul className="gaming-videos-list">
      {videosList.map((video) => (
        <li key={video.id} className="gaming-video-item">
          <Link to={`/videos/${video.id}`} className="gaming-video-link">
            <img
              src={video.thumbnailUrl}
              alt="video thumbnail"
              className="gaming-video-thumbnail"
            />
            <div className="gaming-video-details">
              <p className={`gaming-video-title ${isDarkTheme ? "dark" : ""}`}>
                {video.title}
              </p>
              <p className="gaming-video-meta">
                {video.viewCount} Watching Worldwide
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderAllVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoader();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="gaming-container">
        <Sidebar />
        <div
          className={`gaming-content ${isDarkTheme ? "dark" : "light"}`}
          data-testid="gaming"
        >
          <div
            className={`gaming-banner ${isDarkTheme ? "dark" : "light"}`}
            data-testid="banner"
          >
            <div
              className={`gaming-icon-container ${isDarkTheme ? "dark" : "light"}`}
            >
              <SiYoutubegaming className="gaming-icon" />
            </div>
            <h1 className={`gaming-heading ${isDarkTheme ? "dark" : ""}`}>
              Gaming
            </h1>
          </div>
          {renderAllVideos()}
        </div>
      </div>
    </>
  );
};

export default Gaming;
