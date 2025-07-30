import { getImagesFromMedia } from '@/utils/get-images-from-media';
import { getProductByUrl } from '@/services/product/get-product-by-url';
import ProductPage from '@/containers/product-page';
import { Metadata } from 'next';

type Props = {
  params: Promise<{productUrl: string | string[]}>;
}

// Generate metadata for the page
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { productUrl } = await props.params
  const slug = Array.isArray(productUrl)
    ? productUrl[productUrl.length - 1]
    : productUrl || ''
  const product = await getProductByUrl(slug);

  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại',
      description: 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.',
    };
  }

  const { name, description, media } = product;
  const images = getImagesFromMedia(media);

  return {
    title: name, // The template in layout.tsx will add "| Nội thất Bách Thảo"
    description: description || `Mua ngay ${name} chất lượng cao, giá tốt tại Nội thất Bách Thảo.`,
    openGraph: {
      title: name,
      description: description || `Mua ngay ${name} chất lượng cao, giá tốt tại Nội thất Bách Thảo.`,
      type: 'website',
      images: images.length ? images.map((img) => ({
        url: img.src,
        width: 800,
        height: 600,
        alt: name,
      })) : ['/og-image.png'], // Fallback image
    },
  };
}

// The main page component
export default async function ProductDetailPage(props: Props) {
  const { productUrl } = await props.params;
  const slug = Array.isArray(productUrl)
    ? productUrl[productUrl.length - 1]
    : productUrl || ''
  const product = await getProductByUrl(slug);

  if (!product) {
    // Handle product not found, maybe render a not-found component
    return <div>Sản phẩm không tìm thấy</div>;
  }

  const images = getImagesFromMedia(product.media);

  // Create the JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images.map((img) => img.src),
    description: product.description,
    sku: product.id, // Assuming product ID is the SKU
    brand: {
      '@type': 'Brand',
      name: 'Nội thất Bách Thảo',
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.BASE_URL}/product/${product.url}`,
      priceCurrency: 'VND',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock', // Or 'https://schema.org/OutOfStock'
      seller: {
        '@type': 'Organization',
        name: 'Nội thất Bách Thảo',
      },
    },
    // Add reviews if you have them
    // "review": [
    //   {
    //     "@type": "Review",
    //     "reviewRating": {
    //       "@type": "Rating",
    //       "ratingValue": "4",
    //       "bestRating": "5"
    //     },
    //     "author": {
    //       "@type": "Person",
    //       "name": "Tên người đánh giá"
    //     }
    //   }
    // ]
  };

  return (
    <>
      {/* Add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPage product={product} />
    </>
  );
}

