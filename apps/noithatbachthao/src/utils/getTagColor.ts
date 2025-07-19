export function getTagColor(label: string): string {
	switch (label.toLowerCase()) {
		case 'mới':
		case 'new':
			return 'bg-red-500'
		case 'giảm giá':
		case 'sale':
			return 'bg-yellow-500'
		case 'freeship':
			return 'bg-green-500'
		default:
			return 'bg-gray-400'
	}
}
