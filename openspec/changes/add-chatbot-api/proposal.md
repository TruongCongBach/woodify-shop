# Change: Add Next.js Chatbot API and Search Mode

## Why
The chatbot server lives in a separate `chatbot-supabase` folder and cannot be used directly inside the Next.js app. We need to migrate the chatbot webhook and search flow into Next.js and keep the legacy search behavior intact.

## What Changes
- Add a Next.js webhook endpoint at `/api/chatbot/webhook` for Facebook verification and message handling.
- Extend `GET /api/products/search` to accept `type=chatbot-search` and run chatbot-specific search logic.
- Keep existing `GET /api/products/search` behavior unchanged for other types.
- Migrate chatbot services (AI parsing, product search, session handling) into the Next.js codebase.
- Remove the legacy `chatbot-supabase/` folder after migration.

## Impact
- Affected specs: `chatbot-api` (new)
- Affected code: `src/app/api/chatbot/webhook/route.ts`, `src/app/api/products/search/route.ts`, new `src/services/chatbot/*`, supporting config/env docs
- Removed code: `chatbot-supabase/`
