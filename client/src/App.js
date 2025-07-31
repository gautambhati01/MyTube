// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:5000/api/videos')
        .then(res => res.json())
        .then(data => setVideos(data))
        .catch(err => console.error('Failed to fetch videos:', err));
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === '12345') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login to MyTube</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <button className="menu-button" onClick={() => setNavOpen(!navOpen)}>
          &#9776;
        </button>
        <h1>MyTube</h1>
      </header>
      <div className="main">
        <nav className={`sidebar ${navOpen ? 'open' : ''}`}>
          <ul>
            <li>Home</li>
            <li>History</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="video-section">
          <h2>Music Videos</h2>
          {videos.length === 0 ? (
            <p>No videos found</p>
          ) : (
            <div className="video-list">
              {videos.map((video) => (
                <div className="video-card" key={video._id}>
                  <div className="video-wrapper">
                    <iframe
                      width="100%"
                      height="200"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h3 className="video-title">{video.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;


