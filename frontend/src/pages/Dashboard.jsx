import React from 'react'

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user')); // get logged in user
  
  return (
    <div>
      <h2 className="mb-3">Welcome back, {user?.fullname || user?.username || "Learner"}! 👋</h2>

      <div className="row g-3">
        {[
          {title:'Interactive Lessons', path:'/learning-modes', desc:'Engaging visual and audio-based learning.', icon:'📚'},
          {title:'Emotion Tracker', path:'/emotion', desc:'Check how you feel and take calming breaks.', icon:'😊'},
          {title:'Rewards & Challenges', path:'/rewards', desc:'Earn stars and unlock fun badges!', icon:'🏆'},
          {title:'Accessibility', path:'/Accessibility', desc:'Adjust colors, fonts, and focus modes.', icon:'♿'}
        ].map((c,i)=>(
          <div key={i} className="col-md-6 col-lg-3">
            <a href={c.path} className="text-decoration-none text-dark">
              <div className="card card-hover h-100">
                <div className="card-body">
                  <div className="fs-1">{c.icon}</div>
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">{c.desc}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
