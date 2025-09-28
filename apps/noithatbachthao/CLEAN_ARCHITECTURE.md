# 🧹 Clean Architecture - Nội Thất Bách Thảo

## 📁 **Cleaned Project Structure**

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── dashboard/                # Admin dashboard
│   ├── category/                 # Category pages
│   ├── product/                  # Product pages
│   └── *.tsx                     # Root pages
│
├── components/                   # Reusable UI components
│   ├── layout/                   # Layout components
│   ├── product-form/             # Product form components
│   ├── category-form/            # Category form components
│   ├── featured-products-carousel.tsx
│   ├── product-carousel.tsx
│   ├── error-boundary.tsx
│   └── *.tsx                     # Other components
│
├── containers/                   # Page-specific containers
│   ├── home-page/               # Home page sections
│   ├── category-page/           # Category page logic
│   ├── product-page/            # Product page logic
│   └── login-page/              # Login page logic
│
├── hooks/                       # Custom React hooks
│   ├── useApi.ts               # Generic API hook
│   ├── useFeaturedProducts.ts  # Feature-specific hooks
│   └── *.ts                    # Other hooks
│
├── services/                    # API services
│   ├── product/                # Product-related services
│   ├── category/               # Category-related services
│   ├── media/                  # Media upload services
│   ├── user/                   # User services
│   └── index.ts                # Centralized exports
│
├── utils/                       # Utility functions
│   ├── transform-*.ts          # Data transformation
│   ├── format-*.ts             # Formatting functions
│   ├── validate-*.ts           # Validation functions
│   └── index.ts                # Centralized exports
│
├── constants/                   # Application constants
│   ├── app-config.ts           # App configuration
│   ├── messages.ts             # UI messages
│   └── featured-products.ts    # Feature-specific config
│
├── types/                       # TypeScript definitions
│   ├── Product.d.ts            # Global types
│   ├── Category.d.ts
│   └── *.d.ts
│
└── lib/                         # External library configurations
    ├── supabase/               # Supabase config
    ├── cloudinary.ts           # Media storage
    └── *.ts
```

## 🚀 **Key Improvements**

### **1. Centralized Exports**
```typescript
// ✅ Before: Multiple imports
import { formatPrice } from '@/utils/format-price'
import { getTagColor } from '@/utils/get-tag-color'
import { slugify } from '@/utils/slugify'

// ✅ After: Single import
import { formatPrice, getTagColor, slugify } from '@/utils'
```

### **2. Configuration Management**
```typescript
// constants/app-config.ts
export const API_CONFIG = {
  PAGINATION: { DEFAULT_PAGE_SIZE: 10 },
  CACHE: { REVALIDATE_TIME: 60 },
} as const

// constants/messages.ts
export const UI_MESSAGES = {
  LOADING: 'Đang tải...',
  ERROR: 'Có lỗi xảy ra',
} as const
```

### **3. Generic Hooks Pattern**
```typescript
// hooks/useApi.ts - Reusable API logic
export function useApi<T>(apiCall: () => Promise<T>) {
  // Generic implementation
}

// Usage in specific hooks
export function useFeaturedProducts(limit: number) {
  return useApi(() => fetchFeaturedProducts(limit))
}
```

### **4. Error Boundaries**
```typescript
// components/error-boundary.tsx
export class ErrorBoundary extends Component {
  // Centralized error handling
}
```

## 📊 **Performance Metrics**

| Metric | Before | After | Improvement |
|--------|---------|-------|-------------|
| **Bundle Size** | Larger | Smaller | Tree-shaking |
| **Import Statements** | ~50% more | Consolidated | Cleaner code |
| **Code Duplication** | High | Low | DRY principle |
| **Maintainability** | Hard | Easy | Clear structure |

## 🔧 **Best Practices Implemented**

### **1. SOLID Principles**
- ✅ **Single Responsibility**: Each component has one purpose
- ✅ **Open/Closed**: Easy to extend without modification
- ✅ **Interface Segregation**: Clean, focused interfaces
- ✅ **Dependency Inversion**: Depends on abstractions

### **2. Clean Code Principles**
- ✅ **DRY (Don't Repeat Yourself)**: Centralized logic
- ✅ **KISS (Keep It Simple, Stupid)**: Simple, readable code
- ✅ **YAGNI (You Aren't Gonna Need It)**: No over-engineering

### **3. File Organization**
```
feature/
├── components/     # UI components
├── hooks/         # Data logic
├── services/      # API calls
├── types/         # TypeScript definitions
└── constants/     # Configuration
```

## 🚦 **Usage Examples**

### **Using Centralized Utils**
```typescript
import { formatPrice, getTagColor, slugify } from '@/utils'

const price = formatPrice('50000')
const color = getTagColor('Mới')
const slug = slugify('Kệ Tivi Gỗ')
```

### **Using Generic API Hook**
```typescript
import { useApi } from '@/hooks/useApi'
import { fetchProducts } from '@/services'

const ProductsList = () => {
  const { data, loading, error } = useApi(() => fetchProducts())
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{/* Render products */}</div>
}
```

### **Using Constants**
```typescript
import { UI_MESSAGES, ROUTES } from '@/constants'

const ErrorMessage = () => (
  <div>{UI_MESSAGES.ERROR}</div>
)

const navigation = [
  { label: 'Trang chủ', href: ROUTES.HOME },
  { label: 'Sản phẩm', href: ROUTES.PRODUCTS },
]
```

## 🎯 **Migration Benefits**

1. **Faster Development**: Less boilerplate code
2. **Better Testing**: Isolated, testable units
3. **Easier Maintenance**: Clear responsibility boundaries
4. **Better Performance**: Tree-shaking, code splitting
5. **Type Safety**: Centralized TypeScript definitions
6. **Consistent UX**: Standardized error handling & messages

## 🔄 **Next Steps**

1. **Add Unit Tests**: Test utilities and hooks
2. **Add Integration Tests**: Test component interactions
3. **Performance Monitoring**: Track bundle size and loading times
4. **Documentation**: Add JSDoc comments to public APIs
5. **Code Quality**: Set up pre-commit hooks with ESLint/Prettier

---

**Status**: ✅ **Clean Architecture Implemented Successfully**
