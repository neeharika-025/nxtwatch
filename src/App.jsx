import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import VideoItemDetails from "./components/VideoItemDetails";
import SavedVideos from "./components/SavedVideos";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <Trending />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gaming"
        element={
          <ProtectedRoute>
            <Gaming />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videos/:id"
        element={
          <ProtectedRoute>
            <VideoItemDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-videos"
        element={
          <ProtectedRoute>
            <SavedVideos />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ThemeProvider>
);

export default App;
