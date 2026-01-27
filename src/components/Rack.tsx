import type { Tile as TileType } from '@/game/tiles'
import { Tile } from './Tile'

interface RackProps {
  hand: TileType[]
  disabled?: boolean
}

export function Rack({ hand, disabled }: RackProps) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-slate-300 bg-slate-100 p-3">
      {hand.map((t) => (
        <Tile key={t.id} tile={t} disabled={disabled} />
      ))}
    </div>
  )
}
