'use client'

import * as React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem, CarouselNext, CarouselPrevious,
	// Không cần Prev/Next ở main, chỉ dùng trên thumbnail
} from '@woodify/ui/components/carousel'
import type { CarouselApi } from '@woodify/ui/components/carousel'

interface ProductGalleryProps {
	images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
	const [mainApi, setMainApi] = React.useState<CarouselApi>()
	const [thumbApi, setThumbApi] = React.useState<CarouselApi>()
	const [selectedIndex, setSelectedIndex] = React.useState(0)

	React.useEffect(() => {
		if (!mainApi || !thumbApi) return
		const onSelect = () => {
			const idx = mainApi.selectedScrollSnap()
			setSelectedIndex(idx)
			thumbApi.scrollTo(idx)
		}
		mainApi.on('select', onSelect)
		// gọi lần đầu
		onSelect()
		return () => {
			mainApi.off('select', onSelect)
		}
	}, [mainApi, thumbApi])

	return (
		<div>
			{/* Main carousel hiển thị ảnh lớn */}
			<Carousel setApi={setMainApi} className="w-full">
				<CarouselContent>
					{images.map((src, idx) => (
						<CarouselItem key={idx} className="pl-4">
							<img
								src={src}
								alt={'slide-' + idx}
								className="w-full rounded object-cover"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Không dùng Prev/Next ở đây */}
			</Carousel>

			{/* Thumbnail carousel */}
			<Carousel
				setApi={setThumbApi}
				opts={{ align: 'start', loop: false }}
				className="w-full mt-4"
			>
				<CarouselContent className="-ml-4">
					{images.map((src, idx) => (
						<CarouselItem
							key={idx}
							className={`pl-4 flex-none w-20 h-16 cursor-pointer transition-opacity`}
							onClick={() => mainApi?.scrollTo(idx)}
						>
							<div className={`${
								idx === selectedIndex ? 'opacity-100 border-2 border-primary rounded' : 'opacity-60'
							}`}>

							<img src={src} alt={'thumb-' + idx} className="w-full h-full object-cover rounded" />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
