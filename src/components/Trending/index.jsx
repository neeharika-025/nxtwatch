import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AiFillFire } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { formatDistanceToNow } from "date-fns";
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

const Trending = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videosList, setVideosList] = useState([]);

  const { isDarkTheme, changeActiveTab } = useContext(ThemeContext);

  useEffect(() => {
    changeActiveTab("TRENDING");
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/videos/trending";
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
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
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
    <ul className="trending-videos-list">
      {videosList.map((video) => {
        const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
          addSuffix: true,
        });

        return (
          <li key={video.id} className="trending-video-item">
            <Link to={`/videos/${video.id}`} className="trending-video-link">
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                className="trending-video-thumbnail"
              />
              <div className="trending-video-details">
                <p
                  className={`trending-video-title ${isDarkTheme ? "dark" : ""}`}
                >
                  {video.title}
                </p>
                <p className="trending-video-meta">{video.channel.name}</p>
                <div className="trending-video-stats">
                  <p className="trending-video-meta">{video.viewCount} views</p>
                  <p className="trending-video-meta dot">•</p>
                  <p className="trending-video-meta">{timeAgo}</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
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
      <div className="trending-container">
        <Sidebar />
        <div
          className={`trending-content ${isDarkTheme ? "dark" : "light"}`}
          data-testid="trending"
        >
          <div
            className={`trending-banner ${isDarkTheme ? "dark" : "light"}`}
            data-testid="banner"
          >
            <div
              className={`trending-icon-container ${isDarkTheme ? "dark" : "light"}`}
            >
              <AiFillFire className="trending-icon" />
            </div>
            <h1 className={`trending-heading ${isDarkTheme ? "dark" : ""}`}>
              Trending
            </h1>
          </div>
          {renderAllVideos()}
        </div>
      </div>
    </>
  );
};

export default Trending;
