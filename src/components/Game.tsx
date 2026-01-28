import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDndContext,
  type DragEndEvent,
} from '@dnd-kit/core'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { EquateGame, type EquateG } from '@/game/equate'
import { indexToPos } from '@/game/board'
import { Board } from './Board'
import { Rack } from './Rack'
import { ScoreCard } from './ScoreCard'
import type { Tile as TileType } from '@/game/tiles'

interface EquateBoardProps {
  G: EquateG
  ctx: { currentPlayer: string; turn: number }
  moves: Record<string, (...args: unknown[]) => void>
  playerID: string | null
}

function TileOverlay({ tile }: { tile: TileType }) {
  return (
    <div
      className="flex h-10 w-10 cursor-grabbing items-center justify-center rounded border border-slate-300 bg-amber-50 font-mono text-lg font-semibold shadow-lg"
      role="presentation"
    >
      {tile.face}
    </div>
  )
}

function GameDragOverlay() {
  const { active } = useDndContext()
  const tile = (active?.data?.current as { tile?: TileType } | undefined)?.tile
  return (
    <DragOverlay>
      {tile ? <TileOverlay tile={tile} /> : null}
    </DragOverlay>
  )
}

function EquateBoard({ G, ctx, moves, playerID }: EquateBoardProps) {
  const pid = playerID ?? '0'
  const hand = G.hands[pid] ?? []
  const isMyTurn = ctx.currentPlayer === pid

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const overId = over?.id != null ? String(over.id) : ''
    if (!overId.startsWith('cell-')) return
    const idx = parseInt(overId.replace('cell-', ''), 10)
    if (Number.isNaN(idx)) return
    const { row, col } = indexToPos(idx)
    const cell = G.board[row]?.[col]
    if (!cell || cell.tileId != null) return
    moves.placeTile({ row, col, tileId: String(active.id) })
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex min-h-screen flex-col items-center gap-6 bg-slate-100 p-6">
        <h1 className="text-2xl font-bold text-slate-800">Equate</h1>
        <ScoreCard scores={G.scores} currentPlayer={ctx.currentPlayer} />
        <Board board={G.board} />
        <Rack hand={hand} disabled={!isMyTurn} />
      </div>
      <GameDragOverlay />
    </DndContext>
  )
}

const EquateClient = Client({
  game: EquateGame,
  multiplayer: Local(),
  board: EquateBoard,
})

export function Game() {
  return <EquateClient playerID="0" />
}
