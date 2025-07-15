'use client'

import { useParams } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@woodify/ui/components/breadcrumb'
import { ProductGallery } from '@/components/product-gallery'
import { formatPrice } from '@/utils/formatPrice'
import { HomeIcon } from '@heroicons/react/24/outline'
import PRODUCTS from '@/data/products'
import { ProductSection } from '@/components/product-section'
import { ProductReview } from '@/components/product-review'
import { generateRandomReviews } from '@/utils/generateRandomReviews'
import dynamic from 'next/dynamic'

// Dynamic import để chỉ render ở client
const ARTester = dynamic(() => import('@/components/product-arview'), { ssr: false });

export default function ProductPageClient() {
	const { productUrl } = useParams() as {productUrl: string}
	const product = PRODUCTS.find(p => p.url === productUrl)

	if (!product) {
		return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold">Sản phẩm không tồn
			tại.</div>
	}

	const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.categoryId === product.categoryId)


	return (
		<div className="bg-gray-100/70">
			<div className="container mx-auto px-4 py-8 space-y-12 bg-gray-100/70">
				{/* Breadcrumb */}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="flex gap-x-2 items-center">
								<HomeIcon className="h-4 w-4"/>Home
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator/>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/product/${product.url}`}>{product.name}</BreadcrumbLink>
						</BreadcrumbItem>

					</BreadcrumbList>
				</Breadcrumb>

				{/* Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<ProductGallery media={product.media}/>
					<div className="space-y-5">
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-2xl text-red-600 font-semibold">{formatPrice(product.price)}</p>
						{product?.shortDescription &&
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product?.shortDescription }}/>}
					</div>
					<ARTester/>
				</div>

				{/* Description */}
				<div className="border-t pt-6">
					<h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
					<div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }}/>
				</div>

				{/* Reviews */}
				<ProductReview reviews={generateRandomReviews(5)}/>

				{/* Related products */}
				{relatedProducts.length > 0 && (
					<div>
						<ProductSection
							title="Sản phẩm liên quan"
							products={relatedProducts}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
