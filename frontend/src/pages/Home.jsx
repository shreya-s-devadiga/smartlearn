import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const nav = useNavigate()
  return (
    <div className="hero text-center">
      <h1 className="display-5 fw-bold">Learning Made Joyful for Every Child</h1>
      <p className="lead">Personalized lessons, emotional support, and fun rewards in one place.</p>
      <button className="btn btn-warning btn-lg" onClick={()=>nav('/login')}>Get Started</button>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card card-hover">
            <div className="card-body">
              <h5 className="card-title">🧩 Dyslexia Aid</h5>
              <p className="card-text">Letter & word recognition games with audio support.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-hover">
            <div className="card-body">
              <h5 className="card-title">⚡ ADHD Focus</h5>
              <p className="card-text">Short quizzes, focus timers, and movement breaks.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-hover">
            <div className="card-body">
              <h5 className="card-title">🤖 Autism-Friendly</h5>
              <p className="card-text">Visual storyboards and emotion recognition games.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}