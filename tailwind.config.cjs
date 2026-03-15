/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      colors: {
        neoncyan: '#00f6ff',
        neongreen: '#5bff6b'
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 246, 255, 0.5)',
        'neon-green': '0 0 20px rgba(91, 255, 107, 0.5)'
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 10s linear infinite'
      }
    }
  },
  plugins: []
};
