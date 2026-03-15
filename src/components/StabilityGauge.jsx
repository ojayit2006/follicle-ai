import React from 'react';

export function StabilityGauge({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = (clamped / 100) * 180 - 90; // -90 to +90

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-1">
        Follicular Stability Index
      </p>
      <div className="relative w-40 h-20">
        <div className="absolute inset-0 border-b border-slate-800 rounded-b-full" />
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
          <div className="w-36 h-18 rounded-t-full bg-gradient-to-r from-red-500/30 via-yellow-400/40 to-neongreen/40 blur-sm" />
        </div>

        <div
          className="absolute left-1/2 bottom-0 origin-bottom h-16 w-0.5 bg-neoncyan shadow-[0_0_12px_rgba(0,246,255,0.9)] transition-transform"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-neoncyan" />
      </div>
      <p className="mt-2 text-2xl font-semibold text-neoncyan tabular-nums">{clamped}</p>
      <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">
        0 = Chaos &nbsp; · &nbsp; 100 = Stable
      </p>
    </div>
  );
}

