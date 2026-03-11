import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../Header";
import Sidebar from "../Sidebar";
import VideoCard from "../VideoCard";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videosList, setVideosList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const { isDarkTheme, changeActiveTab } = useContext(ThemeContext);

  useEffect(() => {
    changeActiveTab("HOME");
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`;
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

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearch = () => {
    getVideos();
  };

  const onRetry = () => {
    getVideos();
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  const renderBanner = () => (
    <div className="banner" data-testid="banner">
      <button
        type="button"
        className="close-button"
        onClick={closeBanner}
        data-testid="close"
      >
        <AiOutlineClose className="close-icon" />
      </button>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="nxt watch logo"
        className="banner-logo"
      />
      <p className="banner-text">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button type="button" className="get-it-now-button">
        GET IT NOW
      </button>
    </div>
  );

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

  const renderNoVideosView = () => (
    <div className="no-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-videos-image"
      />
      <h1 className={`no-videos-heading ${isDarkTheme ? "dark" : ""}`}>
        No Search results found
      </h1>
      <p className={`no-videos-text ${isDarkTheme ? "dark" : ""}`}>
        Try different key words or remove search filter
      </p>
      <button type="button" className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );

  const renderVideosView = () => {
    if (videosList.length === 0) {
      return renderNoVideosView();
    }

    return (
      <ul className="videos-list">
        {videosList.map((video) => (
          <VideoCard key={video.id} videoDetails={video} />
        ))}
      </ul>
    );
  };

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
      <div className="home-container">
        <Sidebar />
        <div
          className={`home-content ${isDarkTheme ? "dark" : "light"}`}
          data-testid="home"
        >
          {showBanner && renderBanner()}
          <div className="search-container">
            <input
              type="search"
              className={`search-input ${isDarkTheme ? "dark" : ""}`}
              placeholder="Search"
              value={searchInput}
              onChange={onChangeSearchInput}
            />
            <button
              type="button"
              className={`search-button ${isDarkTheme ? "dark" : ""}`}
              onClick={onClickSearch}
              data-testid="searchButton"
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
          {renderAllVideos()}
        </div>
      </div>
    </>
  );
};

export default Home;
