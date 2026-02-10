# Suntimes

Queensland's AI-powered tourism platform.

## Structure

- `packages/shared` — Database, API clients, LLM utilities
- `packages/agent` — ElizaOS Twitter agent
- `apps/web` — Next.js web portal
- `apps/admin` — Admin dashboard

## Setup

```bash
pnpm install
cp .env.example .env
# Fill in env vars
pnpm run db:push
pnpm run db:seed
pnpm dev
```
