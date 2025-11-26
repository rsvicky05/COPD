import ProbabilityBars from "./ProbabilityBars";

export default function PredictionResult({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        {result.error}
      </div>
    );
  }

  const { prediction, confidence, probabilities } = result;

  return (
    <div className="mt-3">
      <h5>Prediction</h5>
      <p className="text-muted">
        Most likely condition:{" "}
        <strong>{prediction}</strong>{" "}
        ({(confidence * 100).toFixed(1)}% confidence)
      </p>

      <h6>Class probabilities</h6>
      <ProbabilityBars probabilities={probabilities} />

      <p className="mt-2 small text-muted">
        This is an ML demo, not a medical diagnosis. Do not use it for
        clinical decisions.
      </p>
    </div>
  );
}
