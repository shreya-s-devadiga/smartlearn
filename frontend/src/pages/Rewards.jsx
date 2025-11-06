import React from 'react'
export default function Rewards(){
  return (
    <div>
      <h2>🎉 Your Achievements</h2>
      <div className="d-flex gap-3 mt-3">
        <span className="badge text-bg-warning p-3 badge-glow">⭐ Star Learner</span>
        <span className="badge text-bg-primary p-3">🏅 Quick Thinker</span>
        <span className="badge text-bg-success p-3">🎨 Creative Mind</span>
      </div>
    </div>
  )
}