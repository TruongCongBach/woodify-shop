'use client'
import { useProductByCategoryId } from '@/hooks/useProductByCategoryId'
import { ProductSection } from '@/components/product-section'

type Props = {
	product: any
}
const ProductRelated:React.FC<Props> = ({product}) => {
	const {data: relatedProducts, isLoading} = useProductByCategoryId(product.categoryId)
	if (isLoading) {
		return <div className="container mx-auto px-4 py-8">Loading...</div>
	}
	if (!relatedProducts || relatedProducts.length === 0) {
		return null
	}
  return (<div>
		<ProductSection
			title="Sản phẩm liên quan"
			products={relatedProducts}
		/>
	</div>)
}
export default ProductRelated
