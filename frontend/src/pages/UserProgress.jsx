import { useEffect, useState } from "react";
import { getUserProgress } from "../services_api";

export default function UserProgress() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserProgress()
      .then((res) => setData(res.data))
      .catch((err) => console.log("Progress Load Error:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">📘 User Learning Progress</h2>

      <div className="card shadow-lg p-4 rounded-4">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Lessons Completed</th>
              <th>Reward Points</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((u, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{u.id}</td>
                  <td>{u.fullname || "—"}</td>
                  <td>{u.username || "—"}</td>
                  <td>{u.lessons}</td>
                  <td>{u.rewards}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .card {
          border-radius: 16px;
          background: #ffffff;
          border: none;
        }

        table {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        thead th {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: 600;
        }

        tbody tr:hover {
          background-color: #f1f4ff;
          transition: background-color 0.2s ease;
        }

        h2 {
          color: #4b4b4b;
        }

        @media (max-width: 768px) {
          table {
            font-size: 0.9rem;
          }
          th, td {
            padding: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}
