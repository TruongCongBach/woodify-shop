'use client'
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SectionHeroGallery = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const heroImages = [
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109693/ke-tivi/jtcbznppdj8jeurvnbps.jpg',
			title: 'Kệ Tivi Gỗ Sồi Cao Cấp',
			description: 'Thiết kế hiện đại, chất lượng vượt trội',
		},
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109686/ke-tivi/ddr3oqxdffhnr19upiao.jpg',
			title: 'Minimalist Collection',
			description: 'Đơn giản nhưng tinh tế',
		},
		{
			url: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109690/ke-tivi/zj7re6ao1p5stt6mslp3.jpg',
			title: 'Vintage Masterpiece',
			description: 'Nghệ thuật gỗ truyền thống',
		},
	]

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
		}, 4000)
		return () => clearInterval(timer)
	}, [])

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
	}

	return (<section className="relative h-screen overflow-hidden">
		<div className="absolute inset-0">
			{heroImages.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
						index === currentImageIndex
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-105'
					}`}
				>
					<img
						src={image.url}
						alt={image.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
				</div>
			))}
		</div>

		{/* Content Overlay */}
		<div className="relative z-20 h-full flex items-center">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl text-white space-y-8">
					<div className="space-y-6">
						<div
							className="inline-block px-4 py-2 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-400/30">
							<span className="text-amber-300 font-medium">✨ Bộ Sưu Tập 2024</span>
						</div>
						<h1 className="text-6xl md:text-8xl font-bold leading-tight">
							Kệ Tivi Gỗ
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
								Nghệ Thuật
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
							{heroImages[currentImageIndex].description} - Khám phá vẻ đẹp hoàn hảo của
							thiên nhiên trong từng đường nét tinh xảo.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-6">
						<a href="/category/ke-tivi">
							<button
								className="group bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-3">
								<span>Khám Phá Bộ Sưu Tập</span>
								<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
							</button>
						</a>
						<a href="https://www.tiktok.com/@dailyketivi" target="_blank" rel="noopener noreferrer">
							<button
								className="group border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center space-x-3">
								<Play className="w-6 h-6 group-hover:scale-110 transition-transform"/>
								<span>Xem Video Giới Thiệu</span>
							</button>
						</a>
					</div>

					{/* Image Info */}
					<div className="flex items-center space-x-8 pt-8">
						<div className="flex items-center space-x-2">
							<Eye className="w-5 h-5 text-amber-400"/>
							<span className="text-gray-300">Đang xem: {heroImages[currentImageIndex].title}</span>
						</div>
						<div className="hidden md:flex items-center space-x-4">
							<span className="text-gray-400">Bộ sưu tập</span>
							<div className="flex space-x-1">
								{heroImages.map((_, index) => (
									<div
										key={index}
										className={`w-2 h-2 rounded-full transition-all duration-300 ${
											index === currentImageIndex ? 'bg-amber-400 w-8' : 'bg-white/40'
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* Navigation Arrows */}
		<button
			onClick={prevImage}
			className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 p-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110"
		>
			<ChevronLeft className="w-6 h-6"/>
		</button>
		<button
			onClick={nextImage}
			className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 p-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110"
		>
			<ChevronRight className="w-6 h-6"/>
		</button>

		{/* Floating Stats */}
		<div className="absolute bottom-8 right-8 z-30 hidden lg:block">
			<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/20">
				<div className="grid grid-cols-3 gap-6 text-center">
					<div>
						<div className="text-2xl font-bold text-amber-400">500+</div>
						<div className="text-xs text-gray-300">Sản Phẩm</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-amber-400">2K+</div>
						<div className="text-xs text-gray-300">Khách Hàng</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-amber-400">4.9★</div>
						<div className="text-xs text-gray-300">Đánh Giá</div>
					</div>
				</div>
			</div>
		</div>
	</section>)
}
export default SectionHeroGallery
