export default function HistoryList({ history }) {
  if (!history || history.length === 0) {
    return (
      <p className="text-muted">
        No predictions yet. Run a prediction from the Prediction tab.
      </p>
    );
  }

  return (
    <div>
      <h5 className="mb-3">Recent Predictions (this session)</h5>
      <ul className="list-group">
        {history.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <div>
              <div className="fw-semibold small">{item.fileName}</div>
              <div className="text-muted small">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-end">
              <div className="fw-bold small">
                {item.prediction}
              </div>
              <div className="text-muted small">
                {(item.confidence * 100).toFixed(0)}% confidence
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
