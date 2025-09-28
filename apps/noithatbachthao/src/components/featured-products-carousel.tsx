'use client'

import { ProductCarousel } from '@/components/product-carousel'
import { ProductCarouselSkeleton } from '@/components/product-carousel-skeleton'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { FEATURED_PRODUCTS_CONFIG, ERROR_MESSAGES } from '@/constants/featured-products'
import { UI_MESSAGES } from '@/constants/messages'

const FeaturedProductsCarousel = () => {
	const { products, loading, error } = useFeaturedProducts(FEATURED_PRODUCTS_CONFIG.LIMIT)

	if (loading) {
		return <ProductCarouselSkeleton />
	}

	if (error) {
		return (
			<div className="text-center py-8 text-gray-500">
				<p>{ERROR_MESSAGES.FAILED_TO_LOAD}</p>
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">
				<p>{ERROR_MESSAGES.NO_PRODUCTS}</p>
			</div>
		)
	}

	return (
		<ProductCarousel 
			title={FEATURED_PRODUCTS_CONFIG.SECTION_TITLE}
			products={products}
			viewAllHref={FEATURED_PRODUCTS_CONFIG.VIEW_ALL_HREF}
		/>
	)
}

export default FeaturedProductsCarousel
