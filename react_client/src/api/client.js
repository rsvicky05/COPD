// src/api/client.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function uploadAndPredict(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE_URL}/api/predict`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { prediction, confidence, probabilities }
}
