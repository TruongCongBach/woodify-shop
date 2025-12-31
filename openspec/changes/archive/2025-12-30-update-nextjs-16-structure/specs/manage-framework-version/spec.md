## ADDED Requirements
### Requirement: Use Next.js 16 latest stable
The project SHALL depend on Next.js 16 (latest stable at time of upgrade) and compatible React/React DOM and TypeScript type packages.

#### Scenario: Dependency audit
- **WHEN** the package manifest is inspected after the upgrade
- **THEN** `next` is 16.x and `react`/`react-dom` plus `@types/react`/`@types/react-dom` meet Next.js 16 minimums

### Requirement: Apply the Next.js 16 upgrade workflow
The project SHALL apply the Next.js 16 upgrade workflow (CLI or codemod) to update framework configuration and scripts.

#### Scenario: Upgrade execution
- **WHEN** the upgrade workflow is run for Next.js 16
- **THEN** required codemods update configuration and scripts to match Next.js 16 conventions
