interface ScoreCardProps {
  scores: Record<string, number>
  currentPlayer?: string
}

export function ScoreCard({ scores, currentPlayer }: ScoreCardProps) {
  const entries = Object.entries(scores).sort(([a], [b]) => Number(a) - Number(b))

  return (
    <div className="flex gap-4 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
      {entries.map(([playerId, points]) => (
        <div
          key={playerId}
          className={`
            font-semibold
            ${playerId === currentPlayer ? 'text-emerald-600 underline' : 'text-slate-600'}
          `}
        >
          P{Number(playerId) + 1}: {points}
        </div>
      ))}
    </div>
  )
}
