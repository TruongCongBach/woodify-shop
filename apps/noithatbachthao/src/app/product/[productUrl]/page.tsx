import { getImagesFromMedia } from '@/utils/get-images-from-media'
import { getProductByUrl } from '@/services/product/get-product-by-url'
import ProductPage from '@/containers/product-page'

type Props = {
	params: Promise<{ productUrl: string | string[] }>;
}

export default async (props: Props) => {
	const { productUrl } = await props.params;
	const slug = Array.isArray(productUrl)
		? productUrl[productUrl.length - 1]
		: productUrl || '';

	const product = await getProductByUrl(slug)

	return <ProductPage product={product} />
}

export async function generateMetadata(props: Props) {
	const { productUrl } = await props.params;
	const slug = Array.isArray(productUrl)
		? productUrl[productUrl.length - 1]
		: productUrl || '';

	const product = await getProductByUrl(slug)

	if (!product) {
		return {
			title: 'Sản phẩm không tồn tại | Nội Thất Gia Đình',
			description: 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.',
		}
	}

	const { name, description, media } = product

	return {
		title: `${name} | Nội Thất Gia Đình`,
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
