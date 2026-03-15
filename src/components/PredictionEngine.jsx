import React from 'react';
import { StabilityGauge } from './StabilityGauge';
import { ResultSummary } from './ResultSummary';
import { FeatureImportanceChart } from './charts/FeatureImportanceChart';
import { AsciiHairDensity } from './ascii/AsciiHairDensity';
import { jsPDF } from 'jspdf';

export function PredictionEngine({ prediction, mode }) {
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFont('courier', 'normal');
    doc.setFontSize(14);
    doc.text('FOLLICLE-AI: Hair Survival Report', 14, 20);
    doc.setFontSize(10);
    doc.text(`Model: Random Forest`, 14, 30);
    doc.text(`Training Samples: 20,000`, 14, 36);
    doc.text(`Follicular Stability Index: ${prediction.stabilityIndex}`, 14, 46);
    doc.text(
      `Hair Survival Probability: ${(prediction.survivalProbability * 100).toFixed(1)}%`,
      14,
      52
    );
    doc.text(`Baldness Risk: ${prediction.baldnessRisk}`, 14, 58);
    doc.text(`Prediction Confidence: ${(prediction.confidence * 100).toFixed(1)}%`, 14, 64);
    doc.text(`Comb-Over Success Probability: ${(prediction.combOverSuccess * 100).toFixed(1)}%`, 14, 70);
    doc.text('Hairline Projection Timeline:', 14, 82);
    prediction.hairTimeline.forEach((item, idx) => {
      doc.text(`${item.year} — ${item.label}`, 18, 90 + idx * 6);
    });
    doc.save('follicle-ai-hair-survival-report.pdf');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neoncyan uppercase">
          Prediction Engine
        </h2>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-[0.22em]">
          <span className="h-1.5 w-6 bg-gradient-to-r from-neoncyan to-neongreen animate-pulse" />
          <span>Model: Random Forest</span>
          <span>Samples: 20,000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60">
          <StabilityGauge value={prediction.stabilityIndex} />
        </div>
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60">
          <ResultSummary prediction={prediction} mode={mode} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60 flex flex-col">
          <h3 className="text-xs text-slate-300 mb-2 tracking-[0.18em] uppercase">
            Feature Importance Telemetry
          </h3>
          <FeatureImportanceChart data={prediction.featureImportance} />
        </div>
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs text-slate-300 tracking-[0.18em] uppercase">
              ASCII Hair Density Visualizer
            </h3>
          </div>
          <AsciiHairDensity survival={prediction.survivalProbability} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between pt-1">
        <button
          type="button"
          onClick={handleGenerateReport}
          className="px-3 py-2 rounded-md border border-neoncyan text-xs uppercase tracking-[0.2em] text-neoncyan hover:bg-neoncyan/10 glow-cyan transition-colors"
        >
          Generate Hair Survival Report
        </button>
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: 'FOLLICLE-AI Hair Survival Reading',
                  text: `My FOLLICLE-AI reading: Baldness Risk: ${prediction.baldnessRisk}, Hair Survival Probability: ${(prediction.survivalProbability * 100).toFixed(
                    1
                  )}%.`,
                  url: window.location.href
                })
                .catch(() => {});
            } else {
              navigator.clipboard
                .writeText(
                  `FOLLICLE-AI reading — Baldness Risk: ${prediction.baldnessRisk}, Hair Survival Probability: ${(prediction.survivalProbability * 100).toFixed(
                    1
                  )}%.`
                )
                .catch(() => {});
              alert('Share text copied to clipboard.');
            }
          }}
          className="px-3 py-2 rounded-md border border-neongreen text-xs uppercase tracking-[0.2em] text-neongreen hover:bg-neongreen/10 glow-green transition-colors"
        >
          Share with Friends
        </button>
      </div>
    </div>
  );
}

