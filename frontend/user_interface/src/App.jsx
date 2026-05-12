import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-logo">PostGram</Link>
        <div className="nav-links">
          <Link to="/feed" className="nav-link">Feed</Link>
          <Link to="/CreatePost" className="nav-link">Share</Link>
        </div>
      </nav>
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App