# Suntimes — Session Context File

## What This Project Is
AI-powered Queensland tourism platform. Twitter bot (@SuntimesQLD), public web portal, and admin dashboard. Built for NULLH SYSTEMS.

## Repository
- **GitHub**: https://github.com/0xnullh-coder/suntimes
- **Current tag**: `v1.0.0`
- **Branch**: `main` (2 commits)

## Architecture
- **Monorepo**: Turborepo + pnpm workspaces
- **packages/shared**: DB schema (Drizzle ORM, 9 tables), seed data, LLM client (Anthropic Claude), API clients (BOM weather, Google Places, Eventbrite)
- **packages/agent**: ElizaOS Twitter bot — character file, services (priorityScorer, intentClassifier, qualityGate, portalLinkSelector), providers (weather, venue, events, tourismStats, olympics), actions (recommendVenue, buildItinerary, generatePost, handleTransparency), evaluators (contentQuality, regionalCoverage)
- **apps/web**: Next.js 14 portal — 14 routes, 17 components, streaming AI chat, explore/venues/events/itineraries/2032 Olympics/pricing pages
- **apps/admin**: Next.js 14 dashboard — basePath `/admin`, password-protected via middleware, venues CRUD, review queue, analytics, emergency kill switch

## Production Deployment (Hetzner 77.42.71.122)
- **Web portal**: https://suntimes.nullh.xyz → port 8002 (PM2: `suntimes-web`)
- **Admin dashboard**: https://suntimes.nullh.xyz/admin → port 8003 (PM2: `suntimes-admin`)
- **Database**: PostgreSQL on localhost:5433, DB `suntimes`, user `suntimes`
- **SSL**: Let's Encrypt via certbot, auto-renewing
- **Nginx**: `/etc/nginx/sites-enabled/suntimes`
- **PM2 config**: `/app/suntimes/ecosystem.config.js`
- **App directory**: `/app/suntimes/`
- **Port registry**: Updated in `/app/xyz-frontend/governance/PORT_REGISTRY.md`

## Database State
Fully seeded:
- 7 regions (Brisbane, Gold Coast, Sunshine Coast, Tropical North QLD, Whitsundays, Fraser Coast, Outback QLD)
- 50 venues (10 per major region)
- 5 itineraries with day/stop JSON structures
- 8 recurring events
- 5 Olympics 2032 updates
- system_config: emergency_mode=false, max_replies_per_day=50, min_priority_score=25

## Key Technical Notes
- Next.js 14 requires `.mjs` config (not `.ts`)
- Agent package needs `drizzle-orm` as direct dep (not just via shared)
- Web app needs `@anthropic-ai/sdk` for chat streaming
- DB-dependent routes log warnings during build (expected, work at runtime)
- Server git has stale HTTPS token — use `GIT_CONFIG_GLOBAL=/dev/null` for git pull, or SSH doesn't work for this repo (deploy key scoped to xyz-frontend)
- PM2 script must point to `node_modules/next/dist/bin/next` (not `.bin/next` which is a shell script)
- LLM models: `claude-haiku-4-5-20251001` (simple), `claude-sonnet-4-5-20250929` (complex)

## Server Deployment Rules (NULLH SYSTEMS)
- All apps under `/app/` with own subdirectory
- Port registry must be updated
- Nginx config changes need CEO approval (was approved this session)
- Build with `NODE_OPTIONS="--max-old-space-size=2048"`
- PM2 for process management, `pm2 save` after changes
- Git-based deployment: `git pull` on server

## Environment Variables Needed
Set in `/app/suntimes/ecosystem.config.js` and `/app/suntimes/.env`:
- `DATABASE_URL` — ✅ configured
- `ANTHROPIC_API_KEY` — ⚠️ placeholder, needs real key for AI chat to work
- `ADMIN_PASSWORD` — ✅ set to `suntimes_admin_2024`
- `TWITTER_*` — not configured (agent not active)
- `STRIPE_*` — not configured (payments not active)
- `NEXT_PUBLIC_MAPBOX_TOKEN` — not configured (maps not active)
- `GOOGLE_PLACES_API_KEY` — not configured (using seed data)
- `EVENTBRITE_API_KEY` — not configured (using seed data)

## What's Working
- Full web portal renders at https://suntimes.nullh.xyz
- Admin dashboard at https://suntimes.nullh.xyz/admin (password: suntimes_admin_2024)
- All static pages render
- Database queries work for dynamic routes
- SSL/HTTPS active

## What Needs Attention Next
1. **ANTHROPIC_API_KEY**: Set real key in ecosystem.config.js for AI chat to work
2. **Twitter agent**: Not deployed — needs Twitter credentials + ElizaOS runtime
3. **Stripe integration**: Pricing page exists but payments not wired up
4. **Mapbox maps**: Map components exist but need token
5. **Google Places / Eventbrite**: Using seed data, could wire up live APIs
6. **DNS cleanup**: Remove unused `admin.suntimes` A record from GoDaddy
7. **Repo visibility**: Was set to public for deployment — consider making private again + adding deploy key

## Voice Rules (for any content changes)
- Always "we" never "I"
- Australian English (colour, favourite, arvo, brekkie, reckon)
- Opinionated and specific, never brochure-generic
