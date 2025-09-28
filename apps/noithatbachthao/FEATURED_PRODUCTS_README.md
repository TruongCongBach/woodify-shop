# Featured Products - Clean Architecture

## 📁 File Structure
```
src/
├── components/
│   ├── featured-products-carousel.tsx  # Main carousel component
│   ├── product-carousel-skeleton.tsx   # Loading skeleton
│   └── error-boundary.tsx              # Error handling
├── containers/home-page/
│   └── section-products/
│       └── index.tsx                   # Lazy-loaded section wrapper
├── hooks/
│   └── useFeaturedProducts.ts          # Data fetching hook
├── services/product/
│   └── fetch-featured-products.ts      # API service
└── constants/
    └── featured-products.ts            # Configuration constants
```

## 🚀 Key Features

### 1. **Code Splitting & Lazy Loading**
- Uses Next.js `dynamic()` for automatic code splitting
- Component only loads when needed
- Reduces initial bundle size

### 2. **Clean Data Flow**
```
SectionProducts → FeaturedProductsCarousel → useFeaturedProducts → fetchFeaturedProducts
```

### 3. **Error Handling**
- ErrorBoundary for React errors
- Graceful error states in components
- User-friendly error messages

### 4. **Performance Optimizations**
- ✅ Server-side rendering disabled for client-only features
- ✅ Skeleton loading for better UX
- ✅ Dynamic imports for code splitting
- ✅ Proper TypeScript types

### 5. **Maintainability**
- ✅ Centralized constants
- ✅ Reusable error boundary
- ✅ Clean separation of concerns
- ✅ Consistent naming conventions

## 🎯 Usage
```tsx
// Simply import and use
<SectionProducts />
```

## 🔧 Configuration
Edit `src/constants/featured-products.ts` to modify:
- Number of products to display
- Section title
- View all link
- Error messages
