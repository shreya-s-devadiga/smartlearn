import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dyslexia from './pages/Dyslexia'
import Emotion from './pages/Emotion'
import Rewards from './pages/Rewards'
import Login from './pages/Login'
import Register from './pages/Register'
import LearningModes from './pages/LearningModes'
import Accessibility from "./pages/Accessibility";  
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ManageUsers from './pages/ManageUsers';
import UserProgress from "./pages/UserProgress";

import './styles.css'

// ✅ Check if user is logged in
const isLoggedIn = () => localStorage.getItem("user") !== null;

export default function App(){
  const user = isLoggedIn() ? JSON.parse(localStorage.getItem("user")) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>

      {/* NAVBAR - IMPROVED UI */}
      <nav className="navbar-improved">
        <div className="nav-container">
          {/* Brand */}
          <NavLink to="/" className="nav-brand-improved">
            🧠 SmartLearn
          </NavLink>

          {/* Navigation Links */}
          {isLoggedIn() && (
            <div className="nav-links-improved">
              {user?.role === "ADMIN" ? (
                // 🧩 Admin sees only this link
                <NavLink to="/admin" className="nav-link-improved">
                  ⚙️ Admin
                </NavLink>
              ) : (
                // 👩‍🎓 Regular users see these
                <>
                  <NavLink to="/dashboard" className="nav-link-improved">
                    🏠 Dashboard
                  </NavLink>
                  <NavLink to="/emotion" className="nav-link-improved">
                    😊 Emotions
                  </NavLink>
                  <NavLink to="/rewards" className="nav-link-improved">
                    ⭐ Rewards
                  </NavLink>
                  <NavLink to="/profile" className="nav-link-improved">
                    👤 Profile
                  </NavLink>
                  <NavLink to="/accessibility" className="nav-link-improved">
                    ♿ Accessibility
                  </NavLink>
                </>
              )}
            </div>
          )}

          {/* Auth Section */}
          <div className="nav-auth-improved">
            {isLoggedIn() ? (
              <div className="user-section-improved">
                <span className="welcome-text">Welcome, {user?.fullname}</span>
                <button
                  className="logout-btn-improved"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons-improved">
                <NavLink to="/login" className="login-btn-improved">
                  Login
                </NavLink>
                <NavLink to="/register" className="register-btn-improved">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <div className="container py-4">
        <Routes>
          <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/dashboard" element={isLoggedIn() ? <LearningModes /> : <Navigate to="/login" />} />
          <Route path="/dyslexia" element={isLoggedIn() ? <Dyslexia /> : <Navigate to="/login" />} />
          <Route path="/emotion" element={isLoggedIn() ? <Emotion /> : <Navigate to="/login" />} />
          <Route path="/rewards" element={isLoggedIn() ? <Rewards /> : <Navigate to="/login" />} />
          <Route path="/accessibility" element={isLoggedIn() ? <Accessibility /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path="/admin/user-progress" element={<AdminRoute><UserProgress /></AdminRoute>} />
        </Routes>
      </div>

      {/* Embedded Style (kept exactly as you provided) */}
      <style jsx>{`
        .navbar-improved {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .nav-brand-improved {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .nav-brand-improved:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-links-improved {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-link-improved {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          color: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-link-improved:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-link-improved.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .nav-auth-improved {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-section-improved {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }

        .welcome-text {
          font-size: 0.9rem;
          opacity: 0.9;
          font-weight: 500;
        }

        .logout-btn-improved {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-btn-improved:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .auth-buttons-improved {
          display: flex;
          gap: 1rem;
        }

        .login-btn-improved {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .login-btn-improved:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .register-btn-improved {
          background: white;
          color: #667eea;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid white;
        }

        .register-btn-improved:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .nav-links-improved {
            flex-wrap: wrap;
            justify-content: center;
          }

          .nav-link-improved {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .nav-links-improved {
            gap: 0.25rem;
          }

          .nav-link-improved {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .welcome-text {
            display: none;
          }

          .logout-btn-improved,
          .login-btn-improved,
          .register-btn-improved {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.75rem;
          }

          .nav-brand-improved {
            font-size: 1.2rem;
            padding: 0.4rem 0.8rem;
          }

          .nav-links-improved {
            gap: 0.2rem;
          }

          .nav-link-improved {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }

          .auth-buttons-improved {
            gap: 0.5rem;
          }

          .logout-btn-improved,
          .login-btn-improved,
          .register-btn-improved {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </BrowserRouter>
  )
}
