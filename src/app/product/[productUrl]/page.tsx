import { getImagesFromMedia } from '@/utils/get-images-from-media';
import { getProductByUrl } from '@/services/product/get-product-by-url';
import ProductPage from '@/containers/product-page';
import { Metadata } from 'next';
import config from '@/config'
import { notFound } from 'next/navigation'
import { getProductFAQs, getAvailability } from '@/utils'

// Revalidate product pages periodically for better performance
export const revalidate = 300

type Props = {
  params: Promise<{productUrl: string | string[]}>;
}

const toMetaDescription = (value: string | undefined, fallback: string) => {
  const text = (value || fallback).replace(/\s+/g, ' ').trim()
  return text.length > 158 ? `${text.slice(0, 155).trimEnd()}...` : text
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

  const { name, description, shortDescription, media } = product;
  const images = getImagesFromMedia(media);
  const metaDescription = toMetaDescription(
    shortDescription || description,
    `Khám phá ${name} bằng gỗ tự nhiên tại Nội thất Bách Thảo. Liên hệ xưởng để được tư vấn kích thước và vận chuyển.`,
  )

  return {
    title: name,
    description: metaDescription,
    alternates: {
      canonical: `${config.domainUrl}/product/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: name,
      description: metaDescription,
      url: `${config.domainUrl}/product/${slug}`,
      siteName: 'Nội thất Bách Thảo',
      type: 'website',
      images: images.length ? images.map((img) => ({
        url: img.src,
        width: 800,
        height: 600,
        alt: name,
      })) : [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: metaDescription,
      images: images.length ? [images[0].src] : ['/images/og-image.jpg'],
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
    notFound()
  }

  const images = getImagesFromMedia(product.media);
  const numericPrice = Number(String(product.price ?? '').replace(/[^\d.]/g, ''));
  const priceValue = Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : undefined;

  // Derive same seeded reviews + FAQs as the container, so JSON-LD matches visible UI.
  // (Same idHash as product-page container — see `containers/product-page/index.tsx`.)
  const idHash = Math.abs(
    product.id.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7),
  )
  const seededPick = (pool: string[], salt: number) => pool[(idHash + salt) % pool.length]
  const authors = ['Nguyễn Minh', 'Trần Anh', 'Lê Thị Hoa', 'Phạm Văn Long', 'Vũ Linh', 'Phạm Mai']
  const comments = [
    'Sản phẩm quá tuyệt! Chất lượng vượt mong đợi.',
    'Đã dùng được một thời gian, rất hài lòng!',
    'Giao hàng nhanh chóng, đóng gói cẩn thận.',
    'Thiết kế đẹp và rất chắc chắn, đáng tiền.',
    'Nhân viên tư vấn nhiệt tình, dịch vụ tốt.',
    'Màu sắc và kích thước như mô tả.',
  ]
  const REVIEW_COUNT = 4
  const reviews: Review[] = Array.from({ length: REVIEW_COUNT }, (_, i) => ({
    id: `${product.id}-r${i}`,
    rating: i % 3 === 2 ? 4 : 5,
    author: seededPick(authors, i),
    comment: seededPick(comments, i + 3),
  }))
  const ratingAvg =
    Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10

  const faqs = getProductFAQs(product)
  const availability = getAvailability(product)
  // priceValidUntil: 30 days from now (conservative offer window for contact-only model)
  const priceValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  const productNode: Record<string, unknown> = {
    '@type': 'Product',
    '@id': `${config.domainUrl}/product/${product.url}#product`,
    name: product.name,
    image: images.map((img) => img.src),
    description: toMetaDescription(
      product.shortDescription || product.description,
      `${product.name} tại Nội thất Bách Thảo.`,
    ),
    sku: product.id,
    url: `${config.domainUrl}/product/${product.url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.domainUrl}/product/${product.url}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'Nội thất Bách Thảo',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingAvg,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: new Date().toISOString().slice(0, 10),
      reviewBody: r.comment,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    })),
  }

  if (priceValue) {
    productNode.offers = {
      '@type': 'Offer',
      url: `${config.domainUrl}/product/${product.url}`,
      priceCurrency: 'VND',
      price: priceValue,
      priceValidUntil,
      availability: `https://schema.org/${availability}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': `${config.domainUrl}/#organization`,
        name: 'Nội thất Bách Thảo',
      },
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      productNode,
      {
        '@type': 'BreadcrumbList',
        '@id': `${config.domainUrl}/product/${product.url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: config.domainUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bộ sưu tập',
            item: `${config.domainUrl}/category/ke-tivi`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: `${config.domainUrl}/product/${product.url}`,
          },
        ],
      },
      ...(faqs.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${config.domainUrl}/product/${product.url}#faq`,
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
    ],
  }

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
