## ADDED Requirements
### Requirement: App Router structure
The project SHALL keep the App Router rooted at `src/app`, with routes defined by `page.tsx` or `route.ts` and a root `layout.tsx`.

#### Scenario: Route inspection
- **WHEN** the routing tree is reviewed
- **THEN** all routes live under `src/app` with `page.tsx`/`route.ts`, and `src/app/layout.tsx` exists

### Requirement: Proxy entry point
The project SHALL use a single Next.js 16-compliant request interception entry point using `proxy.ts` with a named export `proxy` and a matcher configuration.

#### Scenario: Request interception
- **WHEN** the request interception file is inspected
- **THEN** it is `proxy.ts` with a `proxy` export and a single matcher configuration
