import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  const handleContinueLearning = () => {
    navigate("/dashboard");
  };

  const handleViewProgress = () => {
    navigate("/rewards"); // Or create a dedicated progress page
    // Alternatively, you can show a modal with progress stats
    alert("Progress tracking coming soon! 🚀");
  };

  const handleEarnRewards = () => {
    navigate("/");
  };

  if (!user) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold gradient-text mb-3">My Profile</h1>
          <p className="text-muted">Welcome to your learning journey!</p>
        </div>

        <div className="row justify-content-center">
          {/* Profile Card - Centered */}
          <div className="col-lg-8">
            <motion.div 
              className="card profile-card shadow-lg border-0 rounded-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body p-4">
                {/* Profile Header */}
                <div className="text-center mb-4">
                  <motion.div
                    className="avatar-container mx-auto mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                      alt="profile"
                      className="avatar-img"
                    />
                    <div className="online-indicator"></div>
                  </motion.div>
                  
                  <h2 className="fw-bold mb-2">{user.fullname}</h2>
                  <motion.span 
                    className={`role-badge ${user.role === "ADMIN" ? 'admin' : 'student'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user.role === "ADMIN" ? "👑 Administrator" : "🎓 Student"}
                  </motion.span>
                </div>

                {/* User Info */}
                <div className="info-section">
                  <div className="info-item">
                    <div className="info-icon">👤</div>
                    <div className="info-content">
                      <label className="info-label">Username</label>
                      <p className="info-value">{user.username}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">📧</div>
                    <div className="info-content">
                      <label className="info-label">Email</label>
                      <p className="info-value">{user.email}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">📅</div>
                    <div className="info-content">
                      <label className="info-label">Member Since</label>
                      <p className="info-value">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">⭐</div>
                    <div className="info-content">
                      <label className="info-label">Learning Level</label>
                      <p className="info-value">Beginner Explorer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions - Now below the profile card */}
            <motion.div 
              className="quick-actions mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="row g-3">
                <div className="col-md-4">
                  <motion.button 
                    className="btn btn-primary w-100 p-3 rounded-3 action-btn"
                    onClick={handleContinueLearning}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="action-icon">🎮</div>
                    <div className="action-text">Continue Learning</div>
                  </motion.button>
                </div>
                <div className="col-md-4">
                  <motion.button 
                    className="btn btn-success w-100 p-3 rounded-3 action-btn"
                    onClick={handleViewProgress}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(40, 167, 69, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="action-icon">📊</div>
                    <div className="action-text">View Progress</div>
                  </motion.button>
                </div>
                <div className="col-md-4">
                  <motion.button 
                    className="btn btn-warning w-100 p-3 rounded-3 action-btn"
                    onClick={handleEarnRewards}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255, 193, 7, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="action-icon">⭐</div>
                    <div className="action-text">Earn Rewards</div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

           
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .avatar-container {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid #667eea;
          padding: 3px;
        }

        .online-indicator {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background: #28a745;
          border: 3px solid white;
          border-radius: 50%;
        }

        .role-badge {
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .role-badge.admin {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #000;
        }

        .role-badge.student {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .info-section {
          space-y: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          width: 40px;
          text-align: center;
        }

        .info-label {
          font-weight: 600;
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .info-value {
          font-weight: 500;
          color: #495057;
          margin: 0;
          font-size: 1rem;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          border: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-icon {
          font-size: 1.5rem;
        }

        .action-text {
          font-size: 0.9rem;
        }

        .learning-stats {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 2rem;
          color: white;
        }

        .stat-card {
          padding: 1rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .avatar-container {
            width: 100px;
            height: 100px;
          }
          
          .info-item {
            padding: 0.75rem 0;
          }
          
          .action-btn {
            padding: 1rem 0.5rem;
          }
          
          .learning-stats {
            padding: 1.5rem 1rem;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}