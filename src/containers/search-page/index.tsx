import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { Search } from 'lucide-react'

type Props = {
	query: string
	results: Product[]
}

export default function SearchPageClient({ query, results }: Props) {
	const trimmed = query.trim()
	return (
		<div className="craft-grain bg-craft-cream">
			<div className="container mx-auto space-y-8 px-4 py-6 sm:py-10">
				<header className="border-b border-craft-line pb-6">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-craft-copper">
						Tìm kiếm
					</p>
					<h1 className="mt-3 font-display text-3xl font-medium text-craft-ink sm:text-5xl">
						{trimmed ? (
							<>
								Kết quả cho <span className="text-craft-copper">“{trimmed}”</span>
							</>
						) : (
							'Tìm kiếm sản phẩm'
						)}
					</h1>
					<p className="mt-3 text-sm text-muted-foreground">
						{trimmed ? (
							<>
								<span className="font-bold text-craft-ink">{results.length}</span> sản phẩm phù hợp
							</>
						) : (
							'Nhập từ khóa vào ô tìm kiếm phía trên để khám phá các sản phẩm.'
						)}
					</p>
				</header>

				{trimmed && results.length === 0 ? (
					<div className="border border-craft-line bg-craft-paper p-10 text-center">
						<Search className="mx-auto size-10 text-craft-copper" aria-hidden="true" />
						<p className="mt-4 text-base font-semibold text-craft-ink">
							Không tìm thấy sản phẩm phù hợp với “{trimmed}”.
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							Thử từ khóa khác (ví dụ: kệ tivi, sofa gỗ) hoặc{' '}
							<Link href="/category/ke-tivi" className="font-semibold text-craft-copper underline-offset-4 hover:underline">
								duyệt bộ sưu tập
							</Link>
							.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{results.map((p) => (
							<Link href={`/product/${p.url}`} key={p.id}>
								<ProductCard product={p} tags={p.tags} />
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
