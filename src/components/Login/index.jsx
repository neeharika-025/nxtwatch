import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThemeContext } from "../../context/ThemeContext";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setShowError(true);
    setErrorMsg(errorMsg);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const logoUrl = isDarkTheme
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";

  return (
    <div className={`login-container ${isDarkTheme ? "dark" : "light"}`}>
      <form
        className={`login-form ${isDarkTheme ? "dark" : "light"}`}
        onSubmit={onSubmitForm}
      >
        <img src={logoUrl} alt="website logo" className="login-logo" />

        <div className="input-container">
          <label
            htmlFor="username"
            className={`input-label ${isDarkTheme ? "dark" : ""}`}
          >
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className={`input-field ${isDarkTheme ? "dark" : ""}`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label
            htmlFor="password"
            className={`input-label ${isDarkTheme ? "dark" : ""}`}
          >
            PASSWORD
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`input-field ${isDarkTheme ? "dark" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox"
            className="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label
            htmlFor="checkbox"
            className={`checkbox-label ${isDarkTheme ? "dark" : ""}`}
          >
            Show Password
          </label>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {showError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
