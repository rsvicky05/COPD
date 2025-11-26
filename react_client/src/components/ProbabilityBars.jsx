// src/components/ProbabilityBars.jsx
export default function ProbabilityBars({ probabilities }) {
  if (!probabilities || probabilities.length === 0) return null;

  return (
    <div className="space-y-2">
      {probabilities.map((item) => (
        <div key={item.class}>
          <div className="flex justify-between text-xs mb-1">
            <span>{item.class}</span>
            <span>{(item.probability * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-slate-900"
              style={{ width: `${item.probability * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
