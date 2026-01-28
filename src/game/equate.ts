/**
 * boardgame.io game definition for Equate.
 * Game config, moves, phases. Local play by default.
 */

import { Game } from 'boardgame.io'
import { createEmptyBoard, type Board } from './board'
import { createBag, shuffle, type Tile } from './tiles'

const RACK_SIZE = 9

export interface EquateG {
  board: Board
  bag: Tile[]
  hands: Record<string, Tile[]>
  scores: Record<string, number>
}

function createInitialBag() {
  return shuffle(createBag())
}

function draw(g: EquateG, playerId: string, n: number): void {
  const hand = g.hands[playerId] ?? []
  for (let i = 0; i < n && g.bag.length > 0; i++) {
    const t = g.bag.pop()!
    hand.push(t)
  }
  g.hands[playerId] = hand
}

function setupFixed(ctx: { random?: { Shuffle: (a: unknown[]) => unknown[] } }): EquateG {
  const bag = ctx.random ? (ctx.random.Shuffle(createBag()) as Tile[]) : createInitialBag()
  const hands: Record<string, Tile[]> = {}
  const numPlayers = 2
  for (let i = 0; i < numPlayers; i++) {
    const pid = String(i)
    hands[pid] = []
  }
  const g: EquateG = {
    board: createEmptyBoard(),
    bag: [...bag],
    hands: { ...hands },
    scores: { '0': 0, '1': 0 },
  }
  for (let i = 0; i < numPlayers; i++) {
    draw(g, String(i), RACK_SIZE)
  }
  return g
}

export const EquateGame: Game<EquateG> = {
  name: 'equate',
  setup: setupFixed,

  moves: {
    placeTile(
      { G, ctx }: { G: EquateG; ctx: { currentPlayer: string } },
      { row, col, tileId }: { row: number; col: number; tileId: string }
    ) {
      const pid = ctx.currentPlayer
      const hand = G.hands[pid]
      if (!hand) return
      const tileIdx = hand.findIndex((t) => t.id === tileId)
      if (tileIdx === -1) return
      const cell = G.board[row]?.[col]
      if (!cell || cell.tileId != null) return
      const tile = hand[tileIdx]
      G.board[row][col] = {
        tileId: tile.id,
        face: tile.face,
        premium: cell.premium,
      }
      hand.splice(tileIdx, 1)
    },
  },
}
