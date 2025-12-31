## Context
- Current framework: Next.js 15.5.9 with React 19.
- App Router is already in use under `src/app`.
- Request interception exists in `middleware.ts` (root) and a separate `src/proxy.ts` file for admin protection.
- Next.js 16 renames `middleware` to `proxy`, and `proxy` runs only on the Node.js runtime (edge is not supported).

## Goals / Non-Goals
- Goals:
  - Upgrade to the latest stable Next.js 16 release with compatible dependencies.
  - Align request interception to Next.js 16 file conventions.
  - Keep the App Router structure aligned with framework guidance.
- Non-Goals:
  - Redesign UI or change product/admin features.
  - Introduce new infrastructure beyond the upgrade.

## Decisions
- Use the Next.js 16 upgrade workflow (`next upgrade` or `@next/codemod`) to apply required codemods.
- Consolidate request interception into a single entry point using `proxy.ts`, assuming Node.js runtime is acceptable.

## Alternatives Considered
- Keep `middleware.ts` to preserve Edge runtime behavior if required; skip `proxy` migration.
- Manual upgrade without codemods (higher risk of missing config/script changes).

## Risks / Trade-offs
- `proxy.ts` runs on Node.js only; if Edge runtime is required, a `middleware.ts` file must remain.
- Codemods may change lint commands or config conventions and require follow-up adjustments.
- Dependencies (NextAuth, Supabase, Cloudinary) may need minor updates for compatibility with Next.js 16.

## Migration Plan
1. Confirm whether Edge runtime is required for request interception.
2. Run the upgrade workflow and review diffs for config/script changes.
3. Update dependencies and lockfile for Next.js 16.
4. Merge request interception logic into the chosen file convention.
5. Validate with `pnpm lint` and `pnpm build` plus a quick route smoke test.

## Open Questions
- Do you need Edge runtime features in request interception? (If yes, keep `middleware.ts`.)
- Should we target the latest stable release only, or allow canary/rc?
- Are there any deployment constraints (Vercel settings, CI scripts) that must be preserved?
