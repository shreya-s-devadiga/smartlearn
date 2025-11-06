import React from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Dyslexia from './pages/Dyslexia'
import Emotion from './pages/Emotion'
import Rewards from './pages/Rewards'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles.css'

export default function App(){
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <NavLink to="/" className="navbar-brand fw-bold">SmartLearn</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink to="/dashboard" className="nav-link">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/emotion" className="nav-link">Emotions</NavLink></li>
            <li className="nav-item"><NavLink to="/rewards" className="nav-link">Rewards</NavLink></li>
            <li className="nav-item"><NavLink to="/dyslexia" className="nav-link">Dyslexia</NavLink></li>
          </ul>
          <div className="d-flex gap-2">
  {localStorage.getItem("user") ? (
    <button 
      className="btn btn-danger"
      onClick={() => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }}
    >
      Logout
    </button>
  ) : (
    <>
      <NavLink to="/login" className="btn btn-warning">Login</NavLink>
      <NavLink to="/register" className="btn btn-light">Register</NavLink>
    </>
  )}
</div>

        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emotion" element={<Emotion />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/dyslexia" element={<Dyslexia />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}