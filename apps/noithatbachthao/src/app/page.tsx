import React from 'react'
import { Metadata } from 'next'
import { transformProductToFormData, formatPrice } from '@/utils'
import { getProductsByUrls } from '@/services'
import config from '@/config'
import SectionProductGallery from '@/containers/home-page/section-product-gallery'
import SectionHeroGallery from '@/containers/home-page/section-hero-gallery'
import SectionFeatures from '@/containers/home-page/section-features'
import SectionProducts from '@/containers/home-page/section-products'

// ===== CACHING CONFIGURATION =====
export const revalidate = 60 // API_CONFIG.CACHE.REVALIDATE_TIME - Next.js needs static value

// Hoặc dùng dynamic rendering nếu muốn luôn fresh data
// export const dynamic = 'force-dynamic'

// ===== GIẢI QUYẾT VẤN ĐỀ 2: SEO METADATA =====
export const metadata: Metadata = {
	title: 'Kệ Tivi Gỗ & Đồ Gỗ Nội Thất Cao Cấp | Nội Thất Bách Thảo',
	description: 'Chuyên cung cấp nội thất gỗ cao cấp handmade. Kệ tivi, sofa, bàn ghế được chế tác tỉ mỉ từ gỗ tự nhiên. Giao hàng toàn quốc.',
	keywords: 'Kệ tivi gỗ hương đá, kệ tivi gỗ xoan, nội thất bách thảo, nội thất gỗ cao cấp, sofa gỗ handmade, bàn ghế gỗ tự nhiên, nội thất hiện đại, nội thất tối giản, nội thất cổ điển, nội thất vintage',
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
				url: '/images/og-image.jpg', // Tạo ảnh OG cho website
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
		images: ['/images/og-image.jpg'],
	},
	alternates: {
		canonical: config.domainUrl, // Thay bằng domain thật
	},
	other: {
		'google-site-verification': config.googleSiteVerification, // Thêm Google verification
	},
}

// JSON-LD Schema cho SEO
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Nội thất Bách Thảo',
	description: 'Chuyên cung cấp nội thất gỗ cao cấp',
	url: config.domainUrl,
	logo: `${config.domainUrl}/logo-full-white.png`, // Thay bằng đường dẫn logo thật
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+84-347-373-891',
		contactType: 'customer service',
		availableLanguage: 'Vietnamese',
	},
	sameAs: [
		'https://www.facebook.com/profile.php?id=61572613597186',
	],
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Nội thất gỗ cao cấp',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Offer',
					name: 'Kệ Tivi Gỗ Cao Cấp',
					category: 'Furniture',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Offer',
					name: 'Sofa Gỗ Cao Cấp',
					category: 'Furniture',
				},
			},
		],
	},
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
				originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : 0,
				image: product.defaultImage,
				category: category,
				badges: product.tags,
				rating: Math.round((Math.random() * 1.5 + 4) * 10) / 10,
				views: `${Math.floor(Math.random() * (9999 - 100 + 1)) + 100}k`,
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

			<div className="min-h-screen bg-white">
				{/* Hero Gallery Section */}
				<SectionHeroGallery/>

				{/* Product Gallery Section */}
				<SectionProductGallery products={productKeTivi}/>

				{/* Featured Products Section - Lazy Loaded */}
				<SectionProducts/>

				{/* Features */}
				<SectionFeatures/>

			</div>
		</>
	)
}
