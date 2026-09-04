import React from 'react'
import { Metadata } from 'next'
import { transformProductToFormData, formatPrice } from '@/utils'
import { getProductsByUrls } from '@/services'
import config from '@/config'
import SectionProductGallery from '@/containers/home-page/section-product-gallery'
import SectionHeroGallery from '@/containers/home-page/section-hero-gallery'
import SectionFeatures from '@/containers/home-page/section-features'

// ===== CACHING CONFIGURATION =====
export const revalidate = 60 // API_CONFIG.CACHE.REVALIDATE_TIME - Next.js needs static value

// Hoặc dùng dynamic rendering nếu muốn luôn fresh data
// export const dynamic = 'force-dynamic'

// ===== GIẢI QUYẾT VẤN ĐỀ 2: SEO METADATA =====
export const metadata: Metadata = {
	title: {
		absolute: 'Kệ tivi & đồ gỗ tự nhiên | Nội thất Bách Thảo',
	},
	description: 'Khám phá kệ tivi, sofa và đồ gỗ tự nhiên được tuyển chọn, hoàn thiện tại xưởng Nội thất Bách Thảo ở Thư Lâm, Hà Nội.',
	authors: [{ name: 'Nội Thất Bách Thảo' }],
	creator: 'Nội Thất Bách Thảo',
	publisher: 'Nội Thất Bách Thảo',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		title: 'Nội thất Bách Thảo - Nội Thất Gỗ Cao Cấp Handmade',
		description: 'Khám phá bộ sưu tập nội thất gỗ cao cấp: kệ tivi, sofa, bàn ghế được chế tác thủ công',
		url: config.domainUrl, // Thay bằng domain thật
		siteName: 'Nội thất Bách Thảo', // Tên website
		type: 'website',
		locale: 'vi_VN',
		images: [
			{
				url: '/og-image.svg',
				width: 1200,
				height: 630,
				alt: 'Nội thất Bách Thảo - Nội thất gỗ cao cấp',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nội thất Bách Thảo - Nội Thất Gỗ Cao Cấp',
		description: 'Nội thất gỗ cao cấp - Kệ tivi, sofa, bàn ghế',
		images: ['/og-image.svg'],
	},
	alternates: {
		canonical: config.domainUrl, // Thay bằng domain thật
	},
}

// JSON-LD Schema cho SEO
const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': ['Organization', 'FurnitureStore'],
			'@id': `${config.domainUrl}/#organization`,
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
		},
		{
			'@type': 'WebSite',
			'@id': `${config.domainUrl}/#website`,
			url: config.domainUrl,
			name: 'Nội thất Bách Thảo',
			inLanguage: 'vi-VN',
			publisher: { '@id': `${config.domainUrl}/#organization` },
		},
	],
}

export default async function Home() {
	// Thêm error handling để tăng reliability
	let productKeTivi: any[] = []

	try {
		// Fetch specific products for gallery
		const productsDataBase = await getProductsByUrls([
			'ke-tivi-sung-13',
			'ke-tivi-hoa-hong-11',
			'mo-loi-huong-da-9',
			'mo-lom-huong-da-5',
			'sofa-phang-xoan-0',
			'sofa-phang-huong-da-1'
		])

		productKeTivi = productsDataBase.map((productRaw) => {
			const product = transformProductToFormData(productRaw)
			let category = 'modern'
			if (['mo-lom-huong-da-5'].includes(product.url)) category = 'minimal'
			if (['mo-loi-huong-da-9', 'ke-tivi-sung-13'].includes(product.url)) category = 'luxury'
			if (['sofa-phang-xoan-0'].includes(product.url)) category = 'modern'
			if (['ke-tivi-sung-13', 'ke-tivi-hoa-hong-11'].includes(product.url)) category = 'vintage'
			return {
				id: product.id,
				name: product.name,
				price: formatPrice(product.price),
				originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
				image: product.defaultImage,
				category: category,
				badges: product.tags,
				url: product.url,
			}
		})
	} catch (error) {
		console.error('Error fetching products:', error)
		// Fallback hoặc empty array
	}

	return (
		<>
			{/* JSON-LD Schema */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="min-h-screen bg-craft-paper">
				<SectionHeroGallery/>
				<SectionProductGallery products={productKeTivi}/>
				<SectionFeatures/>
			</div>
		</>
	)
}
