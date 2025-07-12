'use client'
// packages/ui/src/components/PageHeader.tsx
import React, { useState } from 'react'
import { Bars3Icon, ShoppingCartIcon, PhoneIcon } from '@heroicons/react/24/outline'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@woodify/ui/components/sheet'
import { CategoryAccordionNav } from '@/components/category-accordion-nav'
import { Category } from '@/components/category-nav'
import { useRouter } from 'next/navigation'
import { ZaloIcon } from '@woodify/ui/components/icons/zalo-icon'

const categories: Category[] = [
	{
		key: 'ban-ghe',
		label: 'Bàn ghế',
		image: 'https://picsum.photos/seed/wood1/80',
		sub: [
			{ key: 'ban-an', label: 'Bàn ăn' },
			{ key: 'sofa', label: 'Sofa' },
		],
	},
	{
		key: 'tu-tho', label: 'Tủ thờ',
		sub: [
			{ key: 'ban-an', label: 'Bàn ăn' },
			{ key: 'sofa', label: 'Sofa' },
		],
	},
	{ key: 'ke-tivi', label: 'Kệ Tivi', image: 'https://picsum.photos/seed/wood3/80' },
	{ key: 'vach-tho', label: 'Vách thờ', image: 'https://picsum.photos/seed/wood4/80' },
]

interface PageHeaderProps {
	phone: string
	logo: string
}

export const PageHeader = ({ phone }: PageHeaderProps) => {
	const router = useRouter()
	const handleSelect = (key: string) => {
		router.push(`/${key}`)
	}

	return (
		<header className="bg-gray-100/70 backdrop-blur-sm w-full">
			<div className="container mx-auto flex items-center justify-between px-4 pt-4 pb-0">
				{/* Logo */}
				<a href="/" className="flex items-center">
					<img src="/logo.png" alt="Logo" className="h-20 w-auto"/>
					<div className="text-center">
						<span className="ml-2 text-xl font-bold">Khánh Trang</span><br/>
						<span className="ml-2 text-xs font-bold">Đồ Gỗ Nội Thất</span>
					</div>
				</a>
				{/* Mobile menu button */}
				<Sheet>
					<SheetTrigger className="md:hidden">
						<Bars3Icon className="h-6 w-6"/>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Are you absolutely sure?</SheetTitle>
							<SheetDescription>
								<CategoryAccordionNav
									categories={categories}
									onSelectAction={handleSelect}
								/>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>

				{/* Desktop nav */}
				<div className="hidden md:flex md:items-center md:space-x-8 flex-1 mx-4">
					<input
						type="search"
						placeholder="Tìm kiếm sản phẩm..."
						className="flex-1 border rounded px-3 py-2"
					/>
					<div className="flex flex-col items-center gap-y-2">
						<a href={`tel:${phone}`} className="text-lg font-bold flex gap-x-2">
							<PhoneIcon className="h-6 w-6 text-gray-700" /> <span>{phone}</span>
						</a>
						<a href={`https://zalo.me/${phone}`} className="text-lg font-bold flex gap-x-2">
							<ZaloIcon className="h-6 w-6 text-gray-700" /> <span>{phone}</span>
						</a>
					</div>
				</div>
			</div>

		</header>
	)
}
