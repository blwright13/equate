/**
 * Board state helpers: 19×19 grid, premium squares.
 */

export const BOARD_SIZE = 19

export type Premium = '2S' | '3S' | '2E' | '3E' | null

export interface BoardCell {
  tileId: string | null
  face: string | null
  premium: Premium
}

export type Board = BoardCell[][]

/** Premium layout (example; replace with official Equate layout). */
const PREMIUMS: Premium[][] = (() => {
  const g: Premium[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null) as Premium[])
  const c = Math.floor(BOARD_SIZE / 2)
  g[c][c] = '2E'
  return g
})()

export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE)
    .fill(null)
    .map((_, r) =>
      Array(BOARD_SIZE)
        .fill(null)
        .map((_, c) => ({
          tileId: null,
          face: null,
          premium: PREMIUMS[r]?.[c] ?? null,
        }))
    )
}

export function getCell(board: Board, row: number, col: number): BoardCell | undefined {
  return board[row]?.[col]
}

export function flatIndex(row: number, col: number): number {
  return row * BOARD_SIZE + col
}

export function indexToPos(idx: number): { row: number; col: number } {
  const row = Math.floor(idx / BOARD_SIZE)
  const col = idx % BOARD_SIZE
  return { row, col }
}
