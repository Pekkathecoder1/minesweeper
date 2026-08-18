import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

const AVATAR_OPTIONS = ['💣', '🧨', '🦊', '🐉', '🤖', '👾', '🦸', '🐺', '🎭', '🌟'];

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center text-center hover:border-amber-400/40 hover:scale-[1.03] transition-all duration-300 shadow-md">
      <span className="text-3xl mb-2 select-none">{icon}</span>
      <p className="text-2xl font-black text-slate-100 tracking-tight">{value}</p>
      <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{label}</p>
    </div>
  );
}

export default function Profile() {
  const { profile, updateProfile, winRate } = useProfile();
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [draftUsername, setDraftUsername] = useState(profile.username);
  const [draftBio, setDraftBio] = useState(profile.bio);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const saveUsername = () => {
    const trimmed = draftUsername.trim();
    if (trimmed) updateProfile({ username: trimmed });
    setEditingUsername(false);
  };

  const saveBio = () => {
    updateProfile({ bio: draftBio.trim() });
    setEditingBio(false);
  };

  const formatHighScore = () => {
    if (!profile.highScore) return '—';
    const m = Math.floor(profile.highScore / 60);
    const s = profile.highScore % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 p-6 flex flex-col items-center animate-fade-in relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full space-y-6 relative z-10">
        <h1 className="text-3xl font-black text-slate-100 tracking-tight text-center pt-4">👤 OPERATOR DOSSIER</h1>

        {/* Profile Card */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
          
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6 pt-2">
            <div className="relative group">
              <button
                onClick={() => setShowAvatarPicker((v) => !v)}
                className="text-7xl bg-slate-950/80 border border-slate-800 rounded-full p-5 hover:bg-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer ring-4 ring-slate-850 hover:ring-amber-500/40"
                title="Change avatar"
              >
                {profile.avatar}
              </button>
              <span className="absolute bottom-1 right-1 text-sm bg-amber-400 text-slate-950 rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-md cursor-pointer pointer-events-none">
                ✏️
              </span>
            </div>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2 justify-center animate-slide-down max-w-sm shadow-xl">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      updateProfile({ avatar: emoji });
                      setShowAvatarPicker(false);
                    }}
                    className={`text-2xl p-2 rounded-xl hover:bg-slate-800 transition-all duration-200 cursor-pointer ${
                      profile.avatar === emoji ? 'bg-slate-800/80 ring-2 ring-amber-400 shadow-md' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Operator Username
            </label>
            {editingUsername ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draftUsername}
                  onChange={(e) => setDraftUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveUsername()}
                  maxLength={24}
                  autoFocus
                  className="flex-1 bg-slate-950 border border-amber-500/50 text-slate-100 rounded-xl px-4 py-2.5 outline-none font-semibold focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                />
                <button
                  onClick={saveUsername}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-350 hover:to-orange-400 text-slate-950 font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setDraftUsername(profile.username);
                    setEditingUsername(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-950/60 border border-slate-850 rounded-xl px-4 py-3 shadow-inner">
                <span className="font-extrabold text-slate-100 text-lg tracking-tight">{profile.username}</span>
                <button
                  onClick={() => {
                    setDraftUsername(profile.username);
                    setEditingUsername(true);
                  }}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-xs uppercase tracking-wider font-extrabold cursor-pointer"
                >
                  ✏️ Edit
                </button>
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Operator Signature / Bio
            </label>
            {editingBio ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={draftBio}
                  onChange={(e) => setDraftBio(e.target.value)}
                  maxLength={120}
                  autoFocus
                  rows={2}
                  className="bg-slate-950 border border-amber-500/50 text-slate-100 rounded-xl px-4 py-2.5 outline-none resize-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveBio}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-350 hover:to-orange-400 text-slate-950 font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setDraftBio(profile.bio);
                      setEditingBio(false);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-950/60 border border-slate-850 rounded-xl px-4 py-3 shadow-inner">
                <span className="text-slate-400 italic text-sm">{profile.bio || 'No bio configuration saved...'}</span>
                <button
                  onClick={() => {
                    setDraftBio(profile.bio);
                    setEditingBio(true);
                  }}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-xs uppercase tracking-wider font-extrabold ml-3 shrink-0 cursor-pointer"
                >
                  ✏️ Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-3">📊 Stat Records</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon="🎮" label="Played" value={profile.gamesPlayed} />
            <StatCard icon="🏆" label="Wins" value={profile.wins} />
            <StatCard icon="📈" label="Win Rate" value={`${winRate}%`} />
            <StatCard icon="⏱️" label="Best Time" value={formatHighScore()} />
          </div>
        </div>

        {/* Win rate bar */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Win Rate Progress</span>
            <span className="text-sm font-black text-amber-400">{winRate}%</span>
          </div>
          <div className="w-full bg-slate-950 border border-slate-850 rounded-full h-3.5 p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 h-2.5 rounded-full transition-all duration-700 shadow-md shadow-orange-500/20"
              style={{ width: `${winRate}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

