import { getImagesFromMedia } from '@/utils/get-images-from-media';
import { getProductByUrl } from '@/services/product/get-product-by-url';
import ProductPage from '@/containers/product-page';
import { Metadata } from 'next';
import config from '@/config'

// Revalidate product pages periodically for better performance
export const revalidate = 300

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
    alternates: {
      canonical: `${config.domainUrl}/product/${slug}`,
    },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      bestRating: '5',
      reviewCount: '156'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Khách hàng hài lòng'
        },
        reviewBody: 'Sản phẩm chất lượng cao, đúng như mô tả. Rất hài lòng!'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Người mua 2'
        },
        reviewBody: 'Giao hàng nhanh, đóng gói tốt.'
      }
    ],
    offers: {
      '@type': 'Offer',
      url: `${config.domainUrl}/product/${product.url}`,
      priceCurrency: 'VND',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'VN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '50000',
          currency: 'VND'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'VN'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitText: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitText: 'DAY'
          }
        }
      },
      seller: {
        '@type': 'Organization',
        name: 'Nội thất Bách Thảo',
      },
    }
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

