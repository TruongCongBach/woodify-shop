// packages/ui/src/components/ProductGrid.tsx
'use client';
import React from 'react';
import { ProductCard } from './product-card';

export const ProductGrid = ({
	products,
	columns = 4
}: {
	products: Product[];
	columns?: number;
}) => (
	<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
		{products.map((p) => (
			<ProductCard key={p.id} product={p} />
		))}
	</div>
);
