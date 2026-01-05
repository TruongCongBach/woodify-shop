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

### Foundations (Required)
- Readability > cleverness: ưu tiên code dễ hiểu hơn trick.
- Single responsibility: mỗi component/hook/module làm 1 việc rõ ràng.
- Predictable data flow: dữ liệu đi 1 chiều; hạn chế side-effect rải rác.
- Fail fast & safe: validate input, handle null/undefined, state lỗi rõ ràng.
- Consistency: tuân style, naming, cấu trúc folder, patterns đã chọn.

### Naming Conventions
- Components: PascalCase (UserCard).
- Hooks: `useSomething`.
- Functions/variables: camelCase.
- Constants: UPPER_SNAKE_CASE (chỉ cho hằng global).
- Files: `UserCard.tsx`, `useUser.ts`, `formatMoney.ts`.
- Boolean: `is/has/can/should` (isLoading, hasError).
- Handlers: `handleClick`; props nên dùng `onSubmit`/`onChange`.

### Component Rules (React)
- UI component chỉ làm UI; business logic chuyển sang hooks/services/state store.
- Props rõ nghĩa; tránh truyền object lớn nếu chỉ dùng 1–2 fields.
- Default values đặt ở destructuring.
- Tránh nested ternary sâu; map render phức tạp thì tách subcomponent.
- Không gọi API trong render; side-effect chỉ nằm trong useEffect/action.

### State Management & Side Effects
- Local state: UI state (open modal, selected tab...).
- Global state: cross-feature/session/user.
- Server state (fetch): ưu tiên SWR pattern (nếu dùng).
- Mỗi useEffect 1 purpose; dependencies đúng, không disable eslint bừa.

### TypeScript Rules
- Không dùng `any` (trừ trường hợp bất khả kháng và có comment lý do).
- Prefer `unknown` + type guard.
- Tạo type theo domain: User, Order, Money, Currency...
- API types tách riêng: UserDTO (from API) vs User (domain); mapping ở một chỗ.
- Strict null checks: handle undefined rõ ràng.

### API / Data Layer Rules
- API calls nằm trong `src/services` (hoặc domain module tương ứng nếu có).
- Route handlers nằm trong `src/app/api/*/route.ts`.
- Không gọi fetch/axios trực tiếp trong component; dùng service + hook.
- Error handling thống nhất; tránh throw raw error lên UI.

### Styling Rules
- Chọn 1 hệ (Tailwind/CSS Modules/...) và đồng bộ theo file hiện có.
- Component UI chung cần support state: loading/disabled/error (nếu relevant).
- Tránh hardcode magic numbers lặp lại; ưu tiên token/vars nếu có.

### Accessibility & SEO
- Heading theo thứ tự (h1 -> h2 -> h3...), không nhảy cấp.
- Ảnh phải có `alt` mô tả ý nghĩa; decorative dùng `alt=""`.
- Button/link phải có label rõ nghĩa; icon-only cần aria-label.
- Focus state rõ ràng cho thành phần tương tác.
- Meta title/description không trùng, có ý nghĩa theo trang.

### Logging, PII & Security
- Không log secret/PII (token, email, phone, address, key).
- Mask dữ liệu nhạy cảm nếu cần debug (vd: `***`).
- Không commit secrets; cấu hình qua env.
- Validate input trước khi gọi service; trả lỗi thân thiện cho UI.

### Data Fetching & Caching
- Tránh gọi fetch trực tiếp trong component; dùng service + hook.
- Chỉ định rõ caching/revalidate cho request quan trọng.
- Với dữ liệu phụ thuộc user/session: ưu tiên fetch server-side trong route handler hoặc client hook có auth.

### Performance & DX
- Không optimize sớm, nhưng tránh lỗi rõ ràng (key ổn định, tránh re-render nặng).
- Tách code theo route/feature nếu app lớn.

### Testing Strategy
- No automated test runner is configured.
- Manual QA plus `pnpm lint`/`pnpm build` are the primary validation steps.
- Unit tests (khi có) cho utils, mapping, validation.
- Component tests (khi có) cho UI logic quan trọng; test behavior, không test implementation details.

### Code Review Checklist (Agent)
- Naming rõ ràng, không viết tắt khó hiểu.
- Component/hook/module 1 responsibility.
- Không gọi API trong component render.
- Không có `any`, không disable lint vô cớ.
- Handle loading/error/empty state.
- Không duplicate logic (đã extract).
- Types đúng domain, mapping DTO rõ ràng.
- Dễ test, tách side-effect hợp lý.

### Agent Instructions (Optional)
- Follow existing `src/` structure (`containers/`, `components/`, `services/`, `hooks/`, `lib/`, `ui/`, `utils/`).
- Write TypeScript strict, no `any`.
- Keep components presentational; business logic in hooks/services.

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
