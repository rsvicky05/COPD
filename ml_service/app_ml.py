# ml_service/app_ml.py
import os

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

from inference_utils import extract_mfcc_from_bytes

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "lung_cnn.h5")

model = load_model(MODEL_PATH)

# Make sure this order matches how your model was trained
CLASS_NAMES = [
    "Bronchiectasis",
    "Pneumonia",
    "Bronchiolitis",
    "COPD",
    "URTI",
    "Healthy"
]

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        file_bytes = file.read()
        x = extract_mfcc_from_bytes(file_bytes)
    except Exception as e:
        return jsonify({"error": f"Audio processing failed: {str(e)}"}), 500

    preds = model.predict(x)[0]  # (num_classes,)
    top_idx = int(np.argmax(preds))
    top_class = CLASS_NAMES[top_idx]
    top_conf = float(preds[top_idx])

    probs = [
        {"class": CLASS_NAMES[i], "probability": float(preds[i])}
        for i in range(len(CLASS_NAMES))
    ]

    return jsonify({
        "prediction": top_class,
        "confidence": top_conf,
        "probabilities": probs
    })

if __name__ == "__main__":
    # Python ML service on port 8000
    app.run(host="0.0.0.0", port=8000, debug=True)
