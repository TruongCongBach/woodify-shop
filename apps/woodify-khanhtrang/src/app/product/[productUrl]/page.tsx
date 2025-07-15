// apps/woodify-khanhtrang/src/app/product/[productId]/page.tsx
import ProductPageClient from './page.client'
import PRODUCTS from '@/data/products'
import { getImagesFromMedia } from '@/utils/getImagesFromMedia'


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
			title: 'Sản phẩm không tồn tại | Nội Thất Khánh Trang',
			description: 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.',
		}
	}

	const { name, description, media } = product

	return {
		title: `${name} | Nội Thất Khánh Trang`,
		description,
		openGraph: {
			title: name,
			description,
			type: 'website',
			images: getImagesFromMedia(media).map((mediaItem) => ({
				url: mediaItem.src,
				width: 800,
				height: 600,
				alt: mediaItem.src,
			})),
		},
		twitter: {
			card: 'summary_large_image',
			title: name,
			description,
			images: getImagesFromMedia(media).map(mediaItem => mediaItem.src),
		},
	}
}
