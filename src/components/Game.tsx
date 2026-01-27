import { DndContext } from '@dnd-kit/core'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { EquateGame, type EquateG } from '@/game/equate'
import { Board } from './Board'
import { Rack } from './Rack'
import { ScoreCard } from './ScoreCard'

interface EquateBoardProps {
  G: EquateG
  ctx: { currentPlayer: string; turn: number }
  moves: Record<string, (...args: unknown[]) => void>
  playerID: string | null
}

function EquateBoard({ G, ctx, moves: _moves, playerID }: EquateBoardProps) {
  const pid = playerID ?? '0'
  const hand = G.hands[pid] ?? []
  const isMyTurn = ctx.currentPlayer === pid

  function handleDragEnd() {
    // TODO: resolve drop target, validate equation, call _moves.placeTiles
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex min-h-screen flex-col items-center gap-6 bg-slate-100 p-6">
        <h1 className="text-2xl font-bold text-slate-800">Equate</h1>
        <ScoreCard scores={G.scores} currentPlayer={ctx.currentPlayer} />
        <Board board={G.board} />
        <Rack hand={hand} disabled={!isMyTurn} />
      </div>
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
