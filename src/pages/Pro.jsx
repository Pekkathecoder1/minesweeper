import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

export default function Pro() {
  const { profile, updateProfile } = useProfile();
  const [showBillingModal, setShowBillingModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f212e] p-6 flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
      {/* Background glowing rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#1a2c38] border border-[#213743]/80 rounded-3xl shadow-2xl p-8 relative z-10 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 animate-pulse" />

        <div className="text-6xl mb-4 drop-shadow-[0_4px_12px_rgba(168,85,247,0.3)] select-none">💎</div>
        <h1 className="text-3xl font-black text-slate-100 tracking-tight uppercase">
          Minesweeper <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Pro</span>
        </h1>
        <p className="text-[#b1b6c0] text-xs font-bold uppercase tracking-wider mt-1">
          VIP Tactical Cheat Engine
        </p>

        {/* Feature List */}
        <div className="my-6 space-y-3.5 text-left bg-[#0f212e]/60 border border-[#213743]/40 p-5 rounded-2xl shadow-inner">
          <div className="flex items-start gap-3">
            <span className="text-purple-400 text-lg">🛰️</span>
            <div>
              <p className="text-xs font-extrabold text-slate-200 uppercase tracking-wide">Real-time X-Ray Radar</p>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed mt-0.5">
                Every hidden mine location is marked with a subtle, pulsing red radar dot.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-[#213743]/60 pt-3">
            <span className="text-purple-400 text-lg">💰</span>
            <div>
              <p className="text-xs font-extrabold text-slate-200 uppercase tracking-wide">100% Win Assurance</p>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed mt-0.5">
                Avoid false guesses, plan optimal clearance routes, and cash out win multipliers instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Subscription details card */}
        <div className="bg-[#0f212e] border border-[#213743]/60 rounded-2xl p-5 mb-6 text-left shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Status</span>
            {profile.isProSubscriber ? (
              <span className="text-[10px] font-black text-[#00e701] uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Active / Subscribed
              </span>
            ) : (
              <span className="text-[10px] font-black text-[#ff334b] uppercase tracking-wider bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                Not Active
              </span>
            )}
          </div>
          <div className="border-t border-[#213743]/80 pt-4 flex justify-between items-center">
            <div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Subscription Cost</p>
              <p className="text-2xl font-mono font-black text-[#00e701] tracking-tight mt-0.5">
                $90,000.00 <span className="text-xs text-slate-500">/ Day</span>
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Subscribe Button */}
        {profile.isProSubscriber ? (
          <button
            onClick={() => updateProfile({ isProSubscriber: false })}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold rounded-xl tracking-wider transition-all duration-200 uppercase cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Cancel Daily Radar Subscription
          </button>
        ) : (
          <button
            onClick={() => setShowBillingModal(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-100 text-xs font-extrabold rounded-xl tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/20 cursor-pointer uppercase"
          >
            Subscribe & Reveal Mines
          </button>
        )}

        <p className="text-[9px] text-slate-600 mt-4 leading-normal">
          Charges are billed directly to your operator account balance. Standard cancellation policy applies.
        </p>
      </div>

      {/* Stake-style Pro Billing Modal */}
      {showBillingModal && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#1a2c38] border border-purple-500/35 rounded-3xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-slide-down relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-purple-500 to-indigo-500" />
            
            <div className="text-center mt-3">
              <div className="text-5xl mb-3 drop-shadow-md select-none">💎</div>
              <h2 className="text-lg font-black text-slate-100 tracking-tight uppercase">
                CONFIRM TRANSACTION
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
