import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Reward Logic (Per-user storage)
function addRewards(points) {
  const user = JSON.parse(localStorage.getItem("user"));
  const KEY = `smartlearn_profile_${user?.id || "guest"}`;

  const saved = JSON.parse(localStorage.getItem(KEY)) || { stars: 0, badges: [] };

  saved.stars += points;

  // 🎖️ Badge unlock logic
  if (saved.stars >= 50 && !saved.badges.includes("🌟 Star Hero"))
    saved.badges.push("🌟 Star Hero");

  if (saved.stars >= 100 && !saved.badges.includes("🏆 Learning Champion"))
    saved.badges.push("🏆 Learning Champion");

  localStorage.setItem(KEY, JSON.stringify(saved));
}

const activities = {
  "phonemic-awareness": {
    title: "🔤 Phonemic Awareness",
    description: "Listen and identify the correct sound",
    items: [
      { 
        type: "sound-match",
        
        display: "A", 
        correct: "Apple", 
        options: ["Apple", "Ball", "Cat", "Dog"],
        hint: "Which word starts with the 'a' sound?"
      },
      { 
        type: "sound-match",
        
        display: "B", 
        correct: "Ball", 
        options: ["Apple", "Ball", "Cat", "Dog"],
        hint: "Listen for the 'b' sound at the beginning"
      },
      { 
        type: "sound-match", 
        display: "C", 
        correct: "Cat", 
        options: ["Apple", "Ball", "Cat", "Dog"],
        hint: "Find the word with the 'k' sound"
      },
      { 
        type: "sound-match",
        display: "M", 
        correct: "Moon", 
        options: ["Moon", "Nest", "Orange", "Pen"],
        hint: "Which word begins with 'm'?"
      },
      { 
        type: "sound-match",
        display: "SH", 
        correct: "Ship", 
        options: ["Ship", "Chip", "Tip", "Sip"],
        hint: "Listen for the 'sh' sound"
      },
    ],
  },

  "rhyming-patterns": {
    title: "🎶 Rhyming Patterns",
    description: "Find words that rhyme with the target word",
    items: [
      { 
        type: "rhyme",
        display: "CAT", 
        correct: "HAT", 
        options: ["DOG", "HAT", "CAR", "BED"],
        hint: "Look for words that end with the same sound"
      },
      { 
        type: "rhyme",
        display: "FAN", 
        correct: "PAN", 
        options: ["PAN", "PEN", "FUN", "FIN"],
        hint: "Words that sound similar at the end"
      },
      { 
        type: "rhyme",
        display: "BELL", 
        correct: "WELL", 
        options: ["WALL", "WELL", "BALL", "BILL"],
        hint: "Which word rhymes with 'bell'?"
      },
      { 
        type: "rhyme",
        display: "CLOCK", 
        correct: "BLOCK", 
        options: ["BLOCK", "CLICK", "CLACK", "CLOAK"],
        hint: "Find the matching ending sound"
      },
      { 
        type: "rhyme",
        display: "RAIN", 
        correct: "TRAIN", 
        options: ["TRAIN", "RING", "ROAD", "RUNE"],
        hint: "Listen for the '-ain' sound"
      },
    ],
  },

  "word-building": {
    title: "✨ Word Building",
    description: "Drag letters to form the correct word",
    items: [
      { 
        type: "word-formation",
        correct: "CAT", 
        letters: ["C", "A", "T", "D", "G"],
        
        hint: "Sound it out: C-A-T"
      },
      { 
        type: "word-formation",
        correct: "DOG", 
        letters: ["D", "O", "G", "C", "T"],
        
        hint: "Put the letters in order: D-O-G"
      },
      { 
        type: "word-formation",
        correct: "SUN", 
        letters: ["S", "U", "N", "M", "P"],
        
        hint: "What shines in the sky? S-U-N"
      },
      // { 
      //   type: "word-formation",
      //   correct: "MOON", 
      //   letters: ["M", "O", "O", "N", "S", "T"],
        
      //   hint: "Two O's in the middle: M-O-O-N"
      // },
      { 
        type: "word-formation",
        correct: "FISH", 
        letters: ["F", "I", "S", "H", "C", "R"],
        
        hint: "Starts with F, ends with SH"
      },
    ],
  },

  "syllable-mastery": {
    title: "🎤 Syllable Mastery",
    description: "Clap and count the syllables in each word",
    items: [
      { 
        type: "syllables",
        word: "APPLE", 
        syllables: 2, 
        options: [1, 2, 3],
        
        hint: "Say it slowly: Ap-ple (2 claps)"
      },
      { 
        type: "syllables",
        word: "BANANA", 
        syllables: 3, 
        options: [2, 3, 4],
        
        hint: "Ba-na-na (3 claps)"
      },
      { 
        type: "syllables",
        word: "ELEPHANT", 
        syllables: 3, 
        options: [1, 3, 4],
        
        hint: "El-e-phant (3 parts)"
      },
      { 
        type: "syllables",
        word: "COMPUTER", 
        syllables: 3, 
        options: [2, 3, 5],
        
        hint: "Com-pu-ter (3 syllables)"
      },
      { 
        type: "syllables",
        word: "BUTTERFLY", 
        syllables: 3, 
        options: [2, 3, 4],
        
        hint: "But-ter-fly (3 claps)"
      },
    ],
  },

  "silent-detective": {
    title: "🤫 Silent Letter Detective",
    description: "Find the word with the hidden silent letter",
    items: [
      { 
        type: "silent-letter",
        correct: "Knee", 
        options: ["Nee", "Knee", "Kene"],
        hint: "The 'K' is silent in this word"
      },
      { 
        type: "silent-letter",
        correct: "Ghost", 
        options: ["Gost", "Ghost", "Gohst"],
        hint: "Look for the silent 'H'"
      },
      { 
        type: "silent-letter",
        correct: "Write", 
        options: ["Write", "Rite", "Wriit"],
        hint: "The 'W' is silent here"
      },
      { 
        type: "silent-letter",
        correct: "Island", 
        options: ["Island", "Iland", "Iseland"],
        hint: "Find the silent 'S'"
      },
      { 
        type: "silent-letter",
        correct: "Comb", 
        options: ["Comb", "Coam", "Kom"],
        hint: "The 'B' is silent in this word"
      },
    ],
  },

  "memory-sequencing": {
    title: "🧠 Memory & Sequencing",
    description: "Watch the sequence and repeat it in order",
    items: [
      { 
        type: "memory",
        sequence: ["A", "B", "C"],
        options: ["A", "B", "C", "D", "E"],
        duration: 2000,
        hint: "Remember the order of letters"
      },
      { 
        type: "memory",
        sequence: ["CAT", "DOG", "SUN"],
        options: ["CAT", "DOG", "SUN", "MOON", "STAR"],
        duration: 2500,
        hint: "Watch the word sequence carefully"
      },
      { 
        type: "memory",
        sequence: ["🔴", "🟢", "🔵"],
        options: ["🔴", "🟢", "🔵", "🟡", "🟣"],
        duration: 3000,
        hint: "Remember the color pattern"
      },
      { 
        type: "memory",
        sequence: ["1", "3", "5"],
        options: ["1", "2", "3", "4", "5"],
        duration: 2000,
        hint: "Number sequence pattern"
      },
    ],
  },

  "rapid-naming": {
    title: "⚡ Rapid Naming",
    description: "Quickly identify the letters and words as they appear",
    items: [
      { 
        type: "rapid-naming",
        target: "B",
        distractors: ["D", "P", "Q", "R"],
        timeLimit: 5,
        hint: "Tap the target letter quickly!"
      },
      { 
        type: "rapid-naming",
        target: "DOG",
        distractors: ["CAT", "BOG", "DIG", "FOG"],
        timeLimit: 6,
        hint: "Find the correct word fast!"
      },
      { 
        type: "rapid-naming",
        target: "M",
        distractors: ["N", "W", "H", "K"],
        timeLimit: 4,
        hint: "Quick! Find the letter M"
      },
    ],
  },

  "reading-fluency": {
    title: "📖 Reading Fluency",
    description: "Read the sentence and answer the question",
    items: [
      { 
        type: "reading",
        sentence: "The cat sat on the mat.",
        question: "Where did the cat sit?",
        correct: "On the mat",
        options: ["On the mat", "On the bed", "In the box", "On the chair"],
        hint: "Look at the last part of the sentence"
      },
      { 
        type: "reading",
        sentence: "Sam has a big red ball.",
        question: "What color is the ball?",
        correct: "Red",
        options: ["Red", "Blue", "Green", "Yellow"],
        hint: "Find the color word in the sentence"
      },
      { 
        type: "reading",
        sentence: "We go to the park to play.",
        question: "Where do we go to play?",
        correct: "To the park",
        options: ["To the park", "To school", "To home", "To the store"],
        hint: "The answer is in the middle of the sentence"
      },
    ],
  },
};

export default function Dyslexia() {
  const query = new URLSearchParams(window.location.search);
  const initialMode = query.get("mode") || "phonemic-awareness";
  const [mode, setMode] = useState(initialMode);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [done, setDone] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [memorySequence, setMemorySequence] = useState([]);
  const [showMemory, setShowMemory] = useState(false);
  const [rapidScore, setRapidScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const items = useMemo(() => activities[mode]?.items || [], [mode]);
  const current = items[index];
  const progress = items.length ? ((index + 1) / items.length) * 100 : 0;

  // Memory game effect
  useEffect(() => {
    if (current?.type === "memory" && !showMemory && !done) {
      setShowMemory(true);
      setMemorySequence(current.sequence);
      const timer = setTimeout(() => {
        setShowMemory(false);
      }, current.duration);
      return () => clearTimeout(timer);
    }
  }, [current, showMemory, done]);

  // Rapid naming timer
  useEffect(() => {
    if (current?.type === "rapid-naming" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (current?.type === "rapid-naming" && timeLeft === 0 && index < items.length - 1) {
      next();
    }
  }, [current, timeLeft, index, items.length]);

  const choose = (opt) => {
    if (done) return;

    let correct;
    switch (current.type) {
      case "syllables":
        correct = current.syllables;
        break;
      case "memory":
        correct = current.sequence.join(",");
        break;
      case "rapid-naming":
        correct = current.target;
        break;
      case "reading":
        correct = current.correct;
        break;
      default:
        correct = current.correct;
    }

    if (opt === correct) {
      setScore(s => s + 1);
      setFeedback("✅ Correct! Great job!");
      if (current.type === "rapid-naming") {
        setRapidScore(rs => rs + 1);
      }
    } else {
      setFeedback(`❌ Correct Answer: ${correct}`);
    }
    setShowHint(false);
  };

  const handleWordFormation = (letter) => {
    if (done) return;
    
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    
    if (newSelected.join("") === current.correct) {
      setScore(s => s + 1);
      setFeedback("✅ Perfect! You built the word correctly!");
      setTimeout(next, 1500);
    } else if (newSelected.length === current.correct.length) {
      setFeedback(`❌ Try again! The word is ${current.correct}`);
      setTimeout(() => {
        setSelectedLetters([]);
        setFeedback("");
      }, 2000);
    }
  };

  const startRapidNaming = () => {
    if (current.type === "rapid-naming") {
      setTimeLeft(current.timeLimit);
      setRapidScore(0);
    }
  };

  const finish = () => {
    setDone(true);
    const finalScore = current.type === "rapid-naming" ? rapidScore : score;
    const totalQuestions = current.type === "rapid-naming" ? items.length : items.length;
    setFeedback(`🎉 Finished! Score: ${finalScore}/${totalQuestions}`);

    // ⭐ Earn Stars (5 stars per correct answer)
    const earned = finalScore * 5;
    addRewards(earned);

    // ✅ Sync with Database
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      fetch(`/api/rewards/add?userId=${user.id}&points=${earned}`, { method: "POST" });
    }
  };

  const next = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setFeedback("");
      setSelectedLetters([]);
      setShowHint(false);
      setShowMemory(false);
      setTimeLeft(0);
    } else {
      finish();
    }
  };

  const resetCurrent = () => {
    setSelectedLetters([]);
    setFeedback("");
    setShowHint(false);
  };

  const renderActivity = () => {
    if (!current) return null;

    switch (current.type) {
      case "word-formation":
        return (
          <div className="text-center">
            {current.image && (
              <div className="mb-3">
                <img src={current.image} alt="Hint" style={{ height: "100px" }} className="rounded" />
              </div>
            )}
            <div className="mb-4">
              <h4>Build the word:</h4>
              <div className="display-4 fw-bold text-primary mb-3" style={{ minHeight: "60px" }}>
                {selectedLetters.join("") || "?"}
              </div>
            </div>
            
            <div className="row g-2 justify-content-center mb-4">
              {current.letters.map((letter, i) => (
                <motion.button
                  key={i}
                  className="btn btn-outline-primary col-2 m-1"
                  onClick={() => handleWordFormation(letter)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={selectedLetters.includes(letter)}
                >
                  {letter}
                </motion.button>
              ))}
            </div>
            
            <button className="btn btn-warning me-2" onClick={resetCurrent}>
              Reset
            </button>
          </div>
        );

      case "memory":
        return (
          <div className="text-center">
            <h4 className="mb-3">Watch and Remember the Sequence</h4>
            
            {showMemory ? (
              <div className="mb-4">
                <div className="d-flex justify-content-center gap-3">
                  {memorySequence.map((item, i) => (
                    <motion.div
                      key={i}
                      className="display-6 p-3 bg-light rounded"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.5 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted mt-3">Memorize the sequence...</p>
              </div>
            ) : (
              <div className="mb-4">
                <h5>What was the sequence?</h5>
                <div className="row g-2 justify-content-center">
                  {current.options.map((opt, i) => (
                    <button
                      key={i}
                      className="btn btn-outline-secondary col-5 col-md-3"
                      onClick={() => choose(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "rapid-naming":
        return (
          <div className="text-center">
            <h4 className="mb-3">Find: <span className="text-primary">{current.target}</span></h4>
            <div className="mb-3">
              <div className="badge bg-warning text-dark fs-6">
                Time: {timeLeft}s
              </div>
              <div className="badge bg-success text-white fs-6 ms-2">
                Score: {rapidScore}
              </div>
            </div>
            
            {timeLeft > 0 ? (
              <div className="row g-2 justify-content-center">
                {[current.target, ...current.distractors]
                  .sort(() => Math.random() - 0.5)
                  .map((opt, i) => (
                    <motion.button
                      key={i}
                      className="btn btn-outline-primary col-3 m-1"
                      onClick={() => choose(opt)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {opt}
                    </motion.button>
                  ))
                }
              </div>
            ) : (
              <button className="btn btn-success btn-lg" onClick={startRapidNaming}>
                Start Game!
              </button>
            )}
          </div>
        );

      case "reading":
        return (
          <div className="text-center">
            <div className="card bg-light mb-4">
              <div className="card-body">
                <h5 className="card-title">Read this sentence:</h5>
                <p className="card-text fs-5 fw-bold text-primary">{current.sentence}</p>
              </div>
            </div>
            
            <h5 className="mb-3">{current.question}</h5>
            <div className="row g-2 justify-content-center">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className="btn btn-outline-secondary col-8 col-md-6"
                  onClick={() => choose(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <div className="display-4 fw-bold my-3 text-primary">
              {current.display || current.word}
            </div>
            {current.audio && (
              <button className="btn btn-info mb-3">
                🔊 Play Sound
              </button>
            )}
            
            <div className="row g-2 justify-content-center">
              {current.options.map((opt, i) => (
                <motion.button
                  key={i}
                  className="btn btn-outline-primary col-8 col-md-4"
                  onClick={() => choose(opt)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
        <h2 className="fw-bold text-center mb-0">{activities[mode].title}</h2>
        <div style={{ width: "100px" }}></div>
      </div>

      <p className="text-center text-muted mb-4">{activities[mode].description}</p>

      {/* Progress */}
      <div className="progress mb-4" style={{ height: "10px" }}>
        <div 
          className="progress-bar progress-bar-striped progress-bar-animated" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-center text-muted mb-4">
        Question {index + 1} of {items.length}
      </div>

      {/* Main Activity Card */}
      {current && (
        <motion.div 
          className="card p-4 shadow-lg border-0"
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderActivity()}

          {/* Hint System */}
          {current.hint && !showHint && !feedback && (
            <div className="text-center mt-3">
              <button 
                className="btn btn-sm btn-outline-info"
                onClick={() => setShowHint(true)}
              >
                💡 Need Help?
              </button>
            </div>
          )}

          {showHint && (
            <motion.div 
              className="alert alert-info mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <strong>Hint:</strong> {current.hint}
            </motion.div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.p 
                className="mt-3 fw-bold text-center fs-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {feedback}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {!done && current.type !== "word-formation" && current.type !== "rapid-naming" && (
            <div className="text-center mt-4">
              <motion.button 
                className="btn btn-success btn-lg"
                onClick={next}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!feedback && current.type !== "memory"}
              >
                {index < items.length - 1 ? "Next ➜" : "Finish ✔"}
              </motion.button>
            </div>
          )}
        </motion.div>
      )}

      {/* Completion Message */}
      {done && (
        <motion.div 
          className="alert alert-success text-center mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h4>🎉 Lesson Complete!</h4>
          <p className="mb-2">
            Score: <strong>{current.type === "rapid-naming" ? rapidScore : score}</strong>/
            {current.type === "rapid-naming" ? items.length : items.length}
          </p>
          <p className="mb-0">Stars have been added to your <b>Rewards</b> page 🌟</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}