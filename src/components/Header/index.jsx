import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { ThemeContext } from "../../context/ThemeContext";
import "./index.css";

const Header = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const logoUrl = isDarkTheme
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";

  return (
    <nav className={`header-container ${isDarkTheme ? "dark" : "light"}`}>
      <Link to="/">
        <img src={logoUrl} alt="website logo" className="header-logo" />
      </Link>

      <div className="header-actions">
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          data-testid="theme"
        >
          {isDarkTheme ? (
            <FiSun className="theme-icon" />
          ) : (
            <FiMoon className="theme-icon-dark" />
          )}
        </button>

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-image desktop-only"
        />

        <Popup
          modal
          trigger={
            <button type="button" className="hamburger-button mobile-only">
              <GiHamburgerMenu
                className={isDarkTheme ? "menu-icon-dark" : "menu-icon"}
              />
            </button>
          }
          className="popup-content"
        >
          {(close) => (
            <div className={`menu-popup ${isDarkTheme ? "dark" : "light"}`}>
              <button type="button" className="close-button" onClick={close}>
                <IoMdClose
                  className={isDarkTheme ? "close-icon-dark" : "close-icon"}
                />
              </button>
              <ul className="mobile-menu-list">
                <Link to="/" className="menu-link" onClick={close}>
                  <li className={`menu-item ${isDarkTheme ? "dark" : ""}`}>
                    <AiFillHome className="menu-item-icon" />
                    <span>Home</span>
                  </li>
                </Link>
                <Link to="/trending" className="menu-link" onClick={close}>
                  <li className={`menu-item ${isDarkTheme ? "dark" : ""}`}>
                    <AiFillFire className="menu-item-icon" />
                    <span>Trending</span>
                  </li>
                </Link>
                <Link to="/gaming" className="menu-link" onClick={close}>
                  <li className={`menu-item ${isDarkTheme ? "dark" : ""}`}>
                    <SiYoutubegaming className="menu-item-icon" />
                    <span>Gaming</span>
                  </li>
                </Link>
                <Link to="/saved-videos" className="menu-link" onClick={close}>
                  <li className={`menu-item ${isDarkTheme ? "dark" : ""}`}>
                    <MdPlaylistAdd className="menu-item-icon" />
                    <span>Saved Videos</span>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </Popup>

        <Popup
          modal
          trigger={
            <button type="button" className="logout-button desktop-only">
              Logout
            </button>
          }
          className="popup-content"
        >
          {(close) => (
            <div className={`logout-popup ${isDarkTheme ? "dark" : "light"}`}>
              <p className={`logout-text ${isDarkTheme ? "dark" : ""}`}>
                Are you sure, you want to logout?
              </p>
              <div className="logout-buttons">
                <button type="button" className="cancel-button" onClick={close}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={onClickLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>

        <Popup
          modal
          trigger={
            <button type="button" className="logout-icon-button mobile-only">
              <FiLogOut
                className={isDarkTheme ? "logout-icon-dark" : "logout-icon"}
              />
            </button>
          }
          className="popup-content"
        >
          {(close) => (
            <div className={`logout-popup ${isDarkTheme ? "dark" : "light"}`}>
              <p className={`logout-text ${isDarkTheme ? "dark" : ""}`}>
                Are you sure, you want to logout?
              </p>
              <div className="logout-buttons">
                <button type="button" className="cancel-button" onClick={close}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={onClickLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  );
};

export default Header;
