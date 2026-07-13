# 🏆 Oscars Ballot

[![CI](https://github.com/estebanchos/oscar-predictions/actions/workflows/ci.yml/badge.svg)](https://github.com/estebanchos/oscar-predictions/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A full-stack web app for running an Academy Awards prediction pool with friends.
Players predict the winner in every category, and a live leaderboard tracks whose
picks are holding up as the results roll in on Oscar night.

Built with the Next.js App Router, React Server Components, and a type-safe
Prisma/PostgreSQL backend.

## 🚧 Roadmap

Planned upgrades to make the app reusable season after season:

- **Flexible data model** — Restructure the schema so category changes that happen
  year over year (new categories, renames, retirements) are handled by data, not
  code.
- **In-app content management** — Add and update categories and nominees directly
  through an admin upload flow, removing the need to edit and redeploy code each
  year.

## Features

- **🗳️ Make predictions** — Players enter their name and pick a winner across all
  23 Oscar categories. Picks can be revised any time before voting closes.
- **📊 Live leaderboard** — Scores update as winners are announced, with a top-3
  podium, full rankings, per-player accuracy, and drill-down into each player's
  ballot.
- **🔐 Admin dashboard** — Password-protected panel to set the official winner in
  each category, toggle voting open/closed globally, and monitor voter and vote
  counts in real time.
- **⚡ Server Actions** — All mutations run as type-safe Next.js server actions
  with Zod validation — no separate API layer to maintain.

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | Next.js 15 (App Router, Turbopack), React 19, TypeScript |
| Database   | PostgreSQL via Prisma ORM                                |
| UI         | Tailwind CSS v4, shadcn/ui, Radix UI, Lucide icons       |
| Validation | Zod + React Hook Form                                    |
| Auth       | Cookie-based admin session (bcrypt)                      |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env   # then edit .env with your own values

# 3. Set up the database
npx prisma migrate dev
npx prisma db seed

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

See [`.env.example`](./.env.example) for the environment variables the app requires.

## How It Works

1. Categories and nominees are seeded into the database.
2. Each player creates a ballot and predicts a winner per category (one vote per
   category, enforced at the database level).
3. On Oscar night, the admin marks the real winner in each category.
4. The leaderboard scores every ballot against the announced winners and ranks
   players live.


## License

[MIT](./LICENSE)
