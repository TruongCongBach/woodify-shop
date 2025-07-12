'use client'

import { useState } from 'react'
import productsMock from '@/data/productsMock'
import { buildFilters } from '@/utils/buildFilters'
import { FilterSidebar } from '@/components/filter-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@woodify/ui/components/breadcrumb'
import { Category } from '@/data/categoriesMock'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@woodify/ui/components/sheet'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@woodify/ui/components/pagination'
import Link from 'next/link'
import { getPaginationRange } from '@/utils/getPaginationRange'
import { ProductCard } from '@/components/product-card'
import { HomeIcon } from '@heroicons/react/24/outline'

type Props = {
	category: Category
}
export default function CategoryPageClient(props: Props) {
	const { category } = props
	const allProducts = productsMock.filter(p => p.categoryId === category.id)
	const filters = buildFilters(allProducts)

	const [filtered, setFiltered] = useState(allProducts)

	const applyFilter = (sel: Record<string, string[]>) => {
		let list = allProducts

		Object.entries(sel).forEach(([key, values]) => {
			if (!values || values.length === 0) return
			if (key === 'price') {
				list = list.filter(p =>
					values.some(range => {
						const price = parseInt(p.price, 10)
						if (range.startsWith('<')) return price < +range.slice(1)
						if (range.startsWith('>')) return price > +range.slice(1)
						const [min, max] = range.split('-').map(Number)
						return price >= min && price <= max
					}),
				)
			} else {
				list = list.filter(p =>
					p.attributes?.some(attr => attr.key === key && values.includes(attr.value)),
				)
			}
		})

		setFiltered(list)
		setPage(1)
	}

	const [sortValue, setSortValue] = useState('')
	const [page, setPage] = useState(1)
	const itemsPerPage = 8

	const sortedProducts = [...filtered].sort((a, b) => {
		const priceA = parseInt(a.price, 10)
		const priceB = parseInt(b.price, 10)

		if (sortValue === 'price-asc') return priceA - priceB
		if (sortValue === 'price-desc') return priceB - priceA
		return 0
	})

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
	const pagedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)

	return (
		<div className="container mx-auto px-4 py-6 space-y-6">
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="flex gap-x-2 items-center">
							<HomeIcon className="h-4 w-4" />Home
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator/>
					<BreadcrumbItem>
						<BreadcrumbLink href={`/category/${category.url}`}>{category.name}</BreadcrumbLink>
					</BreadcrumbItem>

				</BreadcrumbList>
			</Breadcrumb>


			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Sidebar filter: chỉ hiện md+ */}
				<aside className="hidden md:block space-y-6 md:col-span-1">
					<FilterSidebar filters={filters} onApply={applyFilter}/>
				</aside>

				<main className="md:col-span-3 space-y-4">
					{/* Sort + mobile Icon */}
					<div className="flex justify-between items-center">
						<select
							className="border rounded px-2 py-1 text-sm"
							value={sortValue}
							onChange={e => setSortValue(e.target.value)}
						>
							<option value="">Sắp xếp theo</option>
							<option value="price-asc">Giá tăng dần</option>
							<option value="price-desc">Giá giảm dần</option>
						</select>

						{/* Chỉ hiện mobile */}
						<div className="md:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<button className="p-2 border rounded">
										{/* icon filter */}
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
												 viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
														d="M3 4a1 1 0 012 0v0m0 0h14m0 0a1 1 0 011 1v0m0 0v2m0 0H5m14 0a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1z"/>
										</svg>
									</button>
								</SheetTrigger>
								<SheetContent side="bottom" className="animate-in slide-in-from-bottom duration-300 pb-16">
									<SheetHeader>
										<SheetTitle>Lọc sản phẩm</SheetTitle>
									</SheetHeader>
									<div className="px-4 space-y-4 overflow-y-auto max-h-[60vh]">
										{/* Filter options same as sidebar */}
										<FilterSidebar filters={filters} onApply={applyFilter}/>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>

					{/* Product grid */}
					{pagedProducts.length === 0 ? (
						<div className="text-center text-gray-500 py-8">
							Không có sản phẩm nào phù hợp với bộ lọc đã chọn.
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{pagedProducts.map(product => (
									<Link href={`/product/${product.url}`} key={product.id}>
										<ProductCard product={product}/>
									</Link>
								))}
							</div>
							<div className="flex justify-center space-x-4 mt-4">
								<Pagination>
									<PaginationContent>
										{/* Previous */}
										<PaginationItem>
											<PaginationPrevious
												href="#"
												onClick={(e) => {
													e.preventDefault()
													setPage((prev) => Math.max(prev - 1, 1))
												}}
												aria-disabled={page === 1}
												className={page === 1 ? 'opacity-50 pointer-events-none' : ''}
											/>
										</PaginationItem>

										{/* Page numbers with ellipsis */}
										{getPaginationRange(page, totalPages).map((item, idx) => (
											<PaginationItem key={idx}>
												{item === 'ellipsis' ? (
													<PaginationEllipsis />
												) : (
													<PaginationLink
														href="#"
														isActive={page === item}
														onClick={(e) => {
															e.preventDefault()
															setPage(item)
														}}
													>
														{item}
													</PaginationLink>
												)}
											</PaginationItem>
										))}

										{/* Next */}
										<PaginationItem>
											<PaginationNext
												href="#"
												onClick={(e) => {
													e.preventDefault()
													setPage((prev) => Math.min(prev + 1, totalPages))
												}}
												aria-disabled={page === totalPages}
												className={page === totalPages ? 'opacity-50 pointer-events-none' : ''}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</>
					)}


				</main>
			</div>
		</div>
	)
}
