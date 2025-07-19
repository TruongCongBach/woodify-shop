'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildFilters } from '@/utils/buildFilters'
import { FilterSidebar } from '@/components/filter-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@woodify/ui/shadcn-ui/breadcrumb'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@woodify/ui/shadcn-ui/sheet'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { House } from 'lucide-react'
import PRODUCTS from '@/data/products'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'

type Props = {
	category: Category
}
export default function CategoryPageClient(props: Props) {
	const { category } = props
	const allProducts = PRODUCTS.filter(p => p.categoryId === category.id)
	const filters = buildFilters(allProducts)
	const [loading, setLoading] = useState(false)

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

	const sortedProducts = useMemo(() => {
		return [...filtered].sort((a, b) => {
			const priceA = +a.price
			const priceB = +b.price
			if (sortValue === 'price-asc') return priceA - priceB
			if (sortValue === 'price-desc') return priceB - priceA
			return 0
		})
	}, [filtered, sortValue])

	const [visibleProducts, setVisibleProducts] = useState(
		sortedProducts.slice(0, itemsPerPage)
	)
	const [hasMore, setHasMore] = useState(sortedProducts.length > itemsPerPage)
	const observer = useRef<IntersectionObserver | null>(null)

	const bottomRef = useCallback((node: HTMLDivElement | null) => {
		if (!hasMore) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setLoading(true)
				setPage(prev => prev + 1)
			}
		})
		if (node) observer.current.observe(node)
	}, [hasMore])

	useEffect(() => {
		const end = page * itemsPerPage
		setVisibleProducts(sortedProducts.slice(0, end))
		setHasMore(sortedProducts.length > end)
		setLoading(false)
	}, [page, sortedProducts])

	return (
		<div className="bg-gray-100/70">
			<div className="container mx-auto px-4 py-6 space-y-6">
				{/* Breadcrumb */}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="flex gap-x-2 items-center">
								<House className="h-4 w-4"/>Home
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
						{visibleProducts.length === 0 ? (
							<div className="text-center text-gray-500 py-8">
								Không có sản phẩm nào phù hợp với bộ lọc đã chọn.
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{visibleProducts.map(product => (
										<Link href={`/product/${product.url}`} key={product.id}>
											<ProductCard product={product}/>
										</Link>
									))}
									{loading && Array.from({ length: itemsPerPage }).map((_, idx) => (
										<ProductCardSkeleton key={`skeleton-${page}-${idx}`} />
									))}
								</div>
							</>
						)}
						<div ref={bottomRef} className="h-1"></div>
					</main>
				</div>
			</div>
		</div>
	)
}
