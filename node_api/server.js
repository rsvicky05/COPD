// node_api/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

const PYTHON_SERVICE_URL = "http://localhost:8000/predict";

app.post("/api/predict", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
    });

    const response = await axios.post(PYTHON_SERVICE_URL, formData, {
      headers: formData.getHeaders(),
    });

    // Clean up temp file
    fs.unlink(req.file.path, () => {});

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction request failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node API listening on port ${PORT}`);
});
