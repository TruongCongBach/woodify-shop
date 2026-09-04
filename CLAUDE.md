# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

**Woodify Shop** (`noithatbachthao`) is a Vietnamese furniture e-commerce site built as a single Next.js 16 app. App Router, Tailwind CSS v4, shadcn/ui primitives in `src/ui`, Supabase (Postgres + Auth), NextAuth, Google Gemini AI, Cloudinary, Facebook Messenger chatbot.

## Development Commands

Run from repository root. Package manager: **pnpm@10.20.0**.

```bash
pnpm install          # Install dependencies
pnpm dev              # Next.js dev server (Turbopack)
pnpm build            # Build for production (Turbopack)
ANALYZE=true pnpm build   # Bundle analysis
pnpm start            # Start production server
pnpm lint             # ESLint over the whole project (flat config: eslint.config.mjs)
pnpm add <pkg>        # Add dependency
pnpm add -D <pkg>     # Add dev dependency
```

- TypeScript check: `npx tsc --noEmit` (tsconfig strict, path alias `@/*` → `./src/*`).
- No test framework is configured. Only ad-hoc scripts live in `scripts/` (chatbot dedupe/facebook tests, `test-handover.ts`).
- No Prettier config. Formatting follows ESLint + project conventions.

## Architecture

### Layered data flow (strict)

```
Page (app/*/page.tsx) → Container (containers/*) → Component (components/*)
  → Hook (hooks/*) → Service (services/*) → API Route (app/api/*) / External Service
```

- **Pages**: routing, metadata, server-side data fetching.
- **Containers**: orchestrate page sections, hold business logic.
- **Components**: pure presentational UI.
- **Hooks**: SWR-based data fetching (`useProducts`, `useCategories`, `useProductByUrl`, `useProductSearchByCondition` with `useSWRInfinite`). Generic wrapper: `useApi()`.
- **Services**: business logic + external integrations. Feature folders: `services/product`, `services/category`, `services/media`, `services/user`, `services/ai`, `services/chatbot`.
- **API Routes**: write operations go through routes; reads go **directly to Supabase** from hooks (no API-route intermediary).

### Two Supabase clients

- `lib/supabase/client.ts` — browser client (`@supabase/ssr`), used by category service.
- `lib/supabase/server.ts` — server client (`@supabase/ssr`, cookie-based) for Server Components / API routes.
- `lib/supabase/index.ts` — `createClient()` from `@supabase/supabase-js`, used by product/user services.

### Type transformation

DB rows (snake_case) → UI types (camelCase) in the service layer via transformers:
`transform-product-to-form-data.ts` / `transform-product-to-db-format.ts`,
`transform-category-to-form-data.ts` / `transform-category-to-db-format.ts`.

### Centralized exports

Import from barrel files, never deep-import:
`@/utils`, `@/services/product`, `@/services/category`, `@/constants`, `@/config`.

**Critical**: avoid barrel exports from `@/services` in client components — they pull server-side deps (Cloudinary, etc.) into the client bundle. Import specific files instead:
```typescript
import { generateProductDescription } from '@/services/ai/generate-product-description'
```

### Configuration

All external config centralized in `src/config/index.ts`. Always use `config.*`, never `process.env.*` directly. Env vars documented in `.env.example`.

### Key integrations

- **Supabase**: DB + Auth. Migrations managed externally in Supabase dashboard (no local SQL).
- **NextAuth** (`lib/next-auth-options.ts`): Google, Facebook, Credentials. JWT strategy, admin-only sign-in gate, role stored in token.
- **Google Gemini** (`lib/google-ai.ts`): singleton `GoogleGenAI`, Gemini 2.5 Flash. Server-side only. Prompts built via `utils/ai-prompt-builder.ts`.
- **Cloudinary** (`lib/cloudinary.ts`): image upload via `app/api/upload-image/route.ts`. Server-side only.
- **Chatbot**: Facebook Messenger webhook at `app/api/chatbot/webhook/route.ts`. `services/chatbot/` parses intent via Gemini, searches products, generates sales copy, sends via Messenger Send API. Handover at `app/api/chatbot/handover/route.ts`.

### UI layer

`src/ui/` holds shared primitives: `shadcn-ui/` (accordion, button, card, dialog, form, table, carousel, etc.), `lib/utils.ts` (`cn` helper), `styles/globals.css`, `icons/`. Tailwind v4 via `@tailwindcss/postcss`.

## OpenSpec

This project uses OpenSpec for change management. When a request mentions planning, proposals, specs, or introduces new capabilities/breaking changes, open `@/openspec/AGENTS.md` first. Slash commands live in `.claude/commands/openspec/{apply,archive,proposal}.md`. Specs under `openspec/specs/`, proposals under `openspec/changes/`.

## Deployment

Vercel (vercel.json): framework nextjs, commands `pnpm install` / `pnpm build` / `pnpm dev`, output `.next`. Redirects `www.noithatbachthao.com` → `noithatbachthao.com` (permanent). English URL paths redirect to Vietnamese equivalents in `next.config.ts` (e.g. `/about-us` → `/ve-chung-toi`). No GitHub Actions CI/CD configured.

## Conventions worth remembering

- **Vietnamese UI copy** by default.
- **TypeScript strict mode**; prefer enums over string literals.
- **SWR** for data fetching hooks; `dynamic` import with skeletons for client-only/heavy components.
- **Singleton pattern** for expensive instances (AI, DB clients).
- **Direct imports** from specific service files in client components.
- **ErrorBoundary** for networked UI.
- ESLint flat config (`eslint.config.mjs`) extends `eslint-config-next/core-web-vitals` + typescript; disables `no-img-element`, `no-html-link-for-pages`, `no-unused-vars`, `no-explicit-any`.