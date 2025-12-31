# Change: Update Next.js to v16 and align project structure

## Why
- The project is on Next.js 15.5.9 and needs to upgrade to the latest Next.js 16 for long-term support and compatibility.
- Next.js 16 introduces the Proxy convention and upgrade tooling, so aligning structure now reduces future maintenance.

## What Changes
- Upgrade dependencies to Next.js 16 (latest stable) and compatible React/React DOM and type packages.
- Apply the Next.js 16 upgrade workflow (`next upgrade` or `@next/codemod`) to update configs and scripts.
- Consolidate request interception to a single Next.js 16-compliant entry point (Proxy convention) unless edge runtime requirements dictate otherwise.
- Validate App Router structure remains consistent with Next.js 16 conventions.

## Impact
- Affected specs: manage-framework-version, maintain-project-structure
- Affected code: package.json, pnpm-lock.yaml, next.config.ts, eslint.config.mjs, middleware.ts, src/proxy.ts, src/app/**
