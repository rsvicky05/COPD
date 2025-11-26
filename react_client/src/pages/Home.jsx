import { useState } from "react";
import UploadForm from "../components/UploadForm";
import PredictionResult from "../components/PredictionResult";
import HistoryList from "../components/HistoryList";
import Chatbot from "../components/Chatbot";
import { uploadAndPredict } from "../api/client";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("predict");

  // ✅ Chatbot conversation memory
  const [chatMessages, setChatMessages] = useState([]);

  async function handleSubmit(file) {
    try {
      setLoading(true);

      const data = await uploadAndPredict(file);
      setResult(data);

      // Save prediction into history tab
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
    <div className="card shadow-sm w-100">
      <div className="card-body">

        {/* Tabs Header */}
        <div className="border-bottom mb-3">
          <ul className="nav nav-tabs mb-4">

            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "predict" ? "active" : ""}`}
                onClick={() => setActiveTab("predict")}
              >
                Prediction
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "chatbot" ? "active" : ""}`}
                onClick={() => setActiveTab("chatbot")}
              >
                Chatbot
              </button>
            </li>

          </ul>
        </div>

        {/* --- TAB CONTENTS --- */}

        {/* PREDICTION TAB */}
        {activeTab === "predict" && (
          <>
            <UploadForm onSubmit={handleSubmit} loading={loading} />
            <PredictionResult result={result} />
          </>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <HistoryList history={history} />
        )}

        {/* CHATBOT TAB */}
        {activeTab === "chatbot" && (
          <Chatbot
            lastPrediction={result}     // pass latest prediction for context
            messages={chatMessages}     // persistent chat memory
            setMessages={setChatMessages} // allow chatbot to update it
          />
        )}

      </div>
    </div>
  );
}
