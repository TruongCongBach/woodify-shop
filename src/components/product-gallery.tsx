'use client'
import * as React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/ui/shadcn-ui/carousel'
import type { CarouselApi } from '@/ui/shadcn-ui/carousel'
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from '@/ui/shadcn-ui/dialog'

interface MediaItem {
	src: string
	type: 'image' | 'video'
	alt?: string
}

interface ProductGalleryProps {
	media: MediaItem[]
	productName: string
}

// Helper function để xác định loại media từ URL
function getMediaType(src: string): 'image' | 'video' {
	const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi']
	const extension = src.split('.').pop()?.toLowerCase()
	return videoExtensions.includes(extension || '') ? 'video' : 'image'
}

import Image from 'next/image'

// Component để render media item
function MediaRenderer({
	item,
	className,
	priority = false,
	alt,
}: {
	item: MediaItem
	className?: string
	priority?: boolean
	alt: string
}) {
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
		<Image
			src={item.src}
			alt={item.alt || alt}
			fill
			priority={priority}
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			className={className}
		/>
	)
}

export function ProductGallery({ media, productName }: ProductGalleryProps) {
	const [mainApi, setMainApi] = React.useState<CarouselApi>()
	const [thumbApi, setThumbApi] = React.useState<CarouselApi>()
	const [selectedIndex, setSelectedIndex] = React.useState(0)
	const [lightbox, setLightbox] = React.useState<{ open: boolean; index: number }>({
		open: false,
		index: 0,
	})
	const [lightboxApi, setLightboxApi] = React.useState<CarouselApi>()

	// Arrow key navigation within lightbox
	React.useEffect(() => {
		if (!lightbox.open || !lightboxApi) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') lightboxApi.scrollNext()
			if (e.key === 'ArrowLeft') lightboxApi.scrollPrev()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [lightbox.open, lightboxApi])

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

	if (normalizedMedia.length === 0) {
		return (
			<div className="flex aspect-[4/3] items-center justify-center border border-craft-line bg-craft-paper text-sm text-muted-foreground">
				Sản phẩm chưa có hình ảnh.
			</div>
		)
	}

	return (
		<div className="min-w-0">
			{/* Main carousel hiển thị media lớn */}
			<Carousel setApi={setMainApi} className="w-full overflow-hidden">
				<CarouselContent className="-ml-0">
					{normalizedMedia.map((item, idx) => (
						<CarouselItem key={`${item.src}-${idx}`} className="pl-0">
							<button
								type="button"
								onClick={() => setLightbox({ open: true, index: idx })}
								aria-label={`Phóng to ảnh ${idx + 1} của ${productName}`}
								className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden border border-craft-line bg-craft-paper"
							>
								<MediaRenderer
									item={item}
									alt={`${productName} - hình ${idx + 1}`}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
									priority={idx === 0}
								/>
								{/* Video indicator */}
								{item.type === 'video' && (
									<div className="absolute right-3 top-3 bg-craft-ink/80 px-2 py-1 text-xs text-white">
										Video
									</div>
								)}
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Thumbnail carousel */}
			<Carousel
				setApi={setThumbApi}
				opts={{ align: 'start', loop: false }}
				className="mt-4 w-full"
			>
				<CarouselContent className="-ml-2">
					{normalizedMedia.map((item, idx) => (
						<CarouselItem
							key={`${item.src}-thumb-${idx}`}
							className="w-24 flex-none pl-2"
						>
							<button
								type="button"
								onClick={() => mainApi?.scrollTo(idx)}
								className={`relative block aspect-[4/3] w-full overflow-hidden border-2 transition-opacity ${
									idx === selectedIndex
										? 'border-craft-copper opacity-100'
										: 'border-transparent opacity-60 hover:opacity-100'
								}`}
								aria-label={`Xem hình ${idx + 1} của ${productName}`}
								aria-current={idx === selectedIndex ? 'true' : undefined}
							>
								<MediaRenderer
									item={item}
									alt=""
									className="h-full w-full object-cover"
								/>
								{/* Video play icon overlay cho thumbnail */}
								{item.type === 'video' && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/20">
										<div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 5v14l11-7z" fill="currentColor"/>
											</svg>
										</div>
									</div>
								)}
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Lightbox */}
			<Dialog open={lightbox.open} onOpenChange={(open) => setLightbox((s) => ({ ...s, open }))}>
				<DialogContent
					className="max-w-[min(96vw,1100px)] border-craft-line bg-craft-paper p-0"
					aria-describedby={undefined}
				>
					<DialogTitle className="sr-only">Phóng to hình ảnh {productName}</DialogTitle>
					<Carousel
						setApi={setLightboxApi}
						opts={{ startIndex: lightbox.index, loop: true }}
						className="w-full"
					>
						<CarouselContent className="-ml-0">
							{normalizedMedia.map((item, idx) => (
								<CarouselItem key={`${item.src}-lightbox-${idx}`} className="pl-0">
									<div className="flex aspect-[4/3] w-full items-center justify-center bg-craft-ink">
										<MediaRenderer
											item={item}
											alt={`${productName} - hình ${idx + 1} (phóng to)`}
											className="h-full w-full object-contain"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</DialogContent>
			</Dialog>
		</div>
	)
}
