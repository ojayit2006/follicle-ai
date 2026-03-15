import React, { useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { InputPanel } from './components/InputPanel';
import { PredictionEngine } from './components/PredictionEngine';
import { ForecastPanel } from './components/ForecastPanel';

const initialPrediction = {
  stabilityIndex: 72,
  survivalProbability: 0.68,
  baldnessRisk: 'Moderate',
  confidence: 0.81,
  combOverSuccess: 0.54,
  hairTimeline: [
    { year: 2026, label: 'Hairline holding formation', survival: 0.92 },
    { year: 2028, label: 'Tactical retreat begins', survival: 0.78 },
    { year: 2030, label: 'Crown visibility detected', survival: 0.55 },
    { year: 2032, label: 'Strategic comb-over deployment', survival: 0.33 },
    { year: 2035, label: 'Acceptance phase', survival: 0.12 }
  ],
  featureImportance: [
    { name: 'Stress', value: 0.26 },
    { name: 'Sleep', value: 0.19 },
    { name: 'Caffeine', value: 0.14 },
    { name: 'Dandruff', value: 0.11 },
    { name: 'Grease', value: 0.09 },
    { name: 'Libido', value: 0.07 },
    { name: 'Shampoo', value: 0.07 },
    { name: 'Swimming', value: 0.07 }
  ],
  radar: {
    frontalRetreat: 0.6,
    crownInstability: 0.55,
    templeErosion: 0.48,
    densityVariance: 0.66,
    scalpReflectivity: 0.4
  },
  metrics: {
    packetLoss: 0.18,
    throughput: 0.72,
    latency: 0.41,
    exposure: 0.35
  },
  brutalMessage: ''
};

export default function App() {
  const [prediction, setPrediction] = useState(initialPrediction);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('professional'); // 'professional' | 'brutal'

  const handlePredict = async (payload) => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Prediction API error');
      }

      const data = await res.json();

      // Backend: prediction is 0,1,2,3 (severity); probability is for class 0 (best case)
      const severity = typeof data.prediction === 'number' ? data.prediction : Number(data.prediction);

      const baldnessRisk =
        severity === 0
          ? 'None'
          : severity === 1
          ? 'Mild'
          : severity === 2
          ? 'Moderate'
          : 'Severe';

      // Higher survival = higher prob of class 0; if no prob, invert severity
      const survivalProbability =
        typeof data.probability === 'number'
          ? data.probability
          : 1 - severity / 3;

      const confidence = data.confidence ?? 0.85;

      const brutalOptions = [
        'You have entered the Baldness Arc.',
        'Follicular systems approaching thermal shutdown.',
        'Hairline reporting critical structural fatigue.',
        'Scalp reflectivity trending towards mirror-grade.',
        'Comb-over simulations failing QA checks.'
      ];
      const brutalMessage =
        mode === 'brutal'
          ? brutalOptions[Math.floor(Math.random() * brutalOptions.length)]
          : '';

      setPrediction((prev) => {
        const clampedSurvival = Math.max(0, Math.min(1, survivalProbability));
        const stabilityIndex = Math.round(
          (clampedSurvival * 40 + (1 - clampedSurvival) * 10) + (1 - severity / 3) * 50
        );

        const combOverBase = 0.8 - (severity * 0.18);

        return {
          ...prev,
          stabilityIndex,
          survivalProbability: clampedSurvival,
          baldnessRisk,
          confidence,
          combOverSuccess: Math.max(0.05, Math.min(0.95, combOverBase)),
          hairTimeline: prev.hairTimeline,
          featureImportance: prev.featureImportance,
          radar: prev.radar,
          metrics: prev.metrics,
          brutalMessage
        };
      });
    } catch (err) {
      console.error(err);
      setPrediction((prev) => ({
        ...prev,
        brutalMessage:
          mode === 'brutal'
            ? 'Telemetry link to follicles lost. Assume worst-case scenario.'
            : 'Connection to prediction engine lost. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-black text-slate-100">
      <DashboardLayout mode={mode} onModeChange={setMode}>
        <InputPanel onPredict={handlePredict} loading={loading} />
        <PredictionEngine prediction={prediction} mode={mode} />
        <ForecastPanel prediction={prediction} mode={mode} />
      </DashboardLayout>
    </div>
  );
}

