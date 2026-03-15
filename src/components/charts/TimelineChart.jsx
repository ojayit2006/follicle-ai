import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export function TimelineChart({ data }) {
  return (
    <div className="h-44">
      <h3 className="text-xs text-slate-300 mb-1 tracking-[0.18em] uppercase">
        Hair Survival Timeline Projection
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={{ stroke: '#1e293b' }}
          />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={{ stroke: '#1e293b' }}
          />
          <Tooltip
            formatter={(v, name, props) => [`${Math.round(v * 100)}%`, props.payload.label]}
            labelFormatter={(l) => `Year ${l}`}
            contentStyle={{
              backgroundColor: '#020617',
              borderColor: '#1e293b',
              borderRadius: 8,
              fontSize: 10
            }}
          />
          <Line
            type="monotone"
            dataKey="survival"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={{ r: 2, strokeWidth: 1 }}
            activeDot={{ r: 4 }}
          />
          {data.map((d, idx) => (
            <ReferenceDot
              key={idx}
              x={d.year}
              y={d.survival}
              r={2}
              fill="#4ade80"
              stroke="none"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <ul className="mt-1 space-y-0.5 max-h-16 overflow-y-auto pr-1">
        {data.map((item) => (
          <li key={item.year} className="text-[10px] text-slate-400 flex justify-between">
            <span className="text-slate-500">{item.year}</span>
            <span className="ml-2 text-right">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

