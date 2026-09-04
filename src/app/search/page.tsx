import { Metadata } from 'next'
import { searchProductsForChatbot } from '@/services/chatbot/product-service'
import { transformProductToFormData } from '@/utils'
import SearchPageClient from '@/containers/search-page'
import { buildSearchResultsJsonLd } from '@/seo/jsonld'
import config from '@/config'

export const revalidate = 300

type Props = {
	searchParams: Promise<{ q?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { q } = await props.searchParams
	const query = (q ?? '').trim()
	return {
		title: query ? `Tìm kiếm: ${query}` : 'Tìm kiếm sản phẩm',
		description: query
			? `Kết quả tìm kiếm cho “${query}” tại Nội thất Bách Thảo.`
			: 'Tìm kiếm sản phẩm đồ gỗ tự nhiên tại Nội thất Bách Thảo.',
		alternates: {
			canonical: `${config.domainUrl}/search${query ? `?q=${encodeURIComponent(query)}` : ''}`,
		},
		robots: {
			index: false,
			follow: true,
		},
	}
}

export default async function SearchPage(props: Props) {
	const { q } = await props.searchParams
	const query = (q ?? '').trim()
	const rawResults = query ? await searchProductsForChatbot(query) : []
	const results = rawResults.map((p) => transformProductToFormData(p))

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': query ? [buildSearchResultsJsonLd(query, results.length)] : [],
	}

	return (
		<>
			{query ? (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			) : null}
			<SearchPageClient query={query} results={results} />
		</>
	)
}
