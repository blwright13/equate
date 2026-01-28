import { useDraggable } from '@dnd-kit/core'
import type { Tile as TileType } from '@/game/tiles'

interface TileProps {
  tile: TileType
  disabled?: boolean
}

export function Tile({ tile, disabled }: TileProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: tile.id,
    data: { tile },
    disabled,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex h-10 w-10 items-center justify-center rounded border border-slate-300
        bg-amber-50 font-mono text-lg font-semibold shadow
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}
        ${isDragging ? 'invisible' : ''}
      `}
    >
      {tile.face}
    </div>
  )
}
