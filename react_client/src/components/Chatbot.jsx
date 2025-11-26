// src/Components/Chatbot.jsx
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Chatbot({ lastPrediction, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/chat", {
        message: input,
        predictionData: lastPrediction || null,
      });

      const botText = res.data && res.data.reply ? String(res.data.reply) : "No response from chatbot.";
      const botMsg = { sender: "bot", text: botText };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Error: chatbot service is unavailable." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  }

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-header fw-semibold">Health Assistant Chatbot</div>

      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {messages.length === 0 && (
          <p className="text-muted small">
            Ask about lung diseases or your prediction result. This is not
            medical advice.
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 text-${msg.sender === "user" ? "end" : "start"}`}
          >
            {msg.sender === "user" ? (
              <span className="d-inline-block p-2 rounded bg-dark text-white">
                {msg.text}
              </span>
            ) : (
              <div className="d-inline-block p-2 rounded bg-light border text-start">
                <ReactMarkdown>{msg.text || ""}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <p className="text-muted small mb-0">Assistant is typing...</p>
        )}
      </div>

      <div className="card-footer d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Ask something..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button
          className="btn btn-dark"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
