import config from '@/config'

const ORG_ID = `${config.domainUrl}/#organization`
const SITE_ID = `${config.domainUrl}/#website`

type JsonLdNode = Record<string, unknown>

export function buildOrganizationJsonLd(): JsonLdNode {
	return {
		'@type': ['Organization', 'FurnitureStore'],
		'@id': ORG_ID,
		name: 'Nội thất Bách Thảo',
		description: 'Xưởng nội thất gỗ tự nhiên tại Thư Lâm, Hà Nội.',
		url: config.domainUrl,
		logo: `${config.domainUrl}/logo-full-black.png`,
		telephone: '+84-347-373-891',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Thư Lâm',
			addressRegion: 'Hà Nội',
			addressCountry: 'VN',
		},
		sameAs: ['https://www.facebook.com/noithatmynghegiadinh'],
	}
}

export function buildWebsiteJsonLd(): JsonLdNode {
	return {
		'@type': 'WebSite',
		'@id': SITE_ID,
		url: config.domainUrl,
		name: 'Nội thất Bách Thảo',
		inLanguage: 'vi-VN',
		publisher: { '@id': ORG_ID },
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${config.domainUrl}/search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	}
}

export function buildBreadcrumbJsonLd(
	items: Array<{ name: string; url: string }>,
): JsonLdNode {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: it.name,
			item: it.url,
		})),
	}
}

export function buildCategoryJsonLd(category: Category): JsonLdNode {
	return {
		'@type': 'CollectionPage',
		'@id': `${config.domainUrl}/category/${category.url}#collection`,
		url: `${config.domainUrl}/category/${category.url}`,
		name: category.name,
		description:
			category.description ||
			`Khám phá các mẫu ${category.name.toLowerCase()} bằng gỗ tự nhiên tại Nội thất Bách Thảo.`,
		isPartOf: { '@id': SITE_ID },
		publisher: { '@id': ORG_ID },
	}
}

export function buildSearchResultsJsonLd(
	query: string,
	resultCount: number,
): JsonLdNode {
	return {
		'@type': 'SearchResultsPage',
		url: `${config.domainUrl}/search?q=${encodeURIComponent(query)}`,
		name: `Kết quả tìm kiếm: ${query}`,
		isPartOf: { '@id': SITE_ID },
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: resultCount,
		},
	}
}

export const SEO_IDS = { ORG_ID, SITE_ID }
