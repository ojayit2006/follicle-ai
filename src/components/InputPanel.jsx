import React, { useState } from 'react';

const initialForm = {
  stay_up_late: 3,
  pressure_level: 5,
  coffee_consumed: 2,
  brain_working_duration: 6,
  school_assesssment: 'average',
  stress_level: 6,
  shampoo_brand: 'generic',
  swimming: false,
  hair_washing: 4,
  hair_grease: 5,
  dandruff: 3,
  libido: 5
};

export function InputPanel({ onPredict, loading }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      stay_up_late: Number(form.stay_up_late),
      pressure_level: Number(form.pressure_level),
      coffee_consumed: Number(form.coffee_consumed),
      brain_working_duration: Number(form.brain_working_duration),
      school_assesssment: form.school_assesssment,
      stress_level: Number(form.stress_level),
      shampoo_brand: form.shampoo_brand,
      swimming: Boolean(form.swimming),
      hair_washing: Number(form.hair_washing),
      hair_grease: Number(form.hair_grease),
      dandruff: Number(form.dandruff),
      libido: Number(form.libido)
    };
    onPredict?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neoncyan uppercase">
          Input Sensors
        </h2>
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.25em]">
          SCALP TELEMETRY
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <SliderField
          label="Circadian Rhythm Violation Detector"
          code="stay_up_late"
          min={0}
          max={7}
          value={form.stay_up_late}
          onChange={handleChange}
          hint="Nights per week staying up past 1 AM."
        />
        <SliderField
          label="Follicular Stress Sensor"
          code="pressure_level"
          min={0}
          max={10}
          value={form.pressure_level}
          onChange={handleChange}
          hint="Subjective life pressure load."
        />
        <SliderField
          label="Caffeine Intake Monitor"
          code="coffee_consumed"
          min={0}
          max={10}
          value={form.coffee_consumed}
          onChange={handleChange}
          hint="Cups of coffee per day."
        />
        <SliderField
          label="Cognitive Overclock Duration"
          code="brain_working_duration"
          min={0}
          max={16}
          value={form.brain_working_duration}
          onChange={handleChange}
          hint="Hours of intense brain usage per day."
        />

        <DropdownField
          label="Academic Trauma Index"
          code="school_assesssment"
          value={form.school_assesssment}
          onChange={handleChange}
          options={[
            { value: 'low', label: 'Low Academic Turbulence' },
            { value: 'average', label: 'Average Curriculum Stress' },
            { value: 'high', label: 'High Exam Overload' }
          ]}
        />

        <SliderField
          label="Cortisol Uprising Meter"
          code="stress_level"
          min={0}
          max={10}
          value={form.stress_level}
          onChange={handleChange}
          hint="Chronic stress magnitude."
        />

        <DropdownField
          label="Shampoo Brand Classifier"
          code="shampoo_brand"
          value={form.shampoo_brand}
          onChange={handleChange}
          options={[
            { value: 'generic', label: 'Generic Grocery Formula' },
            { value: 'medicated', label: 'Medicated / Anti-Dandruff' },
            { value: 'luxury', label: 'Premium Salon Chemistry' }
          ]}
        />

        <ToggleField
          label="Chlorinated Exposure Sensor"
          code="swimming"
          value={form.swimming}
          onChange={handleChange}
          description="Frequent swimming in chlorinated or salty environments."
        />

        <SliderField
          label="Shampoo Deployment Frequency"
          code="hair_washing"
          min={0}
          max={14}
          value={form.hair_washing}
          onChange={handleChange}
          hint="Hair washes per week."
        />

        <SliderField
          label="Sebum Saturation Gauge"
          code="hair_grease"
          min={0}
          max={10}
          value={form.hair_grease}
          onChange={handleChange}
          hint="Perceived scalp oiliness."
        />

        <SliderField
          label="Dermatological Turbulence Meter"
          code="dandruff"
          min={0}
          max={10}
          value={form.dandruff}
          onChange={handleChange}
          hint="Flake event frequency."
        />

        <SliderField
          label="Libido Oscillation Tracker"
          code="libido"
          min={0}
          max={10}
          value={form.libido}
          onChange={handleChange}
          hint="Self-reported hair-hormone chaos index."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full py-3 rounded-lg border border-neoncyan bg-black/80 text-neoncyan text-sm font-semibold tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:bg-neoncyan/10 disabled:opacity-60 glow-cyan transition-colors"
      >
        <span className="h-2 w-2 rounded-full bg-neongreen animate-pulse-slow" />
        {loading ? 'Computing Follicular Fate…' : 'Predict Hair Fate'}
        <span className="h-2 w-2 rounded-full bg-neoncyan animate-pulse" />
      </button>
    </form>
  );
}

function SliderField({ label, code, min, max, value, onChange, hint }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-200">{label}</span>
        <span className="text-neongreen tabular-nums">LVL {value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(code, Number(e.target.value))}
        className="w-full accent-neoncyan"
      />
      {hint && <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{hint}</p>}
    </div>
  );
}

function DropdownField({ label, code, value, onChange, options }) {
  return (
    <div className="space-y-1">
      <label className="flex items-center justify-between text-xs">
        <span className="text-slate-200">{label}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(code, e.target.value)}
        className="w-full bg-black/60 border border-slate-800 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-neoncyan"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, code, value, onChange, description }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs">
        <p className="text-slate-200">{label}</p>
        {description && (
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(code, !value)}
        className={`relative inline-flex h-5 w-10 cursor-pointer items-center rounded-full border border-slate-700 transition-colors ${
          value ? 'bg-neoncyan/50 glow-cyan' : 'bg-slate-800'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-black border border-slate-500 shadow transition-transform ${
            value ? 'translate-x-5 border-neoncyan' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

