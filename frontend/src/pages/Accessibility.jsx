import React, { useEffect, useState } from "react";
import "./accessibility.css"; // keep this file in the same folder

export default function Accessibility() {
  // block unauthenticated access
  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
    return null;
  }

  // settings (persisted in localStorage)
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("acc_fontSize") || 16)
  );
  const [dyslexiaFont, setDyslexiaFont] = useState(
    localStorage.getItem("acc_dyslexiaFont") === "true"
  );
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem("acc_highContrast") === "true"
  );
  const [focusMode, setFocusMode] = useState(
    localStorage.getItem("acc_focusMode") === "true"
  );
  const [lineHeight, setLineHeight] = useState(
    Number(localStorage.getItem("acc_lineHeight") || 1.6)
  );

  // apply + persist
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("acc_fontSize", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.body.classList.toggle("dyslexia-font", dyslexiaFont);
    localStorage.setItem("acc_dyslexiaFont", String(dyslexiaFont));
  }, [dyslexiaFont]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("acc_highContrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle("focus-mode", focusMode);
    localStorage.setItem("acc_focusMode", String(focusMode));
  }, [focusMode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--acc-line-height", lineHeight);
    localStorage.setItem("acc_lineHeight", String(lineHeight));
  }, [lineHeight]);

  const resetAll = () => {
    setFontSize(16);
    setDyslexiaFont(false);
    setHighContrast(false);
    setFocusMode(false);
    setLineHeight(1.6);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold mb-2" style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          ♿ Accessibility Settings
        </h2>
        <p className="text-muted">Tune SmartLearn for comfortable reading and focus.</p>
      </div>

      {/* Text Size */}
      <div className="card p-4 mb-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2">
          <span className="accessibility-icon">🔠</span>
          Text Size
        </h5>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <button
            className="btn btn-outline-primary btn-lg px-3"
            onClick={() => setFontSize((v) => Math.max(12, v - 1))}
          >
            A–
          </button>
          <div className="badge bg-primary px-3 py-2 fs-6">Current: {fontSize}px</div>
          <button
            className="btn btn-outline-primary btn-lg px-3"
            onClick={() => setFontSize((v) => Math.min(24, v + 1))}
          >
            A+
          </button>
        </div>
      </div>

      {/* Line Height */}
      <div className="card p-4 mb-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2">
          <span className="accessibility-icon">📏</span>
          Line Spacing
        </h5>
        <input
          type="range"
          min="1.2"
          max="2.2"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(Number(e.target.value))}
          className="form-range mb-2"
          style={{ height: '8px' }}
        />
        <div className="small text-muted d-flex justify-content-between">
          <span>Compact</span>
          <span className="fw-bold text-primary">Current: {lineHeight.toFixed(1)}</span>
          <span>Spacious</span>
        </div>
      </div>

      {/* Dyslexia Font */}
      <div className="card p-4 mb-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2">
          <span className="accessibility-icon">🧠</span>
          Dyslexia-Friendly Font
        </h5>
        <label className="form-check form-switch fs-5">
          <input
            type="checkbox"
            className="form-check-input"
            checked={dyslexiaFont}
            onChange={() => setDyslexiaFont((v) => !v)}
            style={{ width: '3rem', height: '1.5rem' }}
          />
          <span className="form-check-label ms-3">
            Enable alternate, more readable font
            {dyslexiaFont && <span className="badge bg-success ms-2">Active</span>}
          </span>
        </label>
      </div>

      {/* High Contrast */}
      <div className="card p-4 mb-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2">
          <span className="accessibility-icon">🎨</span>
          High Contrast Mode
        </h5>
        <label className="form-check form-switch fs-5">
          <input
            type="checkbox"
            className="form-check-input"
            checked={highContrast}
            onChange={() => setHighContrast((v) => !v)}
            style={{ width: '3rem', height: '1.5rem' }}
          />
          <span className="form-check-label ms-3">
            Stronger contrast for text and UI
            {highContrast && <span className="badge bg-success ms-2">Active</span>}
          </span>
        </label>
      </div>

      {/* Focus Mode */}
      <div className="card p-4 mb-4 shadow-sm border-0 rounded-3">
        <h5 className="mb-3 d-flex align-items-center gap-2">
          <span className="accessibility-icon">🎯</span>
          Focus Mode
        </h5>
        <label className="form-check form-switch fs-5">
          <input
            type="checkbox"
            className="form-check-input"
            checked={focusMode}
            onChange={() => setFocusMode((v) => !v)}
            style={{ width: '3rem', height: '1.5rem' }}
          />
          <span className="form-check-label ms-3">
            Reduce visual clutter & distractions
            {focusMode && <span className="badge bg-success ms-2">Active</span>}
          </span>
        </label>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button className="btn btn-outline-secondary btn-lg px-4" onClick={resetAll}>
          🔄 Reset to Defaults
        </button>
      </div>

      <style jsx>{`
        .accessibility-icon {
          font-size: 1.5rem;
          padding: 0.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          transition: transform 0.2s ease-in-out;
        }

        .card:hover {
          transform: translateY(-2px);
        }

        .form-range::-webkit-slider-thumb {
          background: #667eea;
          border: none;
          height: 20px;
          width: 20px;
          margin-top: -6px;
        }

        .form-range::-moz-range-thumb {
          background: #667eea;
          border: none;
          height: 20px;
          width: 20px;
        }

        .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }
      `}</style>
    </div>
  );
}
