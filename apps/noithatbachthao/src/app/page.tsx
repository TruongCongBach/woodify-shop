import React from 'react'
import { transformProductToFormData } from '@/utils/transform-product-to-form-data'
import SectionProductGallery from '@woodify/ui/components/section-product-gallery'
import SectionHeroGallery from '@woodify/ui/components/section-hero-gallery'
import SectionFeatures from '@woodify/ui/components/section-features'
import { getProductsByUrls } from '@/services/product/get-product-by-urls'

export default async function Home() {

	const productKeTivi = await getProductsByUrls(['ke-tivi-sung-13', 'ke-tivi-hoa-hong-11', 'mo-loi-huong-da-9', 'mo-lom-huong-da-5', 'sofa-phang-xoan-0', 'sofa-phang-huong-da-1']).then((productsDataBase) => {
		return productsDataBase.map((productRaw) => {
			const product = transformProductToFormData(productRaw)
			return {
				id: product.id,
				name: product.name,
				price: product.price,
				originalPrice: '7,000,000',
				image: product.defaultImage,
				category: 'luxury',
				badges: product.tags,
				rating: Math.round((Math.random() * 1.5 + 4) * 10) / 10,
				views:  `${Math.floor(Math.random() * (9999 - 100 + 1)) + 100}k`,
				url: product.url,
			}
		})
	})

	return (
		<>
			<div className="min-h-screen bg-white">
				{/* Hero Gallery Section */}
				<SectionHeroGallery/>

				{/* Product Gallery Section */}
				<SectionProductGallery products={productKeTivi}/>

				{/* Features */}
				<SectionFeatures/>

			</div>
		</>
	)
}
