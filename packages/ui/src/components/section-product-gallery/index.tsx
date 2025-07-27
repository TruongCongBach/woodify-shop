'use client'
import { Eye, Grid, Heart, ShoppingCart, Star, ZoomIn } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SectionProductGallery = () => {
	const [selectedCategory, setSelectedCategory] = useState('all')

	const productShowcase = [
		{
			id: 1,
			name: 'Kệ Tivi Gỗ Kiểu Vát',
			price: '8,500,000',
			originalPrice: '7,000,000',
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109708/ke-tivi/zfurdxwvr80z1v22kdeu.jpg',
			category: 'luxury',
			badge: 'Best Seller',
			rating: 4.9,
			views: '2.1k',
		},
		{
			id: 2,
			name: 'Kệ Tivi Dáng Cột Nho',
			price: '9,500,000',
			originalPrice: null,
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109690/ke-tivi/o7nqasfoynykgyfmnzcn.jpg',
			category: 'luxury',
			badge: 'luxury',
			rating: 4.8,
			views: '1.8k',
		},
		{
			id: 3,
			name: 'Kệ Tivi Khắc Hoa Hồng',
			price: '9,000,000',
			originalPrice: '9,500,000',
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109683/ke-tivi/yzphwzcvl0kfmjgulooz.jpg',
			category: 'vintage',
			badge: 'Limited',
			rating: 4.7,
			views: '1.5k',
		},
		{
			id: 4,
			name: 'Kệ Tivi Dáng lồi',
			price: '5,000,000',
			originalPrice: null,
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109655/ke-tivi/mfcsgkgqoawadvl4qxuy.jpg',
			category: 'modern',
			badge: 'Trending',
			rating: 4.6,
			views: '2.3k',
		},
		{
			id: 5,
			name: 'Kệ Tivi sofa',
			price: '5,000,000',
			originalPrice: '5,200,000',
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109640/ke-tivi/kmbmho6m8pcsgn2u8ft0.jpg',
			category: 'minimal',
			badge: 'Sale',
			rating: 4.9,
			views: '3.2k',
		},
		{
			id: 6,
			name: 'Kệ Tivi Góc Sừng',
			price: '7,500,000',
			originalPrice: null,
			image: 'https://res.cloudinary.com/furniture-shop/image/upload/v1753109693/ke-tivi/jtcbznppdj8jeurvnbps.jpg',
			category: 'luxury',
			badge: 'Premium',
			rating: 5.0,
			views: '1.2k',
		},
	]

	const categories = [
		{ id: 'all', name: 'Tất Cả', count: 6 },
		{ id: 'modern', name: 'Hiện Đại', count: 1 },
		{ id: 'minimal', name: 'Tối Giản', count: 1 },
		{ id: 'vintage', name: 'Cổ Điển', count: 1 },
		{ id: 'luxury', name: 'Cao Cấp', count: 3 },
	]

	const filteredProducts = selectedCategory === 'all'
		? productShowcase
		: productShowcase.filter(product => product.category === selectedCategory)

	return (<section id="gallery" className="py-20 bg-gray-50">
		<div className="container mx-auto px-4">
			{/* Section Header */}
			<div className="text-center mb-16">
				<div className="inline-block px-6 py-3 bg-amber-100 text-amber-800 rounded-full font-semibold mb-6">
					🎨 Bộ Sưu Tập Độc Quyền
				</div>
				<h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					Sản Phẩm <span className="text-amber-600">Nổi Bật</span>
				</h2>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					Mỗi sản phẩm là một tác phẩm nghệ thuật, được chế tác tỉ mỉ từ những loại gỗ cao cấp nhất
				</p>
			</div>

			{/* Category Filter */}
			<div className="flex flex-wrap justify-center gap-4 mb-12">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => setSelectedCategory(category.id)}
						className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
							selectedCategory === category.id
								? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
								: 'bg-white text-gray-700 hover:bg-amber-50 shadow-md'
						}`}
					>
						{category.name} ({category.count})
					</button>
				))}
			</div>

			{/* Products Grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredProducts.map((product) => (
					<div key={product.id} className="group">
						<div
							className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full">
							{/* Product Image */}
							<div className="relative overflow-hidden aspect-[4/3]">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
								/>

								{/* Image Overlay */}
								<div
									className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

								{/* Badge */}
								<div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold text-white ${
									product.badge === 'Best Seller' ? 'bg-red-500' :
										product.badge === 'New' ? 'bg-green-500' :
											product.badge === 'Limited' ? 'bg-purple-500' :
												product.badge === 'Trending' ? 'bg-blue-500' :
													product.badge === 'Sale' ? 'bg-orange-500' :
														'bg-amber-600'
								}`}>
									{product.badge}
								</div>

								{/* Action Buttons */}
								<div
									className="absolute top-6 right-6 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<button
										className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-300">
										<Heart className="w-5 h-5 text-gray-700 hover:text-red-500"/>
									</button>
									<button
										className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-300">
										<ZoomIn className="w-5 h-5 text-gray-700"/>
									</button>
								</div>

								{/* Quick View Button */}
								<div
									className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
									<button
										className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
										<Eye className="w-5 h-5"/>
										<span>Xem Chi Tiết</span>
									</button>
								</div>
							</div>

							{/* Product Info */}
							<div className="p-8">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-2">
										<div className="flex items-center space-x-1">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
												/>
											))}
										</div>
										<span className="text-sm text-gray-600">({product.rating})</span>
									</div>
									<div className="flex items-center space-x-1 text-gray-500 text-sm">
										<Eye className="w-4 h-4"/>
										<span>{product.views}</span>
									</div>
								</div>

								<h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
									{product.name}
								</h3>

								<div className="flex items-center justify-between mb-6">
									<div className="space-y-1">
										<div className="text-3xl font-bold text-amber-600">{product.price}₫</div>
										{product.originalPrice ? (
											<div className="text-lg text-gray-500 line-through">{product.originalPrice}₫</div>
										) : (<div className="text-lg text-gray-500 line-through h-[28px]"/>)}
									</div>
								</div>

								<button
									className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
									<ShoppingCart className="w-6 h-6"/>
									<span>Thêm Vào Giỏ Hàng</span>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Load More Button */}
			<div className="text-center mt-16">
				<button
					className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-amber-600 px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto">
					<a href="/category/ke-tivi" className="flex items-center space-x-3">
						<Grid className="w-6 h-6"/>
						<span>Xem Thêm Sản Phẩm</span>
					</a>
				</button>
			</div>
		</div>
	</section>)
}
export default SectionProductGallery
