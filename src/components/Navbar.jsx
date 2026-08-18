import { NavLink } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export default function Navbar() {
  const { profile } = useProfile();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">💣</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent tracking-wider">
            MINESWEEPER
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 bg-slate-950/40 p-1 rounded-xl border border-slate-800/40">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`
            }
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`
            }
          >
            🎮 Play
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`
            }
          >
            👤 Profile
          </NavLink>
        </div>

        {/* Avatar chip */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/60 px-3.5 py-1.5 rounded-full hover:border-slate-500 transition-colors duration-300 shadow-md">
          <span className="text-lg">{profile.avatar}</span>
          <span className="text-xs font-bold text-slate-200 hidden sm:block tracking-wide">
            {profile.username}
          </span>
        </div>
      </div>
    </nav>
  );
}

