import { useEffect } from 'react';

export default function GameOverModal({ gameState, time, onReset, onGoProfile }) {
  const won = gameState === 'won';

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  if (gameState !== 'won' && gameState !== 'lost') return null;

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 animate-slide-down text-center relative overflow-hidden">
        {/* Glow Element */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-35 ${
          won ? 'bg-amber-400' : 'bg-rose-500'
        }`} />

        <div className="relative z-10">
          <div className="text-6xl mb-4 drop-shadow-md">{won ? '🏆' : '💀'}</div>
          <h2
            className={`text-3xl font-extrabold mb-2 tracking-tight ${
              won
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent'
                : 'text-rose-500'
            }`}
          >
            {won ? 'You Won!' : 'Game Over!'}
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            {won
              ? `Cleared the board in ${formatTime(time)}! 🎉`
              : 'Better luck next time. You hit a mine!'}
          </p>

          {won && (
            <div className="bg-slate-950/50 border border-slate-800/85 rounded-2xl p-4 mb-6 shadow-inner">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Your Time</p>
              <p className="text-3xl font-mono font-extrabold text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.2)]">
                {formatTime(time)}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={onReset}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-350 hover:to-orange-400 text-slate-950 font-extrabold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/10 cursor-pointer"
            >
              Play Again
            </button>
            <button
              onClick={onGoProfile}
              className="w-full py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-slate-200 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
