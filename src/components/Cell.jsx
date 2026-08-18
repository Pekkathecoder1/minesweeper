const NUMBER_COLORS = [
  '',
  'text-sky-400 font-extrabold drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]',
  'text-emerald-400 font-extrabold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]',
  'text-rose-400 font-extrabold drop-shadow-[0_0_8px_rgba(251,113,133,0.4)]',
  'text-violet-400 font-extrabold drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]',
  'text-amber-400 font-extrabold drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]',
  'text-teal-400 font-extrabold drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]',
  'text-fuchsia-400 font-extrabold drop-shadow-[0_0_8px_rgba(232,121,249,0.4)]',
  'text-slate-400 font-extrabold drop-shadow-[0_0_8px_rgba(156,163,175,0.4)]',
];

export default function Cell({ cell, onReveal, onFlag, gameState }) {
  const { isRevealed, isMine, isFlagged, neighborCount } = cell;

  const handleClick = () => {
    if (gameState === 'won' || gameState === 'lost') return;
    onReveal(cell.row, cell.col);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;
    onFlag(e, cell.row, cell.col);
  };

  let content = null;
  let cellClass =
    'w-full h-full flex items-center justify-center text-2xl md:text-3xl font-black select-none rounded-xl transition-all duration-100 ';

  if (isRevealed) {
    if (isMine) {
      // Exploded bomb look: flat red-orange background with glowing bomb
      cellClass += 'bg-gradient-to-br from-rose-500/20 to-red-600/30 border border-red-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_12px_rgba(239,68,68,0.25)] animate-pop';
      content = '💣';
    } else {
      // Recessed well: flat dark slate, inset shadow
      cellClass += 'bg-[#0f212e] border border-[#101f26]/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6)] cursor-default';
      content = neighborCount > 0 ? (
        <span className={`${NUMBER_COLORS[neighborCount]} tracking-tighter`}>
          {neighborCount}
        </span>
      ) : null;
    }
  } else {
    // Unrevealed state: 3D raised block
    cellClass += 'bg-[#213743] border-b-[4px] border-[#101f26] hover:bg-[#2f4553] hover:translate-y-[-1px] hover:border-b-[5px] active:translate-y-[2px] active:border-b-0 shadow-md';
    if (isFlagged) {
      content = <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-base md:text-lg">🚩</span>;
    }
  }

  return (
    <button
      className={cellClass}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      aria-label={
        isRevealed
          ? isMine
            ? 'Mine'
            : `${neighborCount} neighbors`
          : isFlagged
          ? 'Flagged'
          : 'Hidden cell'
      }
    >
      {content}
    </button>
  );
}

