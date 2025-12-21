# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Woodify Shop** is a single Next.js 15 app for Vietnamese furniture e-commerce. It uses App Router, Tailwind CSS v4, and local UI utilities in `src/ui`.

## Development Commands

Run from repository root:

```bash
# Development
pnpm install                      # Install all workspace dependencies
pnpm dev                          # Start all apps in dev mode (with Turbopack)

# Building
pnpm build                        # Build all apps (with Turbopack)
ANALYZE=true pnpm build          # Bundle analysis for optimization

# Package management
pnpm add <pkg>                    # Add dependency
pnpm add -D <pkg>                 # Add dev dependency
```

## Architecture Patterns

### Clean Architecture Flow

Follow this strict flow for data and logic:
```
Page → Container → Component → Hook → Service → API Route/External Service
```

- **Pages** (`app/*/page.tsx`): Routing, metadata, server-side data fetching
- **Containers** (`containers/*`): Orchestrate page sections, business logic
- **Components** (`components/*`): Reusable presentational UI
- **Hooks** (`hooks/*`): Data fetching with SWR, state management
- **Services** (`services/*`): API calls, external service integration
- **API Routes** (`app/api/*`): Backend endpoints for client-side calls

### Container-Component Separation

**Containers**: Page orchestration with sections
```typescript
// containers/home-page/index.tsx
export default function HomePageContainer() {
  return (
    <>
      <SectionHeroGallery />
      <SectionProducts />
      <SectionFeatures />
    </>
  )
}
```

**Components**: Reusable, presentational UI
```typescript
// components/product-card.tsx
export function ProductCard({ product }: { product: Product }) {
  // Pure presentational logic
}
```

### Type Transformation Pattern

Transform database types to UI types in services layer:
```
ProductDataBase (from Supabase) → Product (for UI)
CategoryDataBase (from Supabase) → Category (for UI)
```

Use transformer utilities: `transform-product-to-form-data.ts`, `transform-category-to-db-format.ts`

### Centralized Exports

Import from centralized locations, never deep import:

**Good:**
```typescript
import { formatPrice } from '@/utils'
import { fetchFeaturedProducts } from '@/services/product'
import { FEATURED_PRODUCTS_CONFIG } from '@/constants'
```

**Bad:**
```typescript
import { formatPrice } from '@/utils/format-price'
import { fetchFeaturedProducts } from '@/services/product/fetch-featured-products'
```

Use `@/utils/index.ts`, `@/services/*/index.ts`, `@/constants/index.ts` as barrel exports.

### Client/Server Import Strategy

**Critical**: Avoid barrel exports from `@/services` in client components - they pull in server-side dependencies.

**Good:**
```typescript
// In client component
import { generateProductDescription } from '@/services/ai/generate-product-description'
```

**Bad:**
```typescript
// In client component - pulls in Cloudinary, etc.
import { generateProductDescription } from '@/services'
```

Server-side services (Cloudinary, direct Supabase admin calls) should only be imported in API routes, never in client components.

## Configuration Management

All external service configuration is centralized in `src/config/index.ts`:

```typescript
const config = {
  database: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  cloudinaryCloud: { /* ... */ },
  googleAuth: { /* ... */ },
  googleAI: {
    apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
    model: process.env.GOOGLE_AI_MODEL ?? 'gemini-2.5-flash',
    generationConfig: { /* temperature, topK, etc. */ }
  },
  // ...
}
```

**Always use `config.*` instead of `process.env.*` directly in code.**

## Key Integrations

### Supabase (Database + Auth)
- Client in `lib/supabase/client.ts` (browser)
- Server in `lib/supabase/server.ts` (server components/API routes)
- Middleware in `lib/supabase/middleware.ts` (auth handling)
- Configuration from `config.database.*`

### NextAuth
- Options in `lib/next-auth-options.ts`
- Supports Google OAuth, credentials auth
- Configuration from `config.nextAuth.*` and `config.googleAuth.*`

### Google AI (Gemini)
- **Singleton pattern** in `lib/google-ai.ts` - reuses instance
- Use `getGoogleAI()` to get configured instance
- Configuration from `config.googleAI.*`
- Prompts built with `utils/ai-prompt-builder.ts`
- Server-side only (API routes)

### Cloudinary (Image Management)
- Client in `lib/cloudinary.ts`
- Upload API route: `app/api/upload-image/route.ts`
- Configuration from `config.cloudinaryCloud.*`
- Server-side only (API routes)

## Service Layer Best Practices

### Singleton Pattern for Expensive Instances

Don't recreate AI/DB clients on every request:

```typescript
// lib/google-ai.ts
let genAI: GoogleGenAI | null = null

export function getGoogleAI(): GoogleGenAI {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: config.googleAI.apiKey })
  }
  return genAI
}
```

### Structured Prompt Building

Don't hardcode prompts in service functions:

```typescript
// utils/ai-prompt-builder.ts
export function createProductDescriptionPrompt(productInfo, config = DEFAULT_CONFIG) {
  return `
    Tạo mô tả sản phẩm ${productInfo.name}
    Chất liệu: ${productInfo.material}
    // ... structured template
  `
}

// services/ai/generate-product-description-server.ts
const prompt = createProductDescriptionPrompt(productInfo)
const response = await generateContent(prompt)
```

### Environment-Driven Configuration

Make all external service parameters configurable via environment variables with sensible defaults (see `config/index.ts`).

## Performance & Optimization

### Dynamic Imports with Skeletons

For client-only components or heavy components:

```typescript
import dynamic from 'next/dynamic'

const FeaturedProductsCarousel = dynamic(
  () => import('@/components/featured-products-carousel'),
  {
    loading: () => <ProductCarouselSkeleton />,
    ssr: false
  }
)
```

### Image Optimization

Already configured in `next.config.ts`:
- Cloudinary remote patterns
- WebP/AVIF formats
- Device sizes: `[640, 750, 828, 1080, 1200, 1920]`
- Minimum cache TTL: 3600s

Always use Next.js `<Image>` component:
```typescript
import Image from 'next/image'

<Image
  src={product.imageUrl}
  alt={product.name}
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

### Bundle Analysis

Run `ANALYZE=true pnpm build` to analyze bundle size with `@next/bundle-analyzer`.

### Icon Optimization

Already configured: `optimizePackageImports: ['lucide-react']` in `next.config.ts`. Import individual icons:

```typescript
import { ArrowRight, ShoppingCart } from 'lucide-react'
```

## UI Guidelines

### Design Tokens

**Colors**:
- Primary: `#343434` on `#FAFAFA` background
- Secondary: `#F8F8F8`
- Brand amber: `#D97706` / `#B45309`
- Price red: `#DC2626`
- Neutral grays: `100/600/700/800/900`

**Typography**: Use Tailwind scale (`text-xs` to `text-4xl`), weights `medium/semibold/bold`

**Spacing**: Consistent Tailwind spacing (`p-3 sm:p-4`, `gap-4`)

**Radius**: `rounded` (default), `rounded-full` (pills)

**Responsive**: Mobile-first with `sm:` and `md:` breakpoints

### Component Patterns

**Product Cards**: Image with hover zoom + content block
**Section Headers**: Amber badge + bold title + muted description
**Buttons**: Primary (amber), Secondary (gray inversion)
**Footer**: Dark grid layout
**Tags**: Color-coded badges (`Mới` → green, `Hot` → red, `Sale` → orange, default → blue)
**Price Display**: Red current price + gray line-through for original

### Shared UI Package

`@/ui/*` resolves to `src/ui/*`.

Import from `@/ui`:
```typescript
import { Button } from '@/ui/shadcn-ui/button'
import { Card } from '@/ui/shadcn-ui/card'
import { cn } from '@/ui/lib/utils'
```

## Coding Standards

- **Vietnamese UI copy** unless explicitly stated otherwise
- **Functional React components** with arrow functions
- **TypeScript strict mode** - prefer enums over string literals
- **ErrorBoundary** for networked UI with user-friendly messages
- **SWR** for data fetching in hooks (see `hooks/useFeaturedProducts.ts`)
- Never hardcode values - use `constants/` directory
- Feature-scoped types in `types/` directory
- Prefer `async/await` over promises

## Coding Principles & Quality Standards

All code must adhere to these principles to ensure maintainability, scalability, and code quality:

### 1. SOLID Principles
Apply all five SOLID principles consistently:
- **Single Responsibility Principle (SRP)**: Each function/component has one clear purpose
- **Open/Closed Principle (OCP)**: Open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types
- **Interface Segregation Principle (ISP)**: Many specific interfaces over one general interface
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions

### 2. Clean Code
- **Clear naming**: Use descriptive, self-documenting names for variables, functions, and types
- **No duplication**: DRY (Don't Repeat Yourself) - extract common logic
- **Small functions**: Functions should do one thing well, typically < 20 lines
- **Easy to read**: Code should read like well-written prose

Example:
```typescript
// ❌ Bad: unclear, duplicated logic
function proc(d: any) {
  if (d.t === 1) return d.p * 0.9
  if (d.t === 2) return d.p * 0.8
  return d.p
}

// ✅ Good: clear, maintainable
function calculateDiscountedPrice(product: Product): number {
  const discountRate = getDiscountRate(product.type)
  return product.price * (1 - discountRate)
}

function getDiscountRate(productType: ProductType): number {
  const DISCOUNT_RATES = {
    [ProductType.PREMIUM]: 0.1,
    [ProductType.CLEARANCE]: 0.2,
    [ProductType.STANDARD]: 0,
  }
  return DISCOUNT_RATES[productType]
}
```

### 3. Performance Optimization
- **Reduce complexity**: Aim for O(n) or better time complexity
- **Minimize allocations**: Avoid unnecessary object/array creation in loops
- **Prevent unnecessary loops**: Use appropriate data structures (Map/Set vs Array)
- **Memoize expensive calculations**: Use `useMemo`/`useCallback` appropriately

```typescript
// ❌ Bad: O(n²) complexity
function findDuplicates(products: Product[]) {
  return products.filter((p, i) =>
    products.findIndex(p2 => p2.id === p.id) !== i
  )
}

// ✅ Good: O(n) complexity with Set
function findDuplicates(products: Product[]) {
  const seen = new Set<string>()
  return products.filter(p => {
    if (seen.has(p.id)) return true
    seen.add(p.id)
    return false
  })
}
```

### 4. Scalability
- **Modular architecture**: Follow the established folder structure strictly
- **Easy to extend**: New features shouldn't require changing existing code (OCP)
- **Separation of concerns**: Logic, config, and presentation are separated
- **Feature folders**: Group related files by feature, not by type

```typescript
// ✅ Good: Scalable structure
services/product/
  ├── fetch-products.ts
  ├── fetch-product-by-id.ts
  ├── create-product.ts
  └── index.ts              # Barrel export
```

### 5. Testability
- **Pure functions**: Minimize side effects
- **Dependency injection**: Pass dependencies as parameters
- **Small, focused units**: Each function tests one thing
- **Mock-friendly**: Easy to mock external dependencies

```typescript
// ❌ Bad: Hard to test (tightly coupled)
function processOrder() {
  const db = createSupabaseClient()
  const order = db.getOrder(123)
  sendEmail(order.email, 'Order confirmed')
}

// ✅ Good: Easy to test (DI)
async function processOrder(
  orderId: string,
  orderRepository: OrderRepository,
  emailService: EmailService
) {
  const order = await orderRepository.getById(orderId)
  await emailService.send(order.email, 'Order confirmed')
  return order
}
```

### 6. Style Consistency
- **Consistent APIs**: Similar functions have similar signatures
- **Clear folder structure**: Follow the established architecture patterns
- **Standard formatting**: Use Prettier/ESLint rules
- **TypeScript types**: Always provide explicit types for function parameters and returns

```typescript
// ✅ Good: Consistent API pattern
async function fetchProducts(params: FetchParams): Promise<Product[]>
async function fetchCategories(params: FetchParams): Promise<Category[]>
async function fetchReviews(params: FetchParams): Promise<Review[]>
```

### 7. Output Standards
When implementing code:
- **Code-first**: Output working code, not pseudo-code or TODOs
- **Brief descriptions**: Add concise comments only where logic isn't obvious
- **No redundant info**: Don't output debugging logs, verbose comments, or unchanged code
- **Focus on changes**: Highlight what was added/modified, not the entire file

```typescript
// ✅ Good: Brief, relevant comment
// Calculate final price with tiered discount based on quantity
const finalPrice = calculateTieredDiscount(basePrice, quantity)

// ❌ Bad: Redundant comment
// This function adds two numbers together and returns the result
function add(a: number, b: number): number {
  return a + b // returns the sum of a and b
}
```

## Common Pitfalls to Avoid

❌ **Don't** use barrel exports from `@/services` in client components
❌ **Don't** recreate expensive instances (AI models, DB clients)
❌ **Don't** hardcode external service configs - use `config/index.ts`
❌ **Don't** bypass container structure
❌ **Don't** SSR client-only widgets (use `dynamic` with `ssr: false`)
❌ **Don't** inline arbitrary styles - stick to Tailwind
❌ **Don't** deep-import internals - use centralized exports

✅ **Do** use singleton pattern for services
✅ **Do** structure prompts in builder functions
✅ **Do** transform DB types to UI types in services
✅ **Do** use direct imports for specific service files
✅ **Do** wrap networked UI in ErrorBoundary
✅ **Do** use dynamic imports with skeletons
✅ **Do** keep configuration environment-driven

## Key Architectural Decisions

**ADR-001: Singleton AI Service**
- Problem: New GoogleGenAI instance on every request
- Solution: Module-scope singleton with lazy initialization
- Result: Better performance, cleaner resource management

**ADR-002: Configuration Centralization**
- Problem: Scattered configs, hardcoded values
- Solution: Centralized in `config/index.ts` with env vars
- Result: Easy environment management without code changes

**ADR-003: Structured Prompt Engineering**
- Problem: Hardcoded prompts in service functions
- Solution: `ai-prompt-builder.ts` with template functions
- Result: Testable, reusable, configurable prompts

**ADR-004: Direct Import Strategy**
- Problem: Barrel exports pulled server deps into client
- Solution: Direct imports from specific service files
- Result: Better tree-shaking, no "Module not found: fs" errors

## Feature Implementation Pattern

When adding new features:

1. **Configuration**: Add env vars to `config/index.ts`
2. **Types**: Define types in `types/` directory
3. **Services**: Create service in `services/` with specific file
4. **API Route**: Create endpoint in `app/api/` if needed
5. **Hook**: Create custom hook for data fetching
6. **Component**: Build presentational component
7. **Container**: Integrate into container with dynamic import + skeleton
8. **Constants**: Add feature configs to `constants/`

Example: AI Product Description Generator
```
├── lib/google-ai.ts                                      # Singleton
├── config/index.ts                                       # Config
├── utils/ai-prompt-builder.ts                            # Prompts
├── services/ai/generate-product-description-server.ts    # Server logic
├── services/ai/generate-product-description.ts           # Client API caller
├── app/api/ai/generate-description/route.ts              # API endpoint
├── components/product-form/AIDescriptionGenerator.tsx    # UI
└── containers/dashboard/product-form/index.tsx           # Integration
```

## Package Management

Use root-level `pnpm` commands for dependencies and keep UI helpers under `src/ui`.
