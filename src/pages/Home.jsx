import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const TIPS = [
  'Right-click to place a flag on suspected mines.',
  'Your first click is always safe — no mines nearby!',
  'Numbers show how many mines are in adjacent cells.',
  'Click an empty cell to reveal a large safe area.',
  'Use process of elimination to deduce mine locations.',
];

export default function Home() {
  const navigate = useNavigate();
  const { profile, winRate } = useProfile();

  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-6 animate-fade-in">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <div className="text-center mb-12 relative z-10">
        <div className="text-8xl mb-6 drop-shadow-[0_10px_15px_rgba(245,158,11,0.2)] animate-bounce select-none">💣</div>
        <h1 className="text-6xl font-black text-mine-text mb-4 tracking-tight uppercase">
          MINE<span className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">SWEEPER</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          The classic hazard-avoidance logic puzzle. Uncover every safe cell without detonating a single mine.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-md relative z-10">
        {[
          { label: 'Played', value: profile.gamesPlayed, icon: '🎮' },
          { label: 'Win Rate', value: `${winRate}%`, icon: '🏆' },
          {
            label: 'Best Time',
            value: profile.highScore
              ? `${Math.floor(profile.highScore / 60)}m ${profile.highScore % 60}s`
              : '—',
            icon: '⏱️',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 text-center hover:border-amber-400/50 hover:scale-[1.04] transition-all duration-300 shadow-lg group"
          >
            <div className="text-3xl mb-1.5 group-hover:rotate-12 transition-transform duration-300 select-none">
              {stat.icon}
            </div>
            <div className="text-lg sm:text-xl font-black text-slate-100 tracking-tight">{stat.value}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center relative z-10">
        <button
          onClick={() => navigate('/game')}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-350 hover:to-orange-400 text-slate-950 font-extrabold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-orange-500/10 cursor-pointer"
        >
          🎮 Play Mission
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          👤 My Profile
        </button>
      </div>

      {/* Tip */}
      <div className="mt-12 bg-slate-900/30 backdrop-blur-sm border border-slate-900 rounded-2xl px-6 py-4 max-w-md text-center relative z-10">
        <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest mb-1.5">
          💡 Field Intelligence
        </p>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}

