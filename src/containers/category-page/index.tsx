'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { FilterSidebar } from '@/components/filter-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/ui/shadcn-ui/breadcrumb'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/shadcn-ui/sheet'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { House } from 'lucide-react'
import { useProductAttributesByCategoryId } from '@/hooks/useProductAttributesByCategoryId'
import { useProductSearchByCondition } from '@/hooks/useProductSearchByCondition'

type Props = {category: Category}

export default function CategoryPageClient({ category }: Props) {
	const { filters } = useProductAttributesByCategoryId(category.id)
	const [selectedFilters, setSelectedFilters] = useState<any>({})
	const [priceRange, setPriceRange] = useState<string | undefined>()


	const attributesSelected = useMemo(() => {
		return Object.entries(selectedFilters)
		.filter(([k]) => k !== 'price')
		.flatMap(([key, values]: any) => values.map((v:any) => ({ key, value: v })))
	}, [selectedFilters])

	const { products, isLoading, isError, size, setSize, totalCount, hasMore } = useProductSearchByCondition({
		categoryId: category.id,
		attributes: attributesSelected,
		priceRange,
		pageSize: 12,
	})

	const onApply = useCallback((sel: any) => {
		setSize(1)
		setSelectedFilters(sel)
	}, [setSize])

	const observer = useRef<IntersectionObserver | null>(null)
	const bottomRef = useCallback((node: HTMLDivElement | null) => {
		if (!node) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore && !isLoading) {
				setTimeout(() => {
					setSize(size + 1)
				}, 1000) // Thêm delay để tránh gọi quá nhanh
			}
		})
		observer.current.observe(node)
	}, [isLoading, hasMore, size, setSize])

	return (
		<div className="bg-gray-100/70">
			<div className="container mx-auto px-4 py-6 space-y-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="flex items-center gap-x-2">
								<House className="h-4 w-4"/> Home
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator/>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/category/${category.url}`}>{category.name}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<aside className="hidden md:block md:col-span-1 space-y-6">
						<FilterSidebar filters={filters} onApply={onApply}/>
					</aside>

					<main className="md:col-span-3 space-y-4">
						<div className="flex justify-between items-center">
							<select
								className="border rounded px-2 py-1 text-sm"
								onChange={e => {
									/* implement sort if needed */
								}}
							>
								<option value="">Sắp xếp theo</option>
							</select>

							<div className="md:hidden">
								<Sheet>
									<SheetTrigger asChild>
										<button className="p-2 border rounded">Filter</button>
									</SheetTrigger>
									<SheetContent side="bottom" className="pb-16">
										<SheetHeader>
											<SheetTitle>Lọc sản phẩm</SheetTitle>
										</SheetHeader>
										<div className="px-4 space-y-4 overflow-y-auto max-h-[60vh]">
											<FilterSidebar filters={filters} onApply={onApply}/>
										</div>
									</SheetContent>
								</Sheet>
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{products.map(p => (
								<Link href={`/product/${p.url}`} key={p.id}>
									<ProductCard product={p} tags={p.tags}/>
								</Link>
							))}
							{isLoading && Array.from({ length: 12 }).map((_, idx) => (
								<ProductCardSkeleton key={`skel-${idx}`}/>
							))}
						</div>

						{products.length < (totalCount ?? 0) && (
							<div ref={bottomRef} className="h-1"></div>
						)}

						{isError && hasMore && <div className="text-center text-red-500">Không tải được sản phẩm.</div>}

						{/* Debug info - remove in production */}
						<div className="text-sm text-gray-500">
							Đã tải: {products.length} / Tổng: {totalCount}
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}
