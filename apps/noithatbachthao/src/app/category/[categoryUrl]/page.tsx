import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCategoryByUrl } from '@/services/category/get-category-by-url'
import CategoryPage from '@/containers/category-page'
import config from '@/config'
import { getDescription, getKeywords } from '@/seo'

type Props = {
	params: Promise<{categoryUrl: string | string[]}>;
}

export default async function CategoryDetailPage(props: Props){
	const { categoryUrl } = await props.params
	const slug = Array.isArray(categoryUrl)
		? categoryUrl[categoryUrl.length - 1]
		: categoryUrl || ''

	const category = await getCategoryByUrl(slug)

	if (!category) {
		notFound()
	}

	return <CategoryPage category={category}/>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { categoryUrl } = await props.params
	const slug = Array.isArray(categoryUrl)
		? categoryUrl[categoryUrl.length - 1]
		: categoryUrl || ''

	const category = await getCategoryByUrl(slug)
	if (!category) notFound()
	const title = `${category.name} – Nội Thất Bách Thảo`
	const description = getDescription(category.url)
	const keywords = getKeywords(category.url)

	const image = category.image
	const imageUrl = category.image?.startsWith('http')
		? category.image
		: `/images/${category.image}`

	// Tạo schema JSON-LD dạng BreadcrumbList
	const breadcrumb = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Trang chủ',
				item: `${config.domainUrl}/`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: category.name,
				item: `${config.domainUrl}/category/${slug}`,
			},
		],
	}
	return {
		title,
		description,
		keywords,
		alternates: { canonical: `/category/${slug}` },
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-video-preview': -1,
			},
		},
		openGraph: {
			title,
			description,
			url: `/category/${slug}`,
			siteName: 'Nội Thất Bách Thảo',
			images: [{ url: imageUrl, alt: category.name, width: 1200, height: 630 }],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: image ? [image] : [],
		},
		other: {
			'application/ld+json': JSON.stringify(breadcrumb),
		},
	}
}
