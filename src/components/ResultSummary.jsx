import React from 'react';

export function ResultSummary({ prediction, mode }) {
  const { survivalProbability, baldnessRisk, confidence, brutalMessage } = prediction;

  const survivalPct = (survivalProbability * 100).toFixed(1);
  const confidencePct = (confidence * 100).toFixed(1);

  const professionalNote =
    baldnessRisk === 'Severe'
      ? 'Maximum follicular crisis detected. Recommend advanced scalp diplomacy and psychological preparation.'
      : baldnessRisk === 'Moderate'
      ? 'Borderline stability. Small perturbations may trigger tactical retreat.'
      : baldnessRisk === 'Mild'
      ? 'Minor thinning signatures detected. Maintain current protocol with elevated vigilance.'
      : 'Follicular systems appear nominal. Continue current protocol.';

  return (
    <div className="flex flex-col gap-2 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Hair Survival Probability
          </p>
          <p className="text-2xl font-semibold text-neongreen">
            {survivalPct}
            <span className="text-base text-slate-400 ml-1">%</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px]">Baldness Severity</p>
          <p
            className={`text-lg font-semibold ${
              baldnessRisk === 'Severe'
                ? 'text-red-400'
                : baldnessRisk === 'None'
                ? 'text-neongreen'
                : 'text-yellow-300'
            }`}
          >
            {baldnessRisk}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div>
          <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Prediction Confidence
          </p>
          <p className="text-base text-neoncyan font-semibold">{confidencePct}%</p>
        </div>
        <div>
          <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Comb-Over Success Probability
          </p>
          <p className="text-base text-neoncyan font-semibold">
            {(prediction.combOverSuccess * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-2 border-t border-slate-800 pt-2">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-1">
          System Commentary
        </p>
        <p className="text-xs text-slate-200">{professionalNote}</p>
        {mode === 'brutal' && brutalMessage && (
          <p className="mt-2 text-xs text-red-400">{brutalMessage}</p>
        )}
      </div>
    </div>
  );
}

