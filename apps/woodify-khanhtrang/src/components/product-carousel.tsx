'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@woodify/ui/components/carousel'
import { ProductCard } from '@/components/product-card'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

type Props = {
	title: string
	products: Product[]
	viewAllHref?: string
	tags?: string[]
}

export const ProductCarousel = ({ title, products, viewAllHref, tags }: Props) => {
	return (
		<section className="space-y-4 mb-0">
			{/* Title + Xem tất cả */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
				{viewAllHref && (
					<a href={viewAllHref} className="text-sm text-primary hover:underline">
						Xem tất cả
					</a>
				)}
			</div>

			{/* Carousel */}
			<div className="relative">
				<Carousel
					opts={{
						loop: true,
						align: 'start',
					}}
					plugins={[
						Autoplay({ delay: 3000 }),
					]}>
					<CarouselContent>
						{products.map((product) => (
							<CarouselItem
								key={product.id}
								className="basis-[80%] sm:basis-[45%] md:basis-[30%] lg:basis-[24%]"
							>
								<Link href={product.url}>
									<ProductCard product={product} tags={tags}/>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	)
}
