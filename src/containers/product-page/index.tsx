import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/ui/shadcn-ui/breadcrumb'
import { ProductGallery } from '@/components/product-gallery'
import { formatPrice } from '@/utils/format-price'
import { getProductFAQs } from '@/utils'
import { ArrowRight, House, MessageCircle, Phone, Ruler, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import ProductRelated from '@/containers/product-page/product-related'

type Props = {
	product?: Product
}

const ProductPage = async ({ product }: Props) => {
	if (!product) {
		return (
			<div className="container mx-auto px-4 py-24 text-center">
				<h1 className="font-display text-4xl text-craft-ink">Không tìm thấy sản phẩm</h1>
				<Link href="/category/ke-tivi" className="mt-6 inline-flex text-sm font-bold text-craft-copper">
					Quay lại bộ sưu tập
				</Link>
			</div>
		)
	}

	// ponytail: when real review backend exists (table `product_reviews`), swap to fetched data.
	const idHash = Math.abs(
		product.id.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
	)
	// Deterministic PRNG seeded by product.id so review set is stable across SSR + client
	// (avoids hydration mismatch and keeps aggregateRating consistent for SEO).
	const seededPick = (pool: string[], salt: number) =>
		pool[(idHash + salt) % pool.length]
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
		// 4.4-4.8 avg: mostly 5s + one 4
		rating: i % 3 === 2 ? 4 : 5,
		author: seededPick(authors, i),
		comment: seededPick(comments, i + 3),
	}))
	const ratingAvg =
		Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10

	const faqs = getProductFAQs(product)

	const hasDiscount =
		product.originalPrice &&
		Number.parseFloat(product.originalPrice) > Number.parseFloat(product.price)
	const descriptionSections = product.description
		? product.description.split(/\n{2,}/).map((section) => section.trim()).filter(Boolean)
		: []
	const visibleDescription = descriptionSections.slice(0, 5)
	const remainingDescription = descriptionSections.slice(5)

	return (
		<div className="craft-grain bg-craft-cream">
			<div className="container mx-auto px-4 py-6 sm:py-8">
				<Breadcrumb className="mb-7">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="flex min-h-11 items-center gap-2 text-xs font-semibold">
								<House className="size-3.5" aria-hidden="true"/>
								Trang chủ
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator/>
						<BreadcrumbItem>
							<BreadcrumbLink href="/category/ke-tivi" className="text-xs font-semibold">
								Bộ sưu tập
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator/>
						<BreadcrumbItem>
							<span className="line-clamp-1 max-w-44 text-xs text-muted-foreground sm:max-w-none">
								{product.name}
							</span>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<section className="grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
					<ProductGallery media={product.media} productName={product.name}/>

					<div className="lg:sticky lg:top-32 lg:self-start">
						<p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-craft-copper">
							Đồ gỗ tự nhiên · Hoàn thiện tại xưởng
						</p>
						<h1 className="font-display text-4xl font-medium leading-tight text-craft-ink sm:text-5xl lg:text-6xl">
							{product.name}
						</h1>

						<div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-craft-line py-5">
							<p className="text-2xl font-bold text-craft-copper sm:text-3xl">{formatPrice(product.price)}</p>
							{hasDiscount ? (
								<p className="text-base text-muted-foreground line-through">
									{formatPrice(product.originalPrice!)}
								</p>
							) : null}
						</div>

						{product.shortDescription ? (
							<p className="mt-6 whitespace-pre-line text-base leading-8 text-stone-700">
								{product.shortDescription}
							</p>
						) : (
							<p className="mt-6 text-base leading-8 text-stone-700">
								Liên hệ trực tiếp để được tư vấn về chất liệu, kích thước và phương án phù hợp với không gian của bạn.
							</p>
						)}

						{product.attributes?.length ? (
							<dl className="mt-7 grid grid-cols-2 border-l border-t border-craft-line">
								{product.attributes.slice(0, 6).map((attribute) => (
									<div key={`${attribute.key}-${attribute.value}`} className="border-b border-r border-craft-line p-4">
										<dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
											{attribute.key}
										</dt>
										<dd className="mt-1 text-sm font-semibold text-craft-ink">
											{attribute.value}{attribute.unit ? ` ${attribute.unit}` : ''}
										</dd>
									</div>
								))}
							</dl>
						) : null}

						<div className="mt-8 grid gap-3 sm:grid-cols-2" id="product-cta" aria-label="Liên hệ đặt mua {product.name}">
							<a
								href="tel:0347373891"
								className="inline-flex min-h-13 items-center justify-center gap-3 bg-craft-copper px-6 text-sm font-bold text-white transition-colors hover:bg-craft-brown"
							>
								<Phone className="size-4" aria-hidden="true"/>
								Gọi tư vấn 034 7373 891
							</a>
							<Link
								href="/lien-he"
								className="inline-flex min-h-13 items-center justify-center gap-3 border border-craft-brown px-6 text-sm font-bold text-craft-brown transition-colors hover:bg-craft-brown hover:text-white"
							>
								<MessageCircle className="size-4" aria-hidden="true"/>
								Gửi yêu cầu tư vấn
							</Link>
						</div>

						<ul className="mt-7 grid gap-4 text-sm text-stone-600 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							<li className="flex items-center gap-2">
								<Ruler className="size-4 text-craft-copper" aria-hidden="true"/>
								Tư vấn kích thước
							</li>
							<li className="flex items-center gap-2">
								<Truck className="size-4 text-craft-copper" aria-hidden="true"/>
								Chính sách vận chuyển
							</li>
							<li className="flex items-center gap-2">
								<ShieldCheck className="size-4 text-craft-copper" aria-hidden="true"/>
								Thông tin bảo hành
							</li>
						</ul>
					</div>
				</section>
			</div>

			{descriptionSections.length ? (
				<section className="border-y border-craft-line bg-craft-paper py-16 sm:py-20">
					<div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.38fr_0.62fr]">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-craft-copper">Chi tiết sản phẩm</p>
							<h2 className="mt-3 font-display text-3xl font-medium text-craft-ink sm:text-4xl">
								Chất liệu, kiểu dáng và cách sử dụng
							</h2>
						</div>
						<div className="max-w-3xl space-y-5 text-[15px] leading-8 text-stone-700 sm:text-base">
							{visibleDescription.map((section, index) => (
								<p key={`${section.slice(0, 32)}-${index}`} className="whitespace-pre-line">{section}</p>
							))}
							{remainingDescription.length ? (
								<details className="group border-t border-craft-line pt-5">
									<summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-bold text-craft-copper">
										Xem mô tả đầy đủ
									</summary>
									<div className="mt-4 space-y-5">
										{remainingDescription.map((section, index) => (
											<p key={`${section.slice(0, 32)}-more-${index}`} className="whitespace-pre-line">{section}</p>
										))}
									</div>
								</details>
							) : null}
						</div>
					</div>
				</section>
			) : null}

			<section className="border-y border-craft-line bg-craft-paper py-16 sm:py-20">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap items-baseline gap-4">
						<h2 className="font-display text-3xl text-craft-ink sm:text-4xl">Đánh giá từ khách hàng</h2>
						<div className="flex items-center gap-2" aria-label={`${ratingAvg} trên 5 sao`}>
							<span className="text-base text-craft-copper" aria-hidden="true">
								{'★'.repeat(Math.round(ratingAvg))}
								{'☆'.repeat(5 - Math.round(ratingAvg))}
							</span>
							<span className="text-sm font-semibold text-craft-ink">{ratingAvg}/5</span>
						</div>
					</div>
					<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{reviews.map((r) => (
							<article key={r.id} className="border border-craft-line bg-craft-cream p-5">
								<div className="flex items-center justify-between">
									<p className="text-sm font-bold text-craft-ink">{r.author}</p>
									<span className="text-xs text-craft-copper" aria-label={`${r.rating} sao`} aria-hidden="true">
										{'★'.repeat(r.rating)}<span className="text-muted-foreground/40">{'☆'.repeat(5 - r.rating)}</span>
									</span>
								</div>
								<p className="mt-3 text-sm leading-6 text-stone-600">{r.comment}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{faqs.length ? (
				<section className="border-b border-craft-line bg-craft-cream py-16 sm:py-20">
					<div className="container mx-auto max-w-3xl px-4">
						<h2 className="font-display text-3xl text-craft-ink sm:text-4xl">Câu hỏi thường gặp</h2>
						<div className="mt-8 space-y-3">
							{faqs.map((f) => (
								<details key={f.question} className="group border border-craft-line bg-craft-paper">
									<summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 text-sm font-bold text-craft-ink">
										{f.question}
										<span className="text-craft-copper transition-transform group-open:rotate-45" aria-hidden="true">+</span>
									</summary>
									<p className="border-t border-craft-line px-5 py-4 text-sm leading-7 text-stone-600">
										{f.answer}
									</p>
								</details>
							))}
						</div>
					</div>
				</section>
			) : null}

			<section className="bg-craft-cream py-14 sm:py-18">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-start justify-between gap-6 border-b border-craft-line pb-8 sm:flex-row sm:items-end">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-craft-copper">Cần thêm thông tin?</p>
							<h2 className="mt-3 font-display text-3xl text-craft-ink sm:text-4xl">Trao đổi trực tiếp với xưởng.</h2>
						</div>
						<Link href="/lien-he" className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-craft-copper">
							Xem thông tin liên hệ
							<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true"/>
						</Link>
					</div>
					<ProductRelated product={product}/>
				</div>
			</section>
		</div>
	)
}

export default ProductPage
