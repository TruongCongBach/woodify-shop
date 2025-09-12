'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavMenuMobile from './nav-menu-mobile'

const HeaderPage = () => {

	return (<header className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50">
		<div className="container mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<div className="flex items-center space-x-4">
					<Link href="/" className="flex items-center">
						<Image src="/logo-black.png" alt="Logo" width={160} height={80} className="h-20 w-auto"/>
						<div className="text-3xl font-bold flex flex-col md:flex-row items-center space-x-2">
							<span className="text-gray-900">Nội Thất</span>
							<span className="text-amber-600">Bách Thảo</span>
						</div>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-8">
					<Link href="/" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Trang Chủ</Link>
					<Link href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Bộ Sưu Tập</Link>
					<Link href="/category/ke-tivi" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Showroom</Link>
					<Link href="/ve-chung-toi" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Về Chúng Tôi</Link>
					<Link href="/lien-he" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Liên Hệ</Link>
				</nav>

				<div className="flex items-center space-x-4">
					{/* Mobile Navigation */}
					<NavMenuMobile/>
				</div>
			</div>
		</div>
	</header>)
}
export default HeaderPage
