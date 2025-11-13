import { useState } from "react";
import { analyzeEmotion } from "../services_api";

export default function Emotion() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    try {
      const res = await analyzeEmotion(text);
      setResult(res.data.emotion || "No emotion detected");
    } catch (error) {
      console.error("Emotion analysis failed:", error);
      setResult("⚠️ Error analyzing emotion");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">😊 Emotion Detector</h2>

      <div className="card shadow p-4 rounded-4">
        <textarea
          className="form-control p-3"
          rows="4"
          placeholder="Type something here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleAnalyze} className="btn btn-primary btn-lg mt-3">
          Analyze Emotion
        </button>

        {result && (
          <div className="alert alert-info mt-4 text-center fw-bold">
            Detected Emotion: <span className="text-primary">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}
