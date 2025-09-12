'use client'
import { Eye, Grid, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

interface Product {
	id: string
	name: string
	category: string
	image: string
	price: string
	originalPrice?: string
	rating: number
	views: string
	badges?: string[]
	url: string
}

interface Props {
	products: Product[]
}

interface Category {
	id: string
	name: string
	count: number
}

const BADGE_STYLES = {
	'Best Seller': 'bg-red-500',
	'New': 'bg-green-500',
	'Limited': 'bg-purple-500',
	'Trending': 'bg-blue-500',
	'Sale': 'bg-orange-500',
	default: 'bg-amber-600'
} as const

const blurDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkaGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

const SectionProductGallery: React.FC<Props> = ({ products }) => {
	const [selectedCategory, setSelectedCategory] = useState('all')

	// Memoize categories để tránh recalculate
	const categories: Category[] = useMemo(() => [
		{ id: 'all', name: 'Tất Cả', count: products.length },
		{ id: 'modern', name: 'Hiện Đại', count: products.filter(product => product.category === 'modern').length },
		{ id: 'minimal', name: 'Tối Giản', count: products.filter(product => product.category === 'minimal').length },
		{ id: 'vintage', name: 'Cổ Điển', count: products.filter(product => product.category === 'vintage').length },
		{ id: 'luxury', name: 'Cao Cấp', count: products.filter(product => product.category === 'luxury').length },
	], [products])

	// Memoize filtered products
	const filteredProducts = useMemo(() =>
			selectedCategory === 'all'
				? products
				: products.filter(product => product.category === selectedCategory),
		[products, selectedCategory]
	)

	const getBadgeStyle = (badge: string): string => {
		return BADGE_STYLES[badge as keyof typeof BADGE_STYLES] || BADGE_STYLES.default
	}

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < Math.floor(rating)
						? 'text-yellow-400 fill-current'
						: 'text-gray-300'
				}`}
			/>
		))
	}

	const renderBadges = (badges: string[]) => {
		return badges.slice(0, 3).map((badge, index) => (
			<div
				key={`${badge}-${index}`}
				className={`absolute top-6 left-6 px-3 py-1 rounded-full text-sm font-bold text-white ${getBadgeStyle(badge)}`}
				style={{ top: `${1.5 + index * 2.5}rem` }}
			>
				{badge}
			</div>
		))
	}

	return (
		<section id="gallery" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<header className="text-center mb-16">
					<div className="inline-block px-6 py-3 bg-amber-100 text-amber-800 rounded-full font-semibold mb-6">
						🎨 Bộ Sưu Tập Độc Quyền
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
						Sản Phẩm <span className="text-amber-600">Nổi Bật</span>
					</h2>
					<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Mỗi sản phẩm là một tác phẩm nghệ thuật, được chế tác tỉ mỉ từ những loại gỗ cao cấp nhất
					</p>
				</header>

				{/* Category Filter */}
				<nav className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12" aria-label="Lọc theo danh mục">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
								selectedCategory === category.id
									? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
									: 'bg-white text-gray-700 hover:bg-amber-50 shadow-md'
							}`}
							aria-pressed={selectedCategory === category.id}
						>
							{category.name} ({category.count})
						</button>
					))}
				</nav>

				{/* Products Grid */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{filteredProducts.map((product) => (
						<article key={product.id} className="group">
							<div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full">
								{/* Product Image */}
								<div className="relative overflow-hidden aspect-[4/3]">
									<Image
										src={product.image}
										alt={product.name}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover group-hover:scale-110 transition-transform duration-700"
										quality={75}
										placeholder="blur"
										blurDataURL={blurDataUrl}
									/>

									{/* Image Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Badges */}
									{product.badges && product.badges.length > 0 && renderBadges(product.badges)}
								</div>

								{/* Product Info */}
								<div className="p-6 sm:p-8">
									{/* Rating and Views */}
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center space-x-2">
											<div className="flex items-center space-x-1" aria-label={`Đánh giá ${product.rating} trên 5 sao`}>
												{renderStars(product.rating)}
											</div>
											<span className="text-sm text-gray-600">({product.rating})</span>
										</div>
										<div className="flex items-center space-x-1 text-gray-500 text-sm">
											<Eye className="w-4 h-4" aria-hidden="true" />
											<span>{product.views}</span>
										</div>
									</div>

									{/* Product Name */}
									<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors line-clamp-2">
										{product.name}
									</h3>

									{/* Price */}
									<div className="flex items-center justify-between mb-6">
										<div className="space-y-1">
											<div className="text-2xl sm:text-3xl font-bold text-amber-600">
												{product.price}
											</div>
											{!!product.originalPrice ? (
												<div className="text-base sm:text-lg text-gray-500 line-through">
													{product.originalPrice}
												</div>
											): <div className="h-[28px]"/>}
										</div>
									</div>

									{/* CTA Button */}
									<Link
										href={`/product/${product.url}`}
										className="block w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
									>
										<div className="flex items-center justify-center space-x-2 sm:space-x-3">
											<Eye className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
											<span>Xem Chi Tiết</span>
										</div>
									</Link>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* Load More Button */}
				<div className="text-center mt-12 sm:mt-16">
					<Link
						href="/category/ke-tivi"
						className="inline-flex items-center space-x-2 sm:space-x-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-amber-600 px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
					>
						<Grid className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
						<span>Xem Thêm Sản Phẩm</span>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default React.memo(SectionProductGallery)
