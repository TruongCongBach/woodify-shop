'use client'
import React from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import NavMenuMobile from './nav-menu-mobile'

const HeaderPage = () => {

	return (<header className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50">
		<div className="container mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<div className="flex items-center space-x-4">
					<a href="/" className="flex items-center">
						<img src="/logo-ketivi-icon.png" alt="Logo" className="h-20 w-auto"/>
						<div className="text-3xl font-bold">
							<span className="text-gray-900">Đại Lý Kệ</span>
							<span className="text-amber-600">Tivi</span>
						</div>
					</a>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-8">
					<a href="/" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Trang Chủ</a>
					<a href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Bộ Sưu Tập</a>
					<a href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Showroom</a>
					<a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Về Chúng Tôi</a>
					<a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Liên Hệ</a>
				</nav>

				<div className="flex items-center space-x-4">
					<button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
						<Heart className="w-6 h-6"/>
					</button>
					<button className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative">
						<ShoppingCart className="w-6 h-6"/>
						<span
							className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
					</button>

					{/* Mobile Navigation */}
					<NavMenuMobile/>
				</div>
			</div>
		</div>
	</header>)
}
export default HeaderPage
