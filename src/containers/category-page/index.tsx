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
import { Filter, House, LayoutGrid, List, ArrowUpDown } from 'lucide-react'
import { useProductAttributesByCategoryId } from '@/hooks/useProductAttributesByCategoryId'
import { useProductSearchByCondition } from '@/hooks/useProductSearchByCondition'

type Props = {category: Category}

type SortKey = 'newest' | 'price-asc' | 'price-desc'

const parsePrice = (price: string | undefined): number => {
	if (!price) return 0
	const n = Number(price.replace(/[^\d.]/g, ''))
	return Number.isFinite(n) ? n : 0
}

export default function CategoryPageClient({ category }: Props) {
	const { filters } = useProductAttributesByCategoryId(category.id)
	const [selectedFilters, setSelectedFilters] = useState<any>({})
	const [priceRange, setPriceRange] = useState<string | undefined>()
	const [sortKey, setSortKey] = useState<SortKey>('newest')
	const [view, setView] = useState<'grid' | 'list'>('grid')


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

	// Client-side sort (cheap; products list is paginated).
	// ponytail: when getProductsByConditions gains `sort` param, wire through here.
	const sortedProducts = useMemo(() => {
		if (sortKey === 'newest') return products
		const copy = [...products]
		if (sortKey === 'price-asc') {
			copy.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
		} else {
			copy.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
		}
		return copy
	}, [products, sortKey])

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
		<div className="craft-grain bg-craft-cream">
			<div className="container mx-auto space-y-8 px-4 py-6 sm:py-10">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="flex items-center gap-x-2">
								<House className="h-4 w-4"/> Trang chủ
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator/>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/category/${category.url}`}>{category.name}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<header className="grid gap-5 border-y border-craft-line py-8 lg:grid-cols-[1fr_auto] lg:items-end">
					<div>
						<p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-craft-copper">Bộ sưu tập</p>
						<h1 className="font-display text-4xl font-medium text-craft-ink sm:text-6xl">{category.name}</h1>
					</div>
					{category.description ? (
						<p className="max-w-xl text-sm leading-7 text-stone-600 sm:text-base">{category.description}</p>
					) : (
						<p className="max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
							Khám phá các mẫu {category.name.toLowerCase()} bằng gỗ tự nhiên, với thông tin và hình ảnh thực tế từ xưởng.
						</p>
					)}
				</header>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<aside className="hidden space-y-6 border-r border-craft-line pr-6 md:col-span-1 md:block">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-craft-copper">Lọc sản phẩm</p>
						<FilterSidebar filters={filters} onApply={onApply}/>
					</aside>

					<div className="space-y-6 md:col-span-3">
						<div className="flex flex-wrap items-center justify-between gap-3 border-b border-craft-line pb-4">
							<p className="text-sm text-muted-foreground">
								{isLoading && totalCount === null ? (
									'Đang tải sản phẩm...'
								) : (
									<><span className="font-bold text-craft-ink">{totalCount ?? products.length}</span> sản phẩm</>
								)}
							</p>

							<div className="flex items-center gap-2">
								<label className="flex items-center gap-2 text-xs font-semibold text-stone-700">
									<ArrowUpDown className="size-4" aria-hidden="true"/>
									<span className="sr-only sm:not-sr-only">Sắp xếp</span>
									<select
										value={sortKey}
										onChange={(e) => setSortKey(e.target.value as SortKey)}
										className="min-h-11 border border-craft-line bg-craft-paper px-3 text-sm font-semibold text-craft-ink focus:outline-none focus:ring-2 focus:ring-craft-copper"
									>
										<option value="newest">Mới nhất</option>
										<option value="price-asc">Giá tăng dần</option>
										<option value="price-desc">Giá giảm dần</option>
									</select>
								</label>

								<div role="group" aria-label="Kiểu hiển thị" className="hidden border border-craft-line sm:flex">
									<button
										type="button"
										onClick={() => setView('grid')}
										aria-pressed={view === 'grid'}
										aria-label="Hiển thị dạng lưới"
										className={`inline-flex min-h-11 items-center justify-center px-3 ${view === 'grid' ? 'bg-craft-ink text-white' : 'text-craft-ink hover:bg-craft-paper'}`}
									>
										<LayoutGrid className="size-4" aria-hidden="true"/>
									</button>
									<button
										type="button"
										onClick={() => setView('list')}
										aria-pressed={view === 'list'}
										aria-label="Hiển thị dạng danh sách"
										className={`inline-flex min-h-11 items-center justify-center border-l border-craft-line px-3 ${view === 'list' ? 'bg-craft-ink text-white' : 'text-craft-ink hover:bg-craft-paper'}`}
									>
										<List className="size-4" aria-hidden="true"/>
									</button>
								</div>

								<div className="md:hidden">
									<Sheet>
										<SheetTrigger asChild>
											<button className="inline-flex min-h-11 items-center gap-2 border border-craft-line px-4 text-sm font-semibold text-craft-ink">
												<Filter className="size-4" aria-hidden="true"/>
												Bộ lọc
											</button>
										</SheetTrigger>
										<SheetContent side="bottom" className="bg-craft-paper pb-16">
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
						</div>

						{view === 'grid' ? (
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{sortedProducts.map(p => (
									<Link href={`/product/${p.url}`} key={p.id}>
										<ProductCard product={p} tags={p.tags}/>
									</Link>
								))}
								{isLoading && Array.from({ length: 12 }).map((_, idx) => (
									<ProductCardSkeleton key={`skel-${idx}`}/>
								))}
							</div>
						) : (
							<ul className="divide-y divide-craft-line border-y border-craft-line">
								{sortedProducts.map(p => (
									<li key={p.id}>
										<Link href={`/product/${p.url}`} className="flex gap-5 py-5 transition-colors hover:bg-craft-paper/50">
											<div className="relative aspect-square w-32 flex-none overflow-hidden bg-craft-paper sm:w-40">
												<img src={p.defaultImage} alt={p.name} className="h-full w-full object-cover" loading="lazy"/>
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="font-display text-lg text-craft-ink sm:text-xl">{p.name}</h3>
												<p className="mt-1 text-base font-bold text-craft-copper">{p.price}</p>
												{p.tags?.length ? (
													<p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{p.tags.slice(0, 3).join(' · ')}</p>
												) : null}
											</div>
										</Link>
									</li>
								))}
								{isLoading && Array.from({ length: 6 }).map((_, idx) => (
									<li key={`skel-${idx}`} className="py-5">
										<div className="flex gap-5">
											<div className="aspect-square w-32 flex-none animate-pulse bg-craft-paper sm:w-40"/>
											<div className="flex-1 space-y-2">
												<div className="h-5 w-2/3 animate-pulse bg-craft-paper"/>
												<div className="h-4 w-1/3 animate-pulse bg-craft-paper"/>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}

						{products.length < (totalCount ?? 0) && (
							<div ref={bottomRef} className="h-1"></div>
						)}

						{isError && hasMore && <div className="border border-red-200 bg-red-50 p-4 text-center text-red-700">Không tải được sản phẩm.</div>}
					</div>
				</div>
			</div>
		</div>
	)
}
