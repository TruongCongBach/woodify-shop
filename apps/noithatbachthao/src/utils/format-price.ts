export function formatPrice(value: string | number): string {
	const formatted = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		maximumFractionDigits: 0,
	}).format(Number(value))

	// Đổi dấu . sang , nếu muốn tách nghìn là dấu phẩy
	return formatted.replace(/\./g, ',')
}
