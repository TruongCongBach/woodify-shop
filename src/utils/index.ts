// Core utilities - most commonly used
export { formatPrice } from './format-price'
export { getTagColor } from './get-tag-color'
export { getPaginationRange } from './get-pagination-range'
export { getImagesFromMedia } from './get-images-from-media'
export { slugify } from './slugify'

// Form validation & transformation
export { transformProductToFormData } from './transform-product-to-form-data'
export { transformProductToDbFormat } from './transform-product-to-db-format'
export { transformCategoryToFormData } from './transform-category-to-form-data'
export { transformCategoryToDbFormat } from './transform-category-to-db-format'
export { validateMediaFiles } from './validate-media-files'

// Business logic helpers
export { checkProductUrlExists } from './check-product-url-exists'
export { buildFiltersFromAttributes } from './build-filters-from-attributes'
export { generateRandomReviews } from './generate-random-reviews'
export { getProductFAQs } from './get-product-faqs'
export { getAvailability } from './get-availability'

// Custom errors
export { ProductUrlExistsError } from './ProductUrlExistsError'

// AI utilities
export { createProductDescriptionPrompt, createCustomPrompt } from './ai-prompt-builder'
