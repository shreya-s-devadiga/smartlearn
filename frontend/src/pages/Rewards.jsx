import React, { useState, useEffect } from "react";

export default function Rewards() {
  const user = JSON.parse(localStorage.getItem("user"));
  const KEY = `smartlearn_profile_${user?.id || "guest"}`;

  const getProfile = () => {
    const saved = localStorage.getItem(KEY);
    if (!saved) {
      const obj = { stars: 0, badges: [] };
      localStorage.setItem(KEY, JSON.stringify(obj));
      return obj;
    }
    return JSON.parse(saved);
  };

  const [profile, setProfile] = useState(getProfile());

  const badges = [
    { name: "🌟 Star Collector", required: 20 },
    { name: "🏆 Word Master", required: 50 },
    { name: "🚀 Speed Reader", required: 100 },
    { name: "💎 Super Learner", required: 200 }
  ];

  return (
    <div className="rewards-container text-center">
      <h2 className="rewards-title">Your Rewards</h2>

      {/* Star Count Box */}
      <div className="stars-box">
        <h1>⭐ {profile.stars}</h1>
        <p>Total Stars Collected</p>
      </div>

      <style jsx>{`
        .rewards-container {
          max-width: 750px;
          margin: auto;
          padding: 40px 20px;
        }

        .rewards-title {
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 30px;
          color: #6a4cd4;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stars-box {
          background: linear-gradient(135deg, #fff7c2, #ffe680);
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
          border: 2px solid #ffd95b;
        }

        .stars-box h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #ff9800;
          margin-bottom: 5px;
        }

        .stars-box p {
          font-size: 1rem;
          color: #7a6a3a;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
