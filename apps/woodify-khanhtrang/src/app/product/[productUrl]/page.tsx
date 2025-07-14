// apps/woodify-khanhtrang/src/app/product/[productId]/page.tsx
import ProductPageClient from './page.client'
import productsMock from '../../../data/productsMock'
import PRODUCTS from '@/data/products'


export default function ProductPage() {
	return <ProductPageClient/>
}

type Props = {
	params: Promise<{ productUrl: string | string[] }>;
}

export async function generateMetadata(props: Props) {
	const { productUrl } = await props.params;
	const slug = Array.isArray(productUrl)
		? productUrl[productUrl.length - 1]
		: productUrl || '';
	const product = PRODUCTS.find(p => p.url === slug)

	if (!product) {
		return {
			title: 'Sản phẩm không tồn tại | Woodify',
			description: 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.',
		}
	}

	const { name, description, images } = product

	return {
		title: `${name} | Woodify`,
		description,
		openGraph: {
			title: name,
			description,
			type: 'website',
			images: images.map((src:string) => ({
				url: src,
				width: 800,
				height: 600,
				alt: name,
			})),
		},
		twitter: {
			card: 'summary_large_image',
			title: name,
			description,
			images,
		},
	}
}
