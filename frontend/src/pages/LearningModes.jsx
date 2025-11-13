import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LearningModes() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ If user is not logged in → redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const modes = [
    { 
      title: "🔤 Phonemic Awareness", 
      desc: "Master letter sounds and phonemes", 
      link: "/dyslexia?mode=phonemic-awareness",
      color: "linear-gradient(135deg,#6671F6,#5D9EFF)"
    },
    { 
      title: "🎶 Rhyming Patterns", 
      desc: "Develop rhyme recognition skills", 
      link: "/dyslexia?mode=rhyming-patterns",
      color: "linear-gradient(135deg,#FF6B6B,#FF8E53)"
    },
    { 
      title: "✨ Word Building", 
      desc: "Construct words from letters and syllables", 
      link: "/dyslexia?mode=word-building",
      color: "linear-gradient(135deg,#4ECDC4,#44A08D)"
    },
    { 
      title: "🎤 Syllable Mastery", 
      desc: "Break words into syllables", 
      link: "/dyslexia?mode=syllable-mastery",
      color: "linear-gradient(135deg,#FFA726,#FF7043)"
    },
    { 
      title: "🤫 Silent Letter Detective", 
      desc: "Identify and master silent letters", 
      link: "/dyslexia?mode=silent-detective",
      color: "linear-gradient(135deg,#AB47BC,#8E24AA)"
    },
    // { 
    //   title: "🧠 Memory & Sequencing", 
    //   desc: "Improve working memory with patterns", 
    //   link: "/dyslexia?mode=memory-sequencing",
    //   color: "linear-gradient(135deg,#26C6DA,#00ACC1)"
    // },
    { 
      title: "⚡ Rapid Naming", 
      desc: "Build automaticity with letters and words", 
      link: "/dyslexia?mode=rapid-naming",
      color: "linear-gradient(135deg,#FF4081,#F50057)"
    },
    { 
      title: "📖 Reading Fluency", 
      desc: "Practice reading with support", 
      link: "/dyslexia?mode=reading-fluency",
      color: "linear-gradient(135deg,#66BB6A,#4CAF50)"
    },
  ];

  return (
    <div className="container mt-4">
      {/* ✅ Header with Username + Logout */}
      

      <h2 className="text-center fw-bold mb-4">Choose Your Learning Path </h2>
      <p className="text-center text-muted mb-4">Select an activity to build your reading skills step by step</p>

      <div className="row g-4 justify-content-center">
        {modes.map((m, i) => (
          <motion.div
            key={i}
            className="col-12 col-sm-6 col-lg-4"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <div
              className="p-4 rounded text-white shadow-lg h-100"
              style={{ 
                background: m.color, 
                cursor: "pointer",
                border: "3px solid rgba(255,255,255,0.2)"
              }}
              onClick={() => navigate(m.link)}
            >
              <h4 className="fw-bold mb-2">{m.title}</h4>
              <p className="mb-0" style={{ opacity: 0.95 }}>{m.desc}</p>
              <div className="mt-3 text-end">
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Start →
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Section */}
    
    </div>
  );
}