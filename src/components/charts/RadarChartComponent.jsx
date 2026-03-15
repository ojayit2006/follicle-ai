import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export function RadarChartComponent({ radar }) {
  const data = [
    { metric: 'Frontal Retreat', value: radar.frontalRetreat },
    { metric: 'Crown Instability', value: radar.crownInstability },
    { metric: 'Temple Erosion', value: radar.templeErosion },
    { metric: 'Density Variance', value: radar.densityVariance },
    { metric: 'Scalp Reflectivity', value: radar.scalpReflectivity }
  ];

  return (
    <div className="flex-1 min-h-0">
      <h3 className="text-xs text-slate-300 mb-1 tracking-[0.18em] uppercase">
        Hairline Radar Signature
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fontSize: 9, fill: '#94a3b8' }}
            tickLine={{ stroke: '#1e293b' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 1]}
            tick={{ fontSize: 8, fill: '#64748b' }}
            tickLine={{ stroke: '#1e293b' }}
          />
          <Radar
            name="Hairline"
            dataKey="value"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-[10px] text-slate-500 uppercase tracking-[0.18em]">
        Visualizing frontal retreat, crown instability, and density fluctuations.
      </p>
    </div>
  );
}

