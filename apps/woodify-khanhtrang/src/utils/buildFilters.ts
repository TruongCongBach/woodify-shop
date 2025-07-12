import { Product } from "@/data/productsMock"

export type FilterOption = { label: string; value: string }
export type Filter = {
	key: string       // 'size', 'material', 'price', …
	label: string     // tiêu đề hiển thị
	type: 'multi' | 'range'
	options: FilterOption[]
}

export function buildFilters(products: Product[]): Filter[] {
	const priceRanges = [
		{ label: 'Dưới 5 triệu', value: '<5000000' },
		{ label: '5 – 10 triệu', value: '5000000-10000000' },
		{ label: 'Trên 10 triệu', value: '>10000000' }
	]

	const attributeMap = new Map<string, Set<string>>()

	products.forEach(p => {
		p.attributes?.forEach(attr => {
			if (!attributeMap.has(attr.key)) {
				attributeMap.set(attr.key, new Set())
			}
			attributeMap.get(attr.key)!.add(attr.value)
		})
	})

	const attributeFilters: Filter[] = []
	attributeMap.forEach((values, key) => {
		const options = Array.from(values).map(v => ({ label: v, value: v }))
		attributeFilters.push({
			key,
			label: key[0].toUpperCase() + key.slice(1),
			type: 'multi',
			options
		})
	})

	return [
		{ key: 'price', label: 'Khoảng giá', type: 'range', options: priceRanges },
		...attributeFilters
	]
}
