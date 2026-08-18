export default function GameHUD({ minesLeft, time, gameState, onReset, difficulty, onChangeDifficulty }) {
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const difficultyOptions = ['easy', 'medium', 'hard'];

  const faceMap = {
    idle: '😐',
    playing: '😮',
    won: '😎',
    lost: '😵',
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/60 rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
      {/* Difficulty Selector */}
      <div className="flex gap-2 bg-slate-950/30 p-1.5 rounded-xl border border-slate-800/40">
        {difficultyOptions.map((d) => (
          <button
            key={d}
            onClick={() => onChangeDifficulty(d)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              difficulty === d
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Center Stats */}
      <div className="flex items-center gap-6">
        {/* Mines left */}
        <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 px-4 py-2 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
          <span className="text-lg">🚩</span>
          <span className="font-mono font-extrabold text-rose-400 text-xl tracking-wider drop-shadow-[0_0_6px_rgba(244,63,94,0.3)] min-w-[2ch] text-center">
            {minesLeft}
          </span>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-amber-400/50 hover:scale-110 active:scale-95 transition-all duration-200 shadow-md cursor-pointer hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
          title="New Game"
        >
          {faceMap[gameState]}
        </button>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 px-4 py-2 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
          <span className="text-lg">⏱️</span>
          <span className="font-mono font-extrabold text-cyan-400 text-xl tracking-wider drop-shadow-[0_0_6px_rgba(34,211,238,0.3)] min-w-[4ch] text-center">
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div
        className={`text-xs uppercase tracking-wider font-extrabold px-4.5 py-2 rounded-full border transition-all duration-300 ${
          gameState === 'won'
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.15)]'
            : gameState === 'lost'
            ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.15)] animate-shake'
            : 'bg-slate-800/40 border-slate-850 text-slate-400'
        }`}
      >
        {gameState === 'won'
          ? '🏆 Victory!'
          : gameState === 'lost'
          ? '💀 Defeat'
          : gameState === 'playing'
          ? '🎮 Active'
          : '🕹️ Standby'}
      </div>
    </div>
  );
}

