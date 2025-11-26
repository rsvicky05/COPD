// src/Components/Home.jsx
import { useState } from "react";
import UploadForm from "../components/UploadForm";
import PredictionResult from "../components/PredictionResult";
import HistoryList from "../components/HistoryList";
import { uploadAndPredict } from "../api/client";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("predict"); // "predict" | "history"

  async function handleSubmit(file) {
    try {
      setLoading(true);
      const data = await uploadAndPredict(file);
      setResult(data);

      // push into local history
      setHistory((prev) => [
        {
          fileName: file.name,
          prediction: data.prediction,
          confidence: data.confidence,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setResult({ error: "Prediction failed. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* Tabs */}
        <div className="border-bottom mb-3">
          <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              type="button"
              className={
                "nav-link " + (activeTab === "predict" ? "active" : "")
              }
              onClick={() => setActiveTab("predict")}
            >
              Prediction
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={
                "nav-link " + (activeTab === "history" ? "active" : "")
              }
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </li>
        </ul>
        </div>
        

        {/* Tab Content */}
        {activeTab === "predict" && (
          <>
            <UploadForm onSubmit={handleSubmit} loading={loading} />
            <PredictionResult result={result} />
          </>
        )}

        {activeTab === "history" && (
          <HistoryList history={history} />
        )}
      </div>
    </div>
  );
}
