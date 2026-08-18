import Cell from './Cell';

export default function GameBoard({ board, onReveal, onFlag, gameState, cols }) {
  return (
    <div
      className="bg-[#1a2c38] border border-[#213743]/85 rounded-2xl p-6 shadow-2xl w-full max-w-[480px] mx-auto flex items-center justify-center border-t border-t-slate-700/10"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="grid gap-3 w-full"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {board.map((row) =>
          row.map((cell) => (
            <div
              key={`${cell.row}-${cell.col}`}
              className="w-full aspect-square"
            >
              <Cell
                cell={cell}
                onReveal={onReveal}
                onFlag={onFlag}
                gameState={gameState}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
