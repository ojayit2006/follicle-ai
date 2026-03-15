import React from 'react';
import { TimelineChart } from './charts/TimelineChart';
import { RadarChartComponent } from './charts/RadarChartComponent';
import { MetricsPanel } from './charts/MetricsPanel';

export function ForecastPanel({ prediction }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neoncyan uppercase">
          Forecast & Analytics
        </h2>
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
          FUTURE HAIRLINE PROJECTIONS
        </span>
      </div>

      <div className="border border-slate-800 rounded-lg p-3 bg-black/60">
        <TimelineChart data={prediction.hairTimeline} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60 flex flex-col">
          <RadarChartComponent radar={prediction.radar} />
        </div>
        <div className="border border-slate-800 rounded-lg p-3 bg-black/60 flex flex-col">
          <MetricsPanel metrics={prediction.metrics} combOverSuccess={prediction.combOverSuccess} />
        </div>
      </div>
    </div>
  );
}

