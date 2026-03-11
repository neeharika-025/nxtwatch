import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("HOME");

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const addToSavedVideos = (video) => {
    const isVideoAlreadySaved = savedVideos.find(
      (item) => item.id === video.id,
    );
    if (!isVideoAlreadySaved) {
      setSavedVideos((prevVideos) => [...prevVideos, video]);
    }
  };

  const removeFromSavedVideos = (videoId) => {
    setSavedVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId),
    );
  };

  const isVideoSaved = (videoId) => {
    return savedVideos.some((video) => video.id === videoId);
  };

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const value = {
    isDarkTheme,
    toggleTheme,
    savedVideos,
    addToSavedVideos,
    removeFromSavedVideos,
    isVideoSaved,
    activeTab,
    changeActiveTab,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
