## 1. Implementation
- [x] 1.1 Add chatbot services (AI parsing, product search, session handling) in `src/services/chatbot/` using existing Supabase + Google AI utilities.
- [x] 1.2 Add `/api/chatbot/webhook` route with GET verification and POST message handling wired to chatbot services.
- [x] 1.3 Update `GET /api/products/search` to accept `type=chatbot-search` and route to chatbot search logic while preserving existing search behavior for other types.
- [x] 1.4 Remove legacy `chatbot-supabase/` folder and update any references/docs if needed.
- [x] 1.5 Manual validation: hit `/api/chatbot/webhook` verification flow and confirm `/api/products/search?type=chatbot-search&query=...` returns expected results.
