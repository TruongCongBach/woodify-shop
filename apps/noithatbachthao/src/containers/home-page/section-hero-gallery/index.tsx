'use client'
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface HeroImage {
	url: string
	title: string
	description: string
}
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkaGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

const SectionHeroGallery: React.FC = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const timerRef = useRef<any>({current: null})

	// Shared blur placeholder

	// Hero images data
	const heroImages: HeroImage[] = useMemo(() => [
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/c_fill,g_center,q_auto:good,f_auto,dpr_auto/v1753109693/ke-tivi/jtcbznppdj8jeurvnbps.jpg',
			title: 'Kệ Tivi Gỗ Hương Cao Cấp',
			description: 'Thiết kế hiện đại, chất lượng vượt trội',
		},
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/c_fill,g_center,q_auto:good,f_auto,dpr_auto/v1753109686/ke-tivi/ddr3oqxdffhnr19upiao.jpg',
			title: 'Vát Cạnh Tối Giản',
			description: 'Đơn giản nhưng tinh tế',
		},
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/c_fill,g_center,q_auto:good,f_auto,dpr_auto/v1753109690/ke-tivi/zj7re6ao1p5stt6mslp3.jpg',
			title: 'Tùng Cúc Trúc Mai',
			description: 'Nghệ thuật gỗ truyền thống',
		},
	], [])

	// Navigation functions
	const nextImage = useCallback(() => {
		setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
	}, [heroImages.length])

	const prevImage = useCallback(() => {
		setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
	}, [heroImages.length])

	const goToImage = useCallback((index: number) => {
		setCurrentImageIndex(index)
	}, [])

	// Auto-slide timer
	useEffect(() => {
		if (!isPaused) {
			timerRef.current = setInterval(nextImage, 6000)
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [nextImage, isPaused])

	// Event handlers
	const handleMouseEnter = useCallback(() => setIsPaused(true), [])
	const handleMouseLeave = useCallback(() => setIsPaused(false), [])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
				return
			}

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault()
					prevImage()
					break
				case 'ArrowRight':
					event.preventDefault()
					nextImage()
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown, { passive: false })
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [nextImage, prevImage])

	return (
		<section
			className="relative h-screen overflow-hidden"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			aria-label="Bộ sưu tập kệ tivi và đồ gỗ nội thất cao cấp"
		>
			{/* Images */}
			<div className="absolute inset-0">
				{heroImages.map((image, index) => (
					<div
						key={index}
						className={`absolute inset-0 transition-all duration-1000 ease-out ${
							index === currentImageIndex
								? 'opacity-100 scale-100 z-10'
								: 'opacity-0 scale-105 z-0'
						}`}
					>
						<Image
							src={image.url}
							alt={`${image.title} - ${image.description}`}
							fill
							priority={index === 0}
							sizes="100vw"
							className="object-cover"
							quality={index === 0 ? 90 : 80}
							placeholder="blur"
							blurDataURL={BLUR_DATA_URL}
							loading={index === 0 ? 'eager' : 'lazy'}
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
					</div>
				))}
			</div>

			{/* Content */}
			<div className="relative z-20 h-full flex items-center">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl text-white space-y-6 sm:space-y-8">
						<div className="space-y-4 sm:space-y-6">
							<div className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-400/30">
                <span className="text-amber-300 font-medium text-sm sm:text-base">
                  ✨ Bộ Sưu Tập 2025
                </span>
							</div>

							<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
								Kệ Tivi & Đồ Gỗ
								<span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Nội Thất Cao Cấp
                </span>
							</h1>

							<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl">
								<span className="font-semibold">{heroImages[currentImageIndex].description}</span> - Khám phá vẻ đẹp hoàn hảo của thiên nhiên trong từng đường nét tinh xảo.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
							<Link
								href="/category/ke-tivi"
								className="group bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-105 focus:scale-105 shadow-xl hover:shadow-amber-500/25 focus:shadow-amber-500/25 flex items-center justify-center space-x-2 sm:space-x-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
							>
								<span>Khám Phá Bộ Sưu Tập</span>
								<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
							</Link>

							<a
								href="https://www.tiktok.com/@dailyketivi"
								target="_blank"
								rel="noopener noreferrer"
								className="group border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 focus:bg-white focus:text-gray-900 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 focus:outline-none focus:ring-2 focus:ring-white"
							>
								<Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
								<span>Xem Video Giới Thiệu</span>
							</a>
						</div>

						{/* Current image info */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8 space-y-3 sm:space-y-0 pt-4 sm:pt-6 lg:pt-8">
							<div className="flex items-center space-x-2">
								<Eye className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
								<span className="text-gray-300 text-sm sm:text-base">
                  {heroImages[currentImageIndex].title}
                </span>
							</div>

							<div className="flex items-center space-x-3 sm:space-x-4">
								<span className="text-gray-400 text-xs sm:text-sm">Bộ sưu tập</span>
								<div className="flex space-x-2">
									{heroImages.map((_, index) => (
										<button
											key={index}
											onClick={() => goToImage(index)}
											className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
												index === currentImageIndex
													? 'bg-amber-400 w-6 sm:w-8'
													: 'bg-white/40 hover:bg-white/60'
											}`}
											aria-label={`Chuyển đến ảnh ${index + 1}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<button
				onClick={prevImage}
				className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 lg:p-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
				aria-label="Ảnh trước"
			>
				<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
			</button>

			<button
				onClick={nextImage}
				className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 lg:p-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
				aria-label="Ảnh tiếp theo"
			>
				<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
			</button>

			{/* Stats */}
			<div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-30 hidden lg:block">
				<div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white border border-white/20">
					<div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
						<div>
							<div className="text-xl lg:text-2xl font-bold text-amber-400">500+</div>
							<div className="text-xs text-gray-300">Sản Phẩm</div>
						</div>
						<div>
							<div className="text-xl lg:text-2xl font-bold text-amber-400">2K+</div>
							<div className="text-xs text-gray-300">Khách Hàng</div>
						</div>
						<div>
							<div className="text-xl lg:text-2xl font-bold text-amber-400">4.9★</div>
							<div className="text-xs text-gray-300">Đánh Giá</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default React.memo(SectionHeroGallery)
