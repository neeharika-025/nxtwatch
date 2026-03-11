import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.css";

const SavedVideos = () => {
  const { isDarkTheme, savedVideos, changeActiveTab } =
    useContext(ThemeContext);

  useEffect(() => {
    changeActiveTab("SAVED");
  }, []);

  const renderNoSavedVideos = () => (
    <div className="no-saved-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-videos-image"
      />
      <h1 className={`no-saved-videos-heading ${isDarkTheme ? "dark" : ""}`}>
        No saved videos found
      </h1>
      <p className={`no-saved-videos-text ${isDarkTheme ? "dark" : ""}`}>
        You can save your videos while watching them
      </p>
    </div>
  );

  const renderSavedVideos = () => (
    <>
      <div
        className={`saved-videos-banner ${isDarkTheme ? "dark" : "light"}`}
        data-testid="banner"
      >
        <div
          className={`saved-videos-icon-container ${isDarkTheme ? "dark" : "light"}`}
        >
          <MdPlaylistAdd className="saved-videos-icon" />
        </div>
        <h1 className={`saved-videos-heading ${isDarkTheme ? "dark" : ""}`}>
          Saved Videos
        </h1>
      </div>

      <ul className="saved-videos-list">
        {savedVideos.map((video) => {
          const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
            addSuffix: true,
          });

          return (
            <li key={video.id} className="saved-video-item">
              <Link to={`/videos/${video.id}`} className="saved-video-link">
                <img
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                  className="saved-video-thumbnail"
                />
                <div className="saved-video-details">
                  <p
                    className={`saved-video-title ${isDarkTheme ? "dark" : ""}`}
                  >
                    {video.title}
                  </p>
                  <p className="saved-video-meta">{video.channel.name}</p>
                  <div className="saved-video-stats">
                    <p className="saved-video-meta">{video.viewCount} views</p>
                    <p className="saved-video-meta dot">•</p>
                    <p className="saved-video-meta">{timeAgo}</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <>
      <Header />
      <div className="saved-videos-container">
        <Sidebar />
        <div
          className={`saved-videos-content ${isDarkTheme ? "dark" : "light"}`}
          data-testid="savedVideos"
        >
          {savedVideos.length === 0
            ? renderNoSavedVideos()
            : renderSavedVideos()}
        </div>
      </div>
    </>
  );
};

export default SavedVideos;
