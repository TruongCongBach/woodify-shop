import { notFound } from 'next/navigation'
import { categoriesMock } from '@/data/categoriesMock'
import CategoryPageClient from '@/app/category/[categoryUrl]/page.client'
import { Metadata } from 'next'

type Props = {
	params: Promise<{ categoryUrl: string | string[] }>;
}

export default async function CategoryPage(props: Props) {
	const { categoryUrl } = await props.params;
	const slug = Array.isArray(categoryUrl)
		? categoryUrl[categoryUrl.length - 1]
		: categoryUrl || '';

	const category = categoriesMock.find(c => c.url === slug)

	if (!category) {
		notFound()
	}

	return <CategoryPageClient category={category}/>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { categoryUrl } = await props.params
	const slug = Array.isArray(categoryUrl)
		? categoryUrl[categoryUrl.length - 1]
		: categoryUrl || ''

	const category = categoriesMock.find(c => c.url === slug)
	if (!category) notFound()

	const title = `${category.name} – Woodify`
	const description = `Xem các mẫu ${category.name} chất lượng dành cho đồ gỗ tại Woodify.`

	const image = category.image
	const imageUrl = category.image.startsWith('http')
		? category.image
		: `/images/${category.image}`

	// Tạo schema JSON-LD dạng BreadcrumbList
	const breadcrumb = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': [
			{ '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${process.env.BASE_URL || 'https://woodify.com'}/` },
			{ '@type': 'ListItem', position: 2, name: category.name, item: `${process.env.BASE_URL || 'https://woodify.com'}/category/${slug}` },
		],
	}
	return {
		title,
		description,
		alternates: { canonical: `/category/${slug}` },
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-video-preview': -1
			}
		},
		openGraph: {
			title,
			description,
			url: `/category/${slug}`,
			siteName: 'Woodify',
			images: [{ url: imageUrl, alt: category.name, width: 1200, height: 630 }],
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: image ? [image] : []
		},
		other: {
			'application/ld+json': JSON.stringify(breadcrumb),
		},
	}
}
