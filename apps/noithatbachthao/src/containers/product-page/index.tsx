import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@woodify/ui/shadcn-ui/breadcrumb'
import { ProductGallery } from '@/components/product-gallery'
import { formatPrice } from '@/utils/format-price'
import { HomeIcon } from 'lucide-react'
import PRODUCTS from '@/data/products'
import { ProductSection } from '@/components/product-section'
import { ProductReview } from './product-review'
import { generateRandomReviews } from '@/utils/generate-random-reviews'
import ProductRelated from '@/containers/product-page/product-related'

type Props = {
	product?: any

}
export default async function ProductPage(props: Props) {
	const { product } = props

	if (!product) {
		return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold">Sản phẩm không tồn
			tại.</div>
	}

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
				</div>

				{/* Description */}
				<div className="border-t pt-6">
					<h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
					<div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }}/>
				</div>

				{/* Reviews */}
				<ProductReview reviews={generateRandomReviews(5)}/>

				{/* Related products */}
				<ProductRelated product={product}/>
			</div>
		</div>
	)
}
