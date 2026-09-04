import { fetchProducts } from '@/services/product'
import { fetchNavCategoriesWithChildren } from '@/services/category/fetch-nav-categories-with-children'
import config from '@/config'

export const revalidate = 3600
export const dynamic = 'force-static'

function clean(text: string): string {
	return text.replace(/\s+/g, ' ').trim()
}

function firstSentence(text: string): string {
	const t = clean(text)
	const i = t.indexOf('.')
	return t.slice(0, i === -1 ? t.length : i + 1)
}

export async function GET() {
	const [products, categories] = await Promise.all([
		fetchProducts().catch(() => []),
		fetchNavCategoriesWithChildren().catch(() => []),
	])

	const lines: string[] = []
	lines.push('# Nội thất Bách Thảo — Catalog đầy đủ')
	lines.push('')
	lines.push('Xưởng nội thất gỗ tự nhiên tại Thư Lâm, Hà Nội. Hoàn thiện tại xưởng bởi thợ mộc lành nghề. Đây là danh mục sản phẩm đầy đủ, tái sinh từ dữ liệu trực tiếp của website.')
	lines.push('')
	lines.push('## Thông tin liên hệ')
	lines.push('- Điện thoại: +84 347 373 891')
	lines.push(`- Website: ${config.domainUrl}`)
	lines.push('- Địa điểm: Xã Thư Lâm, Hà Nội, Việt Nam')
	lines.push('')
	lines.push('## Danh mục')
	lines.push('')
	for (const c of categories) {
		const kids = c.children?.length
			? ` (${c.children.map((k) => k.name).join(', ')})`
			: ''
		lines.push(`- ${c.name}${kids}: ${config.domainUrl}/category/${c.url}`)
	}
	lines.push('')
	lines.push('## Sản phẩm')
	lines.push('')
	const PROD_CAP = 500
	for (const p of products.slice(0, PROD_CAP)) {
		const desc = p.description
			? firstSentence(p.description)
			: p.shortDescription
				? firstSentence(p.shortDescription)
				: ''
		lines.push(`### ${p.name}`)
		lines.push(`URL: ${config.domainUrl}/product/${p.url}`)
		if (p.price) lines.push(`Giá: ${p.price} VND`)
		if (desc) lines.push(desc)
		lines.push('')
	}

	const body = lines.join('\n').trim()
	return new Response(`${body}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
		},
	})
}
