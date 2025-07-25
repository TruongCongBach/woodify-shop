export type FilterOption = { label: string; value: string }
export type Filter = {
	key: string       // 'size', 'material', 'price', …
	label: string     // tiêu đề hiển thị
	type: 'multi' | 'range'
	options: FilterOption[]
}

/**
 * Xây bộ lọc từ dữ liệu attribute { key, value } theo từng category
 *
 * @param attrs  - Giả sử data kiểu: Array<{ key: string, value: string }>
 * @returns Filter[]
 */
export function buildFiltersFromAttributes(
	attrs: Array<{ key: string; value: string }>
): Filter[] {
	// Tạo map: key -> set giá trị không trùng
	const attributeMap = new Map<string, Set<string>>()
	attrs.forEach(({ key, value }) => {
		if (!attributeMap.has(key)) {
			attributeMap.set(key, new Set())
		}
		attributeMap.get(key)!.add(value)
	})

	// Chuyển map thành Filter[]
	const attributeFilters: Filter[] = []
	attributeMap.forEach((values, key) => {
		const options: FilterOption[] = Array.from(values).map(v => ({
			label: v,
			value: v,
		}))

		attributeFilters.push({
			key,
			label: key.charAt(0).toUpperCase() + key.slice(1),
			type: 'multi',
			options,
		})
	})

	// Thêm bộ lọc giá (range) luôn có
	const priceRanges: FilterOption[] = [
		{ label: 'Dưới 5 triệu', value: '<5000000' },
		{ label: '5 – 10 triệu', value: '5000000-10000000' },
		{ label: 'Trên 10 triệu', value: '>10000000' },
	]

	return [
		{ key: 'price', label: 'Khoảng giá', type: 'range', options: priceRanges },
		...attributeFilters,
	]
}
