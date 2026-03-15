import React from 'react';

export function DashboardLayout({ children, mode, onModeChange }) {
  const [left, center, right] = React.Children.toArray(children);

  return (
    <div className="flex flex-col h-full glass">
      <header className="border-b border-slate-800/80 bg-black/70 backdrop-blur-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg border border-neoncyan glow-cyan flex items-center justify-center">
            <span className="text-neoncyan text-xl font-bold">FA</span>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-semibold tracking-[0.18em] text-neoncyan">
              FOLLICLE-AI
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-[0.22em]">
              Predictive Follicular Failure Analysis System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <ModeToggle mode={mode} onModeChange={onModeChange} />
          <div className="hidden md:flex flex-col text-right text-xs text-slate-400">
            <span>SCALP MISSION CONTROL ONLINE</span>
            <span className="text-[10px] text-neongreen">
              Status: <span className="animate-pulse-slow">HAIR SURVIVAL MONITORING</span>
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full max-h-[calc(100vh-96px)]">
          <section className="panel-border p-4 overflow-y-auto">{left}</section>
          <section className="panel-border p-4 overflow-y-auto">{center}</section>
          <section className="panel-border p-4 overflow-y-auto">{right}</section>
        </div>
      </main>
    </div>
  );
}

function ModeToggle({ mode, onModeChange }) {
  const brutal = mode === 'brutal';
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className={brutal ? 'text-slate-500' : 'text-neongreen'}>Professional Mode</span>
      <button
        type="button"
        onClick={() => onModeChange(brutal ? 'professional' : 'brutal')}
        className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full border border-slate-700 transition-colors ${
          brutal ? 'bg-red-900/70 glow-cyan' : 'bg-slate-800/80 glow-green'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-black border border-slate-500 shadow transition-transform ${
            brutal ? 'translate-x-6 border-red-400' : 'translate-x-1 border-neongreen'
          }`}
        />
      </button>
      <span className={brutal ? 'text-red-400' : 'text-slate-500'}>Brutal Honesty Mode</span>
    </div>
  );
}

