import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
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

const VideoItemDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videoDetails, setVideoDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const { isDarkTheme, addToSavedVideos, removeFromSavedVideos, isVideoSaved } =
    useContext(ThemeContext);
  const { id } = useParams();

  useEffect(() => {
    getVideoDetails();
  }, [id]);

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/videos/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      };
      setVideoDetails(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onRetry = () => {
    getVideoDetails();
  };

  const onClickLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) {
      setIsDisliked(false);
    }
  };

  const onClickDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) {
      setIsLiked(false);
    }
  };

  const onClickSave = () => {
    if (isVideoSaved(videoDetails.id)) {
      removeFromSavedVideos(videoDetails.id);
    } else {
      addToSavedVideos(videoDetails);
    }
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

  const renderVideoDetailsView = () => {
    const { title, videoUrl, channel, viewCount, publishedAt, description } =
      videoDetails;

    const timeAgo = formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    });
    const isSaved = isVideoSaved(videoDetails.id);

    return (
      <div className="video-details-container">
        <div className="video-player-container">
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </div>

        <h1 className={`video-details-title ${isDarkTheme ? "dark" : ""}`}>
          {title}
        </h1>

        <div className="video-details-info">
          <div className="video-stats-container">
            <p className="video-stats-text">{viewCount} views</p>
            <p className="video-stats-text dot">•</p>
            <p className="video-stats-text">{timeAgo}</p>
          </div>

          <div className="video-actions">
            <button
              type="button"
              className={`action-button ${isLiked ? "active" : ""}`}
              onClick={onClickLike}
            >
              {isLiked ? (
                <AiFillLike className="action-icon" />
              ) : (
                <AiOutlineLike className="action-icon" />
              )}
              <span>Like</span>
            </button>

            <button
              type="button"
              className={`action-button ${isDisliked ? "active" : ""}`}
              onClick={onClickDislike}
            >
              {isDisliked ? (
                <AiFillDislike className="action-icon" />
              ) : (
                <AiOutlineDislike className="action-icon" />
              )}
              <span>Dislike</span>
            </button>

            <button
              type="button"
              className={`action-button ${isSaved ? "active" : ""}`}
              onClick={onClickSave}
            >
              {isSaved ? (
                <MdPlaylistAddCheck className="action-icon" />
              ) : (
                <MdPlaylistAdd className="action-icon" />
              )}
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        <hr className={`separator ${isDarkTheme ? "dark" : ""}`} />

        <div className="channel-details">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="channel-profile-image"
          />
          <div className="channel-info">
            <p className={`channel-name ${isDarkTheme ? "dark" : ""}`}>
              {channel.name}
            </p>
            <p className="channel-subscribers">
              {channel.subscriberCount} subscribers
            </p>
            <p className={`video-description ${isDarkTheme ? "dark" : ""}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderVideoDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideoDetailsView();
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
      <div className="video-item-details-container">
        <Sidebar />
        <div
          className={`video-item-details-content ${isDarkTheme ? "dark" : "light"}`}
          data-testid="videoItemDetails"
        >
          {renderVideoDetails()}
        </div>
      </div>
    </>
  );
};

export default VideoItemDetails;
