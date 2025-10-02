# Woodify Shop Monorepo - AI Coding Guide

## Project Architecture

**Monorepo Structure**: Two Next.js 15 apps sharing a design system via pnpm workspaces:
- `apps/noithatbachthao` - Vi## Do / Don't

- ✅ Use centralized exports, constants, generic hooks, skeletons, dynamic imports, ErrorBoundary.  
- ✅ Keep to Tailwind scales and Shadcn patterns.
- ✅ **Use official SDKs** - prefer `@google/generative-ai` over manual fetch calls
- ✅ **Singleton services** - reuse expensive instances (AI models, DB connections)
- ✅ **Direct imports** - `import from '@/services/specific/file'` when needed in client
- ✅ **Environment-driven config** - make all external service params configurable
- ✅ **Structured prompt building** - use builder functions, not hardcoded strings
- ❌ Don't deep-import internals or hardcode values.  
- ❌ Don't bypass container structure.  
- ❌ Don't inline arbitrary styles.  
- ❌ Don't SSR client-only widgets.
- ❌ **Don't over-abstract** - simple direct imports often work better than complex client/server wrappers
- ❌ **Don't use barrel exports** from `@/services` in client components - pulls in server dependencies
- ❌ **Don't recreate instances** - use singletons for AI models, DB clients, etc.
- ❌ **Don't hardcode external service configs** - centralize in `config/index.ts` with env vars furniture e-commerce (Supabase + auth)
- `apps/woodify-khanhtrang` - Product showcase (3D models via Three.js)
- `packages/ui` - Shared Shadcn/UI components with Tailwind v4
- `packages/types`, `packages/utils`, `packages/services` - Shared libraries

**Key Architecture Patterns**:
- **Container-Component separation**: `containers/` orchestrate pages, `components/` are reusable UI
- **Clean data flow**: Page → Container → Component → Hook → Service → API
- **Type transformation**: Database types (`ProductDataBase`) → UI types (`Product`) via transformers
- **Centralized exports**: Import from `@/utils`, `@/services`, `@/constants` - never deep imports

## Critical File Locations

```
apps/noithatbachthao/src/
├── app/                    # Next.js App Router
├── containers/             # Page orchestration (home-page/, product-page/)
├── components/             # Reusable UI + layout (page-header.tsx, product-card.tsx)
├── hooks/                  # Data fetching (useFeaturedProducts.ts)
├── services/               # API calls (product/fetch-featured-products.ts)
├── lib/                    # External integrations (supabase/, cloudinary.ts)
├── config/index.ts         # Environment config centralization
├── constants/              # Feature configs (featured-products.ts)
├── types/                  # Global types (Product.d.ts, Category.d.ts)
└── utils/                  # Transform functions (transform-product-to-form-data.ts)
```

## Development Workflows

**Commands** (run from root):
```bash
pnpm dev                          # Start all apps in dev mode
pnpm install                      # Install all workspace dependencies
pnpm add <pkg> --filter <app>    # Add dependency to specific app
ANALYZE=true pnpm build          # Bundle analysis for optimization
```

**Monorepo Package Management**:
- Install shared deps in `packages/ui`: `pnpm add lucide-react --filter @woodify/ui`
- App-specific deps: `pnpm add @supabase/supabase-js --filter noithatbachthao`
- Global deps in root only for tooling

**Database Integration**:
- Supabase client in `lib/supabase/index.ts` with config from `config/index.ts`
- Transform DB types to UI types: `ProductDataBase` → `Product` via `transformProductToFormData`
- Use environment variables pattern: `config.database.url` not `process.env.NEXT_PUBLIC_SUPABASE_URL`

## Coding Standards

- Follow clean architecture flow: `Page → Container → Component → Hook → Service → API`.
- Use **centralized exports** (`@/utils`, `@/services`, `@/constants`) — avoid deep imports.
- Prefer **generic hooks** (`useApi<T>`) for data fetching.
- Keep **type safety strict**; feature-scoped types in `/types`.
- Store config in `/constants`; never hardcode values.
- Wrap networked UI in **ErrorBoundary** with friendly messages.
- Use **dynamic imports with skeletons** for performance.
- Prefer functional React components and arrow functions.
- Vietnamese UI copy unless explicitly stated otherwise.

## Critical Architecture Lessons

**Client/Server Separation**:
- ❌ **Don't create unnecessary client/server abstractions**. Simple direct imports work fine.
- ✅ Import specific files: `import { generateProductDescription } from '@/services/ai/generate-product-description'`
- ❌ Avoid barrel exports from `@/services` in client components - they pull in server-side dependencies
- ✅ Server-side services (Cloudinary, DB) should only be imported in API routes, not client components

**SDK Integration Best Practices**:
- ✅ **Use official SDKs over manual fetch calls** (e.g., `@google/generative-ai` vs raw API calls)
- ✅ **Singleton pattern for expensive instances** - Don't recreate AI/DB clients on every request
- ✅ **Environment-driven configuration** - Make all SDK parameters configurable via env vars
- ✅ **Structured prompt building** - Don't hardcode prompts, use builder functions for reusability

**Service Layer Organization**:
```typescript
// ✅ Good: Structured service with singleton + config
class GoogleAIService {
  private static instance: GoogleAIService
  private model: GenerativeModel | null = null
  
  static getInstance() { /* singleton logic */ }
  getModel() { /* lazy initialization */ }
}

// ✅ Good: Prompt builder functions
export function createProductDescriptionPrompt(productInfo, config = DEFAULT_CONFIG) {
  // Structured template building
}

// ❌ Bad: Hardcoded prompts in service functions  
const prompt = `Create description for ${productName}...`
```

**Configuration Management**:
- ✅ **Centralize all external service configs** in `config/index.ts`
- ✅ **Use environment variables with sensible defaults**
- ✅ **Group related configs** (model, temperature, tokens) together
- ❌ Don't scatter API keys and configs across multiple files

**Error Handling & Validation**:
- ✅ **Parse and validate API responses gracefully** with fallback strategies
- ✅ **Separate business logic errors** from technical errors
- ✅ **Use TypeScript exhaustively** - prefer enums over string literals
- ❌ Don't assume external API responses are always valid JSON

## Architecture Decision Records (ADRs)

**ADR-001: AI Service Architecture**
- **Problem**: Initial implementation created new GoogleGenerativeAI instance on every request
- **Solution**: Implemented singleton pattern with lazy initialization in `lib/google-ai.ts`
- **Reasoning**: Expensive instance creation should be avoided; reuse connections
- **Result**: Better performance, cleaner resource management

**ADR-002: Configuration Centralization**
- **Problem**: AI model parameters scattered across codebase, hardcoded values
- **Solution**: Centralized all external service configs in `config/index.ts` with env variable support
- **Reasoning**: Makes the app configurable without code changes, easier environment management
- **Result**: `GOOGLE_AI_MODEL`, `GOOGLE_AI_TEMPERATURE`, etc. can be tuned via env vars

**ADR-003: Prompt Engineering Structure**
- **Problem**: Hardcoded prompt strings in service functions, not reusable
- **Solution**: Created `ai-prompt-builder.ts` with structured template functions
- **Reasoning**: Prompts are business logic that should be testable and configurable
- **Result**: Reusable `createProductDescriptionPrompt()` with customizable parameters

**ADR-004: Client/Server Import Strategy**
- **Problem**: Barrel exports (`@/services`) in client components pulled in server-side dependencies (Cloudinary, etc.)
- **Solution**: Use direct imports `@/services/ai/generate-product-description` instead of barrel exports
- **Reasoning**: Next.js tree-shaking works better with specific imports; avoids "Module not found: fs" errors
- **Result**: Clean client/server separation without complex wrapper abstractions

**Key Learnings**:
- **Simple is better**: Direct imports often work better than complex client/server abstractions
- **Configuration over code**: Make external services configurable via environment variables  
- **Reusable patterns**: Extract business logic (prompts, configs) into structured, testable functions
- **Resource efficiency**: Use singletons for expensive instances (AI models, DB connections)

## UI Guidelines

- **Colors**:  
  - Primary `#343434` on `#FAFAFA`, secondary `#F8F8F8`.  
  - Brand amber `#D97706/#B45309`.  
  - Price red `#DC2626`.  
  - Neutral grays (100/600/700/800/900).  
- **Typography**: Tailwind scale (`text-xs` → `text-4xl`), weights `medium/semibold/bold`.
- **Spacing**: Use consistent Tailwind spacing (`p-3 sm:p-4`, `gap-4`).
- **Radius**: `rounded` default, `rounded-full` for pills.
- **Responsive**: Mobile-first with `sm:` and `md:`.
- **Component Patterns**:  
  - Cards with image hover zoom + content block.  
  - Section headers with amber badge + strong title + muted description.  
  - Buttons: primary (amber), secondary (gray inversion).  
  - Footer: dark grid layout.  
- **Images**: Use Next.js `<Image>` with responsive sizes and Cloudinary/WebP/AVIF optimization.
- **Tags**: Colored badges (`Mới` → green, `Hot` → red, `Sale` → orange, default → blue).
- **Price Display**: Red current price + gray line-through for original.

## Feature Implementation Pattern

**Example: AI Product Description Generator**
```
├── lib/google-ai.ts                          # Singleton AI service instance
├── config/index.ts                           # Centralized AI configuration  
├── utils/ai-prompt-builder.ts                # Structured prompt generation
├── services/ai/generate-product-description-server.ts # Server-side logic
├── services/ai/generate-product-description.ts        # Client-side API caller
├── app/api/ai/generate-description/route.ts           # API endpoint
├── components/product-form/AIDescriptionGenerator.tsx # UI component
└── components/product-form/index.tsx                  # Integration
```

**Critical Patterns**:
- **Singleton services**: Expensive instances (AI, DB) created once and reused
- **Direct imports**: `import { generateProductDescription } from '@/services/ai/generate-product-description'`
- **Environment config**: All external service params in `config/index.ts` with env vars
- **Structured business logic**: Prompts, configs extracted to testable functions
- **API-first client/server**: Client components call API routes, not server functions directly
- Use `dynamic()` imports with `ssr: false` for client-only components
- Wrap data-fetching components in `ErrorBoundary`
- Constants in `/constants`, never hardcode values
- Transform DB types → UI types in services layer

**Integration Example**:
```tsx
// containers/home-page/section-products/index.tsx
const FeaturedProductsCarousel = dynamic(
  () => import('@/components/featured-products-carousel'),
  { loading: () => <ProductCarouselSkeleton />, ssr: false }
)
```

## Performance & Bundle Optimization

**Required Patterns**:
- Dynamic imports: `dynamic(() => import('./component'), { ssr: false })`
- Bundle analysis: `ANALYZE=true pnpm build` (configured in next.config.ts)
- Cloudinary + Next.js Image optimization with WebP/AVIF formats
- Individual Lucide icon imports: `import { ArrowRight } from 'lucide-react'`
- Package transpilation in next.config.ts: `transpilePackages: ["@woodify/ui"]`

**Image Configuration** (already configured):
```typescript
// next.config.ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

## Commands

```bash
pnpm dev                          # Start all apps
pnpm install                      # Install dependencies
pnpm add <pkg> --filter <app>    # Add app-specific package
ANALYZE=true pnpm build          # Bundle analysis
```

## Do / Don’t

- ✅ Use centralized exports, constants, generic hooks, skeletons, dynamic imports, ErrorBoundary.  
- ✅ Keep to Tailwind scales and Shadcn patterns.  
- ❌ Don’t deep-import internals or hardcode values.  
- ❌ Don’t bypass container structure.  
- ❌ Don’t inline arbitrary styles.  
- ❌ Don’t SSR client-only widgets.
