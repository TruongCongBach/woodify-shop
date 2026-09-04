// Contact-only model: every product is orderable by default.
// Tags-based opt-out for explicit stock states.
export function getAvailability(product: Product): 'InStock' | 'OutOfStock' | 'PreOrder' {
	const tags = (product.tags ?? []).map((t) => t.toLowerCase())
	if (tags.some((t) => t.includes('het-hang') || t.includes('out-of-stock'))) {
		return 'OutOfStock'
	}
	if (tags.some((t) => t.includes('pre-order') || t.includes('dat-truoc'))) {
		return 'PreOrder'
	}
	return 'InStock'
}
