// packages/ui/src/components/ProductSection.tsx
'use client'

import React from 'react'
import { ProductCard } from './product-card'
import Link from 'next/link'

export interface ProductSectionProps {
	title: string
	products: Product[]
	viewAllHref?: string
}

export const ProductSection = ({
	title,
	products,
	viewAllHref
}: ProductSectionProps) => {



	return (
		<section className="py-12 max-w-7xl mx-auto px-4 mb-0">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">{title}</h2>
				{viewAllHref && (
					<a
						className="text-primary hover:underline"
						href={viewAllHref}
					>
						Xem tất cả
					</a>
				)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{products.map((p) => (
					<Link href={`/product/${p.url}`} key={p.id}>
						<ProductCard product={p} />
					</Link>
				))}
			</div>
		</section>
	)
}
