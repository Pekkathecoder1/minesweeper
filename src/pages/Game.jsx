import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMinesweeper } from '../hooks/useMinesweeper';
import { useProfile } from '../context/ProfileContext';
import GameBoard from '../components/GameBoard';
import GameOverModal from '../components/GameOverModal';

export default function Game() {
  const navigate = useNavigate();
  const { profile, updateProfile, recordGame } = useProfile();
  const [showBillingModal, setShowBillingModal] = useState(false);

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

            {/* Minesweeper Pro (VIP Radar Cheat) */}
            <div className="bg-[#0f212e]/80 border border-purple-500/25 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-[8px] font-black text-slate-100 uppercase tracking-widest rounded-bl-lg">
                VIP CHEAT
              </div>
              <div>
                <h3 className="text-[11px] font-black text-purple-400 tracking-wider uppercase">
                  💎 Minesweeper Pro
                </h3>
                <p className="text-[9px] text-slate-500 font-bold mt-0.5 leading-normal">
                  Wanna know where the mines are?
                </p>
              </div>

              {profile.isProSubscriber ? (
                <div className="flex flex-col gap-1.5">
                  <div className="text-[10px] font-black text-emerald-400 flex items-center justify-center gap-1.5 bg-emerald-500/10 px-2 py-1.5 rounded-lg border border-emerald-500/20 uppercase tracking-wider">
                    <span>✓</span> Radar Active
                  </div>
                  <button
                    onClick={() => updateProfile({ isProSubscriber: false })}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-[9px] text-slate-350 font-extrabold rounded-lg tracking-wider transition-colors duration-150 uppercase cursor-pointer"
                  >
                    Disable Radar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowBillingModal(true)}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-450 hover:to-indigo-450 text-slate-100 text-[10px] font-extrabold rounded-lg tracking-wider hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 uppercase cursor-pointer"
                >
                  Activate Radar ($90k/day)
                </button>
              )}
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

      {/* Stake-style Pro Billing Modal */}
      {showBillingModal && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#1a2c38] border border-purple-500/35 rounded-3xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-slide-down relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-purple-500 to-indigo-500" />
            
            <div className="text-center mt-3">
              <div className="text-5xl mb-3 drop-shadow-md select-none">💎</div>
              <h2 className="text-lg font-black text-slate-100 tracking-tight uppercase">
                SUBSCRIBE TO PRO RADAR
              </h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">
                SECURE CASINO SUBSCRIPTION
              </p>

              <div className="bg-[#0f212e] border border-[#213743]/60 rounded-2xl p-4 my-5 space-y-2.5 text-left shadow-inner">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Account Username:</span>
                  <span className="font-extrabold text-slate-200 tracking-tight">{profile.username}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Feature Access:</span>
                  <span className="font-extrabold text-purple-400 uppercase tracking-wide">X-Ray Mine Radar</span>
                </div>
                <div className="border-t border-[#213743]/80 pt-2.5 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold">Billed Amount:</span>
                  <span className="font-mono font-black text-[#00e701] text-sm">
                    $90,000.00 <span className="text-[10px] text-slate-500">/ Day</span>
                  </span>
                </div>
              </div>

              <p className="text-[9px] text-slate-500 leading-normal mb-5">
                By confirming, you agree that your balance will be charged $90,000.00 daily. You can cancel this feature at any time.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    updateProfile({ isProSubscriber: true });
                    setShowBillingModal(false);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-100 font-extrabold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/10 cursor-pointer text-xs uppercase tracking-wider"
                >
                  Confirm Subscription
                </button>
                <button
                  onClick={() => setShowBillingModal(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-350 font-semibold rounded-xl transition-colors duration-150 cursor-pointer text-xs uppercase tracking-wider"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
