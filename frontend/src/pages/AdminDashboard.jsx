import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services_api";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(res => setStats(res.data))
      .catch(err => console.log("Dashboard Load Error:", err));
  }, []);

  if (!stats) return <h3 className="text-center mt-5">Loading Dashboard...</h3>;

  return (
    <div className="container py-4">

      <h2 className="fw-bold text-center mb-4">📊 Admin Dashboard</h2>

      <div className="row g-4">

        {/* ✅ Total Students */}
        <div className="col-md-4">
          <div className="dashboard-card shadow-lg p-4 text-center rounded-4">
            <h5 className="text-muted">Total Students</h5>
            <h1 className="fw-bold">{stats.totalUsers}</h1>
          </div>
        </div>

        {/* ✅ User Progress (New Card) */}
        <div className="col-md-4">
          <Link to="/admin/user-progress" style={{ textDecoration: "none" }}>
            <div className="dashboard-card shadow-lg p-4 text-center rounded-4 hover-pointer">
              <h5 className="text-muted">User Learning Progress</h5>
              <h3 className="fw-bold text-primary">View Details →</h3>
            </div>
          </Link>
        </div>

        {/* ✅ Total Reward Points */}
        <div className="col-md-4">
          <div className="dashboard-card shadow-lg p-4 text-center rounded-4">
            <h5 className="text-muted">Total Reward Points</h5>
            <h1 className="fw-bold">{stats.totalRewardPoints}</h1>
          </div>
        </div>

      </div>

      {/* Manage Users Card */}
      <div className="mt-5 text-center">
        <div className="card shadow p-4 rounded-4">
          <h4 className="fw-bold">👥 User Management</h4>
          <p className="text-muted">View and manage registered users</p>
          <Link to="/admin/manage-users" className="btn btn-primary btn-lg mt-2">
            Manage Users
          </Link>
        </div>
      </div>

      {/* Small hover CSS */}
      <style>{`
        .hover-pointer:hover {
          transform: translateY(-5px);
          transition: 0.3s;
          cursor: pointer;
        }
      `}</style>

    </div>
  );
}
