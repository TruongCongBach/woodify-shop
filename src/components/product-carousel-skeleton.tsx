import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/ui/shadcn-ui/carousel'

export const ProductCarouselSkeleton = () => {
	return (
		<section className="space-y-4 mb-0">
			{/* Title skeleton */}
			<div className="flex items-center justify-between">
				<div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
				<div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
			</div>

			{/* Carousel skeleton */}
			<div className="relative">
				<Carousel
					opts={{
						loop: true,
						align: 'start',
					}}>
					<CarouselContent>
						{Array.from({ length: 6 }).map((_, index) => (
							<CarouselItem
								key={index}
								className="basis-[80%] sm:basis-[45%] md:basis-[30%] lg:basis-[24%]"
							>
								<div className="flex flex-col bg-white rounded shadow overflow-hidden h-full">
									{/* Image skeleton with shimmer effect */}
									<div className="relative w-full flex-shrink-0 h-48 sm:h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]"></div>
									
									{/* Content skeleton */}
									<div className="flex-grow p-3 sm:p-4 flex flex-col justify-between">
										<div className="space-y-3">
											<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse bg-[length:200%_100%]"></div>
											<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse bg-[length:200%_100%]"></div>
										</div>
										<div className="mt-4 flex items-baseline gap-2">
											<div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-pulse bg-[length:200%_100%]"></div>
											<div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-pulse bg-[length:200%_100%]"></div>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	)
}
