'use client'
import * as React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@woodify/ui/shadcn-ui/carousel'
import type { CarouselApi } from '@woodify/ui/shadcn-ui/carousel'

interface MediaItem {
	src: string
	type: 'image' | 'video'
	alt?: string
}

interface ProductGalleryProps {
	media: MediaItem[]
}

// Helper function để xác định loại media từ URL
function getMediaType(src: string): 'image' | 'video' {
	const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi']
	const extension = src.split('.').pop()?.toLowerCase()
	return videoExtensions.includes(extension || '') ? 'video' : 'image'
}

// Component để render media item
function MediaRenderer({ item, className }: { item: MediaItem, className?: string }) {
	if (item.type === 'video') {
		return (
			<video
				src={item.src}
				className={className}
				controls
				preload="metadata"
				muted
				playsInline
			>
				Your browser does not support the video tag.
			</video>
		)
	}

	return (
		<img
			src={item.src}
			alt={item.alt || 'Product image'}
			className={className}
		/>
	)
}

export function ProductGallery({ media }: ProductGalleryProps) {
	const [mainApi, setMainApi] = React.useState<CarouselApi>()
	const [thumbApi, setThumbApi] = React.useState<CarouselApi>()
	const [selectedIndex, setSelectedIndex] = React.useState(0)

	// Normalize media data
	const normalizedMedia = React.useMemo(() => {
		return media.map(item => ({
			...item,
			type: item.type || getMediaType(item.src)
		}))
	}, [media])

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
			{/* Main carousel hiển thị media lớn */}
			<Carousel setApi={setMainApi} className="w-full">
				<CarouselContent>
					{normalizedMedia.map((item, idx) => (
						<CarouselItem key={idx} className="pl-4">
							<div className="relative w-full h-96 bg-gray-100 rounded overflow-hidden">
								<MediaRenderer
									item={item}
									className="w-full h-full rounded object-cover"
								/>
								{/* Video indicator */}
								{item.type === 'video' && (
									<div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
										Video
									</div>
								)}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Thumbnail carousel */}
			<Carousel
				setApi={setThumbApi}
				opts={{ align: 'start', loop: false }}
				className="w-full mt-4"
			>
				<CarouselContent className="-ml-4">
					{normalizedMedia.map((item, idx) => (
						<CarouselItem
							key={idx}
							className={`pl-4 flex-none w-20 cursor-pointer transition-opacity mr-2`}
							onClick={() => mainApi?.scrollTo(idx)}
						>
							<div className={`relative w-20 h-16 overflow-hidden mr-2 ${
								idx === selectedIndex
									? 'opacity-100 border-2 border-primary rounded'
									: 'opacity-60'
							}`}>
								<MediaRenderer
									item={item}
									className="w-full h-full object-cover rounded"
								/>
								{/* Video play icon overlay cho thumbnail */}
								{item.type === 'video' && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
										<div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 5v14l11-7z" fill="currentColor"/>
											</svg>
										</div>
									</div>
								)}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
