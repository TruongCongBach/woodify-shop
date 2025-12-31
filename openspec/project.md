# Project Context

## Purpose
Furniture e-commerce site for "Noi That Bach Thao" with a public catalog, admin dashboard, and AI-generated product descriptions.

## Tech Stack
- Next.js 15 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui (Radix UI, lucide-react)
- Data fetching: SWR (client hooks)
- Forms/validation: React Hook Form + Zod
- Auth: NextAuth (Google, Facebook, Credentials) + bcryptjs
- Database: Supabase (PostgreSQL) via @supabase/supabase-js and @supabase/ssr
- Media storage: Cloudinary
- AI: Google Gemini via @google/genai
- **Calendar/Dates**: `lunar-javascript`, `ics`, `date-fns`
- **UI UX**: `sonner` (Toasts), `embla-carousel`
- Analytics: Google Analytics 4
- Deployment: Vercel

## Project Conventions

### Code Style
- TypeScript-first; prefer functional components and named exports for services/hooks.
- Import alias `@/` maps to `src/`.
- ESLint uses Next.js core-web-vitals + TypeScript; a few rules are disabled (img, html link, unused vars, explicit any).
- Formatting is not strictly enforced; follow the local file style (tabs vs spaces, semicolons vary).

### Architecture Patterns
- App Router in `src/app`; route handlers in `src/app/api/*/route.ts`.
- Pages are server components by default; interactive UIs live in client components with `use client`.
- `src/containers` for page-level orchestration; `src/components` for feature UI.
- `src/ui` holds base UI primitives (shadcn) and global styles.
- `src/services` encapsulate Supabase and API calls; `src/hooks` provide SWR wrappers.
- `src/lib` holds third-party integrations (Supabase, Cloudinary, Google AI, NextAuth); `src/config` centralizes env config.
- `src/constants` for static data and enums.

### Testing Strategy
- No automated test runner is configured.
- Manual QA plus `pnpm lint`/`pnpm build` are the primary validation steps.

### Git Workflow
- No explicit workflow documented; prefer small feature branches and PRs when collaborating.
- Do not commit secrets; keep env variables documented in docs/README if new ones are added.

## Domain Context
- Furniture catalog with categories, products, and media assets.
- Admin dashboard for managing categories/products.
- AI-generated short and long product descriptions are created server-side.
- UI copy is primarily Vietnamese.
- **Schedule Calendar**: A comprehensive personal scheduling tool with Vietnamese Lunar Calendar support and ICS subscription capabilities. See [specs/calendar.md](specs/calendar.md) for details.

## Important Constraints
- Environment variables are required for Supabase, NextAuth, OAuth providers, Cloudinary, and Google AI.
- API keys must remain server-side (AI and Cloudinary).
- Cloudinary is the only configured external image source (see `next.config.ts`).
- Admin routes rely on NextAuth JWT role checks (`admin` vs `user`).

## External Dependencies
- Supabase (database + auth + realtime)
- Cloudinary (media uploads)
- Google Gemini (AI content generation)
- Google/Facebook OAuth providers (NextAuth)
- `lunar-javascript` (Date conversion)
- `ics` (Calendar export)
- Vercel (hosting/runtime)
