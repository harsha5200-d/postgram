import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-logo">PostGram</Link>
        <div className="nav-links">
          <Link to="/feed" className="nav-link">Feed</Link>
          {user ? (
            <>
              <Link to="/CreatePost" className="nav-link">Share</Link>
              <button onClick={handleLogout} className="nav-link btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </nav>
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App