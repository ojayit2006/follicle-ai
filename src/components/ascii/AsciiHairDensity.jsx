import React, { useMemo } from 'react';

export function AsciiHairDensity({ survival }) {
  const rows = 8;
  const cols = 24;

  const { lines, label } = useMemo(() => {
    const density = survival;
    const chars = density > 0.75 ? ['▓', '█', '▒'] : density > 0.4 ? ['▒', '░', '·'] : ['·', '`', ' '];
    const linesInner = [];
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        const noise = Math.random() * 0.25;
        const level = density - noise;
        if (level > 0.7) line += chars[0];
        else if (level > 0.35) line += chars[1];
        else line += chars[2];
      }
      linesInner.push(line);
    }

    let labelText = '';
    if (density > 0.8) labelText = 'DENSE CANOPY — SIGNAL REFLECTION LOW';
    else if (density > 0.5) labelText = 'PARTIAL THINNING — MINOR SIGNAL LEAKAGE';
    else if (density > 0.25) labelText = 'CRITICAL THINNING — SCALP RADAR RETURN HIGH';
    else labelText = 'LUNAR SURFACE MODE — MAXIMUM SCALP EXPOSURE';

    return { lines: linesInner, label: labelText };
  }, [survival]);

  return (
    <div className="flex-1 flex flex-col">
      <pre className="flex-1 bg-slate-950/80 border border-slate-800 rounded-md text-[9px] leading-[1.2] p-2 overflow-hidden text-neongreen">
{lines.map((l, i) => (
  <div key={i}>{l}</div>
))}
      </pre>
      <p className="mt-1 text-[10px] text-slate-400 uppercase tracking-[0.18em]">{label}</p>
    </div>
  );
}

