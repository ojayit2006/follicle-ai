import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function FeatureImportanceChart({ data }) {
  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 10, left: 10, bottom: 4 }}>
          <XAxis type="number" hide domain={[0, 'dataMax']} />
          <YAxis
            dataKey="name"
            type="category"
            width={70}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(15,23,42,0.7)' }}
            contentStyle={{
              backgroundColor: '#020617',
              borderColor: '#1e293b',
              borderRadius: 8,
              fontSize: 10
            }}
          />
          <Bar dataKey="value" fill="#22d3ee" radius={3} />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-[0.2em]">
        Higher bars indicate greater influence on follicular fate.
      </p>
    </div>
  );
}

