## 1. Discovery
- [x] 1.1 Confirm target Next.js 16 channel (stable latest vs canary/rc) and whether Edge runtime is required.
- [x] 1.2 Run the Next.js 16 upgrade workflow (`next upgrade` or `npx @next/codemod@canary upgrade latest`) and capture proposed changes.

## 2. Dependency Upgrade
- [x] 2.1 Update `next`, `react`, `react-dom`, `eslint-config-next`, `@types/react`, and `@types/react-dom` to Next.js 16 compatible versions.
- [x] 2.2 Refresh the pnpm lockfile.

## 3. Config and Structure Alignment
- [x] 3.1 Apply codemod changes for config/script updates (turbopack settings, lint command migration as needed).
- [x] 3.2 Consolidate request interception logic into the chosen Next.js 16 entry point (`proxy.ts` or retain `middleware.ts` if Edge runtime is required).
- [x] 3.3 Verify App Router structure remains in `src/app` and remove any deprecated routing conventions.

## 4. Validation
- [x] 4.1 Run `pnpm lint` and `pnpm build` to validate the upgrade.
- [ ] 4.2 Smoke-test core routes (home, product/category, dashboard auth, API routes).
