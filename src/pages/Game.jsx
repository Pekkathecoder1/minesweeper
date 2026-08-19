import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMinesweeper } from '../hooks/useMinesweeper';
import { useProfile } from '../context/ProfileContext';
import GameBoard from '../components/GameBoard';
import GameOverModal from '../components/GameOverModal';

export default function Game() {
  const navigate = useNavigate();
  const { recordGame } = useProfile();

  const {
    board,
    gameState,
    difficulty,
    minesLeft,
    time,
    cols,
    handleReveal,
    handleFlag,
    resetGame,
    changeDifficulty,
    difficulties,
  } = useMinesweeper();

  // Record result when game ends
  useEffect(() => {
    if (gameState === 'won') {
      recordGame({ won: true, time });
    } else if (gameState === 'lost') {
      recordGame({ won: false, time });
    }
  }, [gameState]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f212e] p-4 md:p-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-5xl w-full bg-[#1a2c38] border border-[#213743]/60 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[580px]">
        
        {/* Left Control Panel / Sidebar (Stake style) */}
        <div className="w-full md:w-80 bg-[#1a2c38] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#213743]/80">
          <div className="space-y-6">
            {/* Logo / Header */}
            <div>
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#b1b6c0] mb-1">
                💣 CASINO MINES
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Avoid the mines. Cash out wins.
              </p>
            </div>

            {/* Manual/Auto tabs */}
            <div className="bg-[#0f212e] p-1 rounded-xl flex border border-[#213743]/50">
              <button className="flex-1 py-2 text-center text-xs font-bold text-slate-100 bg-[#213743] rounded-lg shadow-sm">
                Manual
              </button>
              <button className="flex-1 py-2 text-center text-xs font-bold text-slate-500 cursor-not-allowed">
                Auto
              </button>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#b1b6c0] uppercase tracking-wider">
                Grid & Mine Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button
                    key={d}
                    onClick={() => changeDifficulty(d)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                      difficulty === d
                        ? 'bg-[#213743] border-[#00e701]/60 text-[#00e701]'
                        : 'bg-[#0f212e] border-[#213743] text-[#b1b6c0] hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Inside Sidebar */}
            <div className="grid grid-cols-2 gap-3 bg-[#0f212e] p-4 rounded-2xl border border-[#213743]/40">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mines Count</p>
                <div className="flex items-center gap-1.5 font-mono font-extrabold text-[#ff334b] text-base">
                  <span>🚩</span> {minesLeft}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Duration</p>
                <div className="flex items-center gap-1.5 font-mono font-extrabold text-cyan-400 text-base">
                  <span>⏱️</span> {formatTime(time)}
                </div>
              </div>
            </div>

            {/* Target Status */}
            <div className="text-center bg-[#0f212e]/50 py-3 rounded-xl border border-[#213743]/20">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Board Grid Details</p>
              <p className="text-xs text-[#b1b6c0] font-bold">
                {difficulties[difficulty].rows} × {difficulties[difficulty].cols} Grid · {difficulties[difficulty].mines} Mines
              </p>
            </div>

          </div>

          {/* Action Bet Button */}
          <div className="pt-6 md:pt-0">
            <button
              onClick={() => resetGame()}
              className="w-full py-4 bg-[#00e701] hover:bg-[#10ff11] text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 active:translate-y-[2px] transition-all duration-150 uppercase text-xs tracking-wider cursor-pointer"
            >
              {gameState === 'playing' ? '💣 Reset Current Round' : '🕹️ Start New Game'}
            </button>
          </div>
        </div>

        {/* Right Board Panel (Stake style) */}
        <div className="flex-1 bg-[#0f212e] p-6 flex flex-col justify-center items-center relative overflow-hidden min-h-[480px]">
          {/* Background grid accent */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(33,55,67,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(33,55,67,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Board */}
          <div className="relative z-10 w-full flex justify-center items-center">
            <GameBoard
              board={board}
              onReveal={handleReveal}
              onFlag={handleFlag}
              gameState={gameState}
              cols={cols}
            />
          </div>

          {/* Status Message */}
          <div className="mt-4 text-center z-10">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
              {gameState === 'won'
                ? '🏆 All mines cleared successfully!'
                : gameState === 'lost'
                ? '💀 Defeat! Try another round.'
                : '🚩 Use Flag right-click to map the board.'}
            </p>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        gameState={gameState}
        time={time}
        onReset={() => resetGame()}
        onGoProfile={() => navigate('/profile')}
      />
    </div>
  );
}
