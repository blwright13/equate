import { useDroppable } from '@dnd-kit/core'
import {
  BOARD_SIZE,
  flatIndex,
  type Board as BoardType,
  type BoardCell,
} from '@/game/board'

interface CellProps {
  cell: BoardCell
  row: number
  col: number
}

function Cell({ cell, row, col }: CellProps) {
  const id = `cell-${flatIndex(row, col)}`
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { row, col },
    disabled: cell.tileId != null,
  })

  const hasTile = cell.tileId != null
  const tileStyle =
    'border-slate-300 bg-amber-50 font-mono text-sm font-semibold shadow'
  const emptyStyle = cell.premium
    ? 'border-slate-200 bg-amber-200/50 font-bold text-amber-900 text-xs'
    : 'border-slate-200 bg-emerald-50 text-xs'

  return (
    <div
      ref={setNodeRef}
      className={`
        flex h-8 w-8 min-w-8 max-w-8 items-center justify-center rounded border
        ${hasTile ? tileStyle : emptyStyle}
        ${isOver ? 'ring-2 ring-slate-400' : ''}
      `}
      data-row={row}
      data-col={col}
    >
      {cell.face ?? cell.premium ?? ''}
    </div>
  )
}

interface BoardProps {
  board: BoardType
}

export function Board({ board }: BoardProps) {
  return (
    <div
      className="inline-grid gap-px rounded-lg border-2 border-slate-300 bg-slate-200 p-1"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} cell={cell} row={r} col={c} />
        ))
      )}
    </div>
  )
}
