# Equate

Web implementation of [Equate](https://en.wikipedia.org/wiki/Equate_(game)), a Scrabble-like board game played with math equations.

## Stack

- **Vite** + **React** + **TypeScript**
- **boardgame.io** – game state, turns, local (and later online) multiplayer
- **@dnd-kit** – drag-and-drop for tiles
- **math.js** – equation validation
- **Tailwind CSS** – styling

## Structure

```
src/
├── game/           # boardgame.io game definition
│   ├── equate.ts   # Game config, moves, phases
│   ├── board.ts    # Board state helpers (19×19, premiums)
│   ├── tiles.ts    # Tile set, bag, draws
│   └── validate.ts # Equation validation (math.js)
├── components/
│   ├── Board.tsx   # 19×19 grid, droppable cells
│   ├── Tile.tsx    # Draggable tile
│   ├── Rack.tsx    # Player's tile rack
│   ├── ScoreCard.tsx
│   └── Game.tsx    # boardgame.io Client + layout
├── App.tsx
└── main.tsx
```

## Setup

```bash
npm install
npm run dev
```

Then open the URL shown (e.g. `http://localhost:5173`).

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – ESLint
