/**
 * Tile set, bag, and draw helpers for Equate.
 * Basic set: digits 0–9, + − × ÷, =.
 */

export type TileKind = 'digit' | 'op' | 'equals'

export interface Tile {
  id: string
  face: string
  kind: TileKind
  points: number
}

const DIGITS = '0123456789'
const OPS = ['+', '−', '×', '÷'] as const
const EQUALS = '='

/** Default point values (simplified; can match official Equate later). */
const POINTS: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
  '6': 6, '7': 7, '8': 8, '9': 9,
  '+': 2, '−': 2, '×': 4, '÷': 4, '=': 2,
}

let nextId = 0
function genId(): string {
  return `tile-${++nextId}`
}

function kind(face: string): TileKind {
  if (DIGITS.includes(face)) return 'digit'
  if (face === EQUALS) return 'equals'
  return 'op'
}

export function createTile(face: string): Tile {
  return {
    id: genId(),
    face,
    kind: kind(face),
    points: POINTS[face] ?? 0,
  }
}

/** Build basic tile bag (frequency can be tuned to match official Equate). */
export function createBag(): Tile[] {
  const bag: Tile[] = []
  for (const d of DIGITS) {
    const n = d === '0' ? 2 : 4
    for (let i = 0; i < n; i++) bag.push(createTile(d))
  }
  for (const op of OPS) {
    for (let i = 0; i < 6; i++) bag.push(createTile(op))
  }
  for (let i = 0; i < 8; i++) bag.push(createTile(EQUALS))
  return bag
}

export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
