import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user") !== null;

  const goToLearning = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Empower Learning with <span className="highlight">SmartLearn</span>
          </h1>
          <p>
            Personalized and inclusive learning support designed to help children grow confidently — one step at a time.
          </p>

          <button className="primary-btn" onClick={goToLearning}>
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>

        <div className="hero-illustration">
          <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="Learning Illustration" />
        </div>
      </section>


      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Learning Modes</h2>

        <div className="feature-grid">

          <div className="feature-card" onClick={() => navigate("/dyslexia")}>
            <i className="fas fa-text-height"></i>
            <h3>Dyslexia Learning</h3>
            <p>Interactive phonics, letter recognition, confidence-building exercises.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/emotion")}>
            <i className="fas fa-smile"></i>
            <h3>Emotional Support</h3>
            <p>Help learners express, understand, and regulate emotions positively.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/rewards")}>
            <i className="fas fa-star"></i>
            <h3>Rewards & Progress</h3>
            <p>Track learning progress and celebrate achievements with rewards!</p>
          </div>

        </div>
      </section>

    </div>
  );
}
