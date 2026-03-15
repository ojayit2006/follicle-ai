import React from 'react';

export function MetricsPanel({ metrics, combOverSuccess }) {
  const items = [
    {
      key: 'packetLoss',
      label: 'Hair Packet Loss',
      value: metrics.packetLoss,
      color: 'bg-red-400'
    },
    {
      key: 'throughput',
      label: 'Follicle Throughput',
      value: metrics.throughput,
      color: 'bg-neongreen'
    },
    {
      key: 'latency',
      label: 'Hairline Latency',
      value: metrics.latency,
      color: 'bg-yellow-300'
    },
    {
      key: 'exposure',
      label: 'Scalp Surface Exposure',
      value: metrics.exposure,
      color: 'bg-sky-400'
    }
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2">
      <h3 className="text-xs text-slate-300 mb-1 tracking-[0.18em] uppercase">
        Engineering Metrics
      </h3>
      {items.map((item) => (
        <div key={item.key} className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300">{item.label}</span>
            <span className="text-slate-400 tabular-nums">
              {(item.value * 100).toFixed(0)}
              <span className="text-[10px]">%</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full ${item.color} transition-all duration-700`}
              style={{ width: `${item.value * 100}%` }}
            />
          </div>
        </div>
      ))}

      <div className="mt-1 pt-1 border-t border-slate-800">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-300">Comb-Over Success Probability</span>
          <span className="text-neoncyan tabular-nums">
            {(combOverSuccess * 100).toFixed(1)}
            <span className="text-[10px]">%</span>
          </span>
        </div>
        <div className="mt-1 h-2 w-full bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-neoncyan animate-pulse-slow"
            style={{ width: `${combOverSuccess * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

