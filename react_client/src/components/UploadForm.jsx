import { useState } from "react";

const MAX_SIZE_MB = 5;

export default function UploadForm({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const f = e.target.files[0];
    setError("");
    setFile(null);

    if (!f) return;

    if (!f.type.startsWith("audio/")) {
      setError("Please select an audio file.");
      return;
    }

    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be ≤ ${MAX_SIZE_MB} MB.`);
      return;
    }

    setFile(f);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file || loading) return;
    onSubmit(file);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label">
          Upload lung sound recording (.wav recommended)
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleChange}
          className="form-control"
        />
        {error && (
          <div className="form-text text-danger">
            {error}
          </div>
        )}
      </div>

      {file && (
        <div className="mb-3">
          <small className="text-muted d-block mb-1">
            Selected: {file.name}
          </small>
          <audio controls src={URL.createObjectURL(file)} className="w-100" />
        </div>
      )}

      <button
        type="submit"
        disabled={!file || loading}
        className="btn btn-dark"
      >
        {loading ? "Predicting..." : "Predict Disease"}
      </button>
    </form>
  );
}
