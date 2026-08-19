import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext(null);

const defaultProfile = {
  username: 'Minesweeper Pro',
  avatar: '💣',
  bio: 'Living on the edge, one mine at a time.',
  gamesPlayed: 0,
  wins: 0,
  highScore: 0, // best time (seconds), lower = better
  isProSubscriber: false,
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('minesweeper_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem('minesweeper_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const recordGame = ({ won, time }) => {
    setProfile((prev) => {
      const newWins = won ? prev.wins + 1 : prev.wins;
      const newPlayed = prev.gamesPlayed + 1;
      const newHighScore =
        won
          ? prev.highScore === 0
            ? time
            : Math.min(prev.highScore, time)
          : prev.highScore;
      return {
        ...prev,
        gamesPlayed: newPlayed,
        wins: newWins,
        highScore: newHighScore,
      };
    });
  };

  const winRate =
    profile.gamesPlayed > 0
      ? Math.round((profile.wins / profile.gamesPlayed) * 100)
      : 0;

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, recordGame, winRate }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
