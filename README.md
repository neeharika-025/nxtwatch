# Nxt Watch - Video Streaming Platform

A complete YouTube-like video streaming platform built with React.js, featuring authentication, video browsing, search functionality, and theme switching.

## Features

### 🔐 Authentication

- Login with JWT token authentication
- Protected routes for authenticated users
- Session persistence using cookies
- Show/hide password toggle

### 🎨 Theme Support

- Light and Dark theme toggle
- Theme preserved across components using Context API
- Smooth theme transitions

### 🏠 Home Route

- Video search functionality
- Premium banner with dismiss option
- Grid layout of videos
- API integration with loader and error states
- No results view

### 🔥 Trending Route

- List of trending videos
- Detailed video cards with metadata
- Banner with trending icon

### 🎮 Gaming Route

- Gaming videos grid layout
- Unique gaming video card design
- Banner with gaming icon

### 📹 Video Item Details

- Video player using react-player
- Like, Dislike, and Save functionality
- Channel information
- Video description
- Related metadata (views, publish date)

### 💾 Saved Videos

- List of saved videos
- Add/Remove from saved videos
- Empty state when no videos saved
- Persistent saved videos during session

### 🚫 Not Found Route

- Custom 404 page
- Navigation back to home

## Tech Stack

- **React 18** - UI library
- **React Router DOM v6** - Routing
- **Context API** - State management
- **React Player** - Video playback
- **Reactjs Popup** - Modal popups
- **React Icons** - Icon library
- **React Loader Spinner** - Loading states
- **date-fns** - Date formatting
- **js-cookie** - Cookie management
- **Styled Components** - Component styling

## Project Structure

```
src/
├── App.jsx                          # Main app component with routes
├── context/
│   └── ThemeContext.jsx             # Theme and saved videos context
├── components/
│   ├── Login/
│   │   ├── index.jsx               # Login form component
│   │   └── index.css               # Login styles
│   ├── Header/
│   │   ├── index.jsx               # Header with theme toggle & logout
│   │   └── index.css               # Header styles
│   ├── Sidebar/
│   │   ├── index.jsx               # Navigation sidebar
│   │   └── index.css               # Sidebar styles
│   ├── Home/
│   │   ├── index.jsx               # Home route with search
│   │   └── index.css               # Home styles
│   ├── Trending/
│   │   ├── index.jsx               # Trending videos route
│   │   └── index.css               # Trending styles
│   ├── Gaming/
│   │   ├── index.jsx               # Gaming videos route
│   │   └── index.css               # Gaming styles
│   ├── VideoItemDetails/
│   │   ├── index.jsx               # Video player & details
│   │   └── index.css               # Video details styles
│   ├── SavedVideos/
│   │   ├── index.jsx               # Saved videos list
│   │   └── index.css               # Saved videos styles
│   ├── NotFound/
│   │   ├── index.jsx               # 404 page
│   │   └── index.css               # NotFound styles
│   ├── VideoCard/
│   │   ├── index.jsx               # Reusable video card
│   │   └── index.css               # Video card styles
│   └── ProtectedRoute/
│       └── index.jsx                # Route protection HOC
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. **Navigate to the project directory**

   ```bash
   cd nxtwatch
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will open at `http://localhost:3000`

## Login Credentials

```
Username: rahul
Password: rahul@2021
```

## API Endpoints

### Authentication

- **POST** `https://apis.ccbp.in/login` - User login

### Videos

- **GET** `https://apis.ccbp.in/videos/all?search=` - Home videos with search
- **GET** `https://apis.ccbp.in/videos/trending` - Trending videos
- **GET** `https://apis.ccbp.in/videos/gaming` - Gaming videos
- **GET** `https://apis.ccbp.in/videos/:id` - Video details

## Routes

| Route           | Description           |
| --------------- | --------------------- |
| `/login`        | Login page            |
| `/`             | Home page with videos |
| `/trending`     | Trending videos       |
| `/gaming`       | Gaming videos         |
| `/videos/:id`   | Video detail page     |
| `/saved-videos` | Saved videos list     |
| `*`             | 404 Not Found page    |

## Features Implementation

### Protected Routes

- All routes except `/login` are protected
- Redirects to login if no JWT token found
- Redirects to home if authenticated user tries to access login

### Theme Toggle

- Light/Dark theme switch in header
- Theme state managed via Context API
- Persistent theme across all components

### Video Actions

- **Like/Dislike**: Toggle between states (mutually exclusive)
- **Save**: Add/remove videos from saved list
- Visual feedback with active/inactive states

### Search

- Real-time search in home route
- Displays "No results" when search returns empty

### Responsive Design

Breakpoints:

- Mobile: < 576px
- Tablet: >= 576px
- Desktop: >= 768px
- Large Desktop: >= 992px
- Extra Large: >= 1200px

## Color Palette

### Light Theme

- Background: `#f9f9f9`
- Text: `#1e293b`
- Border: `#e2e8f0`

### Dark Theme

- Background: `#0f0f0f`
- Text: `#f1f1f1`
- Border: `#475569`

### Accent Colors

- Primary: `#3b82f6`
- Error: `#ff0b37`
- Active: `#2563eb`

## Testing Attributes

The application includes `data-testid` attributes for testing:

- `theme` - Theme toggle button
- `banner` - Banner sections
- `close` - Banner close button
- `searchButton` - Search button
- `loader` - Loading spinner
- `home`, `trending`, `gaming`, `savedVideos`, `videoItemDetails` - Route containers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

## Author

Built as part of React learning curriculum.
