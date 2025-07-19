export async function getProducts(): Promise<Product[]> {
	const res = await fetch(`http://localhost:3000/api/products`, {
		next: { revalidate: 3600 },
		cache: 'force-cache',
	})
	if (!res.ok) throw new Error('Failed to fetch products')
	return res.json()
}
