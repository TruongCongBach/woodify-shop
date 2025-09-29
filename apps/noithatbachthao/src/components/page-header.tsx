import React from 'react'
import { Phone } from 'lucide-react'
import { ZaloIcon } from '@woodify/ui/icons/zalo-icon'
import { CategoryAccordionNav } from '@/components/category-accordion-nav'
import Image from 'next/image'

interface PageHeaderProps {
	phone: string
	logo: string
	categoryTreeMenu: Promise<CategoryTree[]>
}

export const PageHeader = ({ phone, categoryTreeMenu }: PageHeaderProps) => {

	return (
		<header className="bg-gray-100/70 backdrop-blur-sm w-full">
			<div className="container mx-auto flex items-center justify-between px-4 pt-4 pb-0">
				{/* Logo */}
				<a href="/" className="flex items-center">
					<Image src="/logo.png" alt="Logo" width={80} height={80} className="h-20 w-auto"/>
					<div className="text-center">
						<span className="ml-2 text-xl font-bold">Khánh Trang</span><br/>
						<span className="ml-2 text-xs font-bold">Đồ Gỗ Nội Thất</span>
					</div>
				</a>
				{/* Mobile menu button */}
				<CategoryAccordionNav categoryTreeMenu={categoryTreeMenu}/>

				{/* Desktop nav */}
				<div className="hidden md:flex md:items-center md:space-x-8 flex-1 mx-4">
					<input
						type="search"
						placeholder="Tìm kiếm sản phẩm..."
						className="flex-1 border rounded px-3 py-2"
					/>
					<a href="/contact-us" className="text-lg font-bold">Liên hệ</a>
					<a href="/about-us" className="text-lg font-bold">Về chúng tôi</a>
					<div className="flex flex-col items-center gap-y-2">
						<a href={`tel:${phone}`} className="text-lg font-bold flex gap-x-2">
							<Phone className="h-6 w-6 text-gray-700"/> <span>{phone}</span>
						</a>
						<a href={`https://zalo.me/${phone}`} className="text-lg font-bold flex gap-x-2">
							<ZaloIcon className="h-6 w-6 text-gray-700"/> <span>{phone}</span>
						</a>
					</div>
				</div>
			</div>

		</header>
	)
}
