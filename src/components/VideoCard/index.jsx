import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ThemeContext } from "../../context/ThemeContext";
import "./index.css";

const VideoCard = ({ videoDetails }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id, title, thumbnailUrl, channel, viewCount, publishedAt } =
    videoDetails;

  const timeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <li className="video-card-item">
      <Link to={`/videos/${id}`} className="video-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="video-thumbnail"
        />
        <div className="video-details">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div className="video-info">
            <p className={`video-title ${isDarkTheme ? "dark" : ""}`}>
              {title}
            </p>
            <p className="video-meta">{channel.name}</p>
            <div className="video-stats">
              <p className="video-meta">{viewCount} views</p>
              <p className="video-meta dot">•</p>
              <p className="video-meta">{timeAgo}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoCard;
