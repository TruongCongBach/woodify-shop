'use client'

import dynamic from 'next/dynamic'
import { ProductCarouselSkeleton } from '@/components/product-carousel-skeleton'
import { ErrorBoundary } from '@/components/error-boundary'

// Dynamic import for code splitting and performance optimization
const FeaturedProductsCarousel = dynamic(
	() => import('@/components/featured-products-carousel'),
	{
		loading: () => <ProductCarouselSkeleton />,
		ssr: false,
	}
)

const SectionProducts = () => {
	return (
		<section className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<ErrorBoundary>
					<FeaturedProductsCarousel />
				</ErrorBoundary>
			</div>
		</section>
	)
}

export default SectionProducts
