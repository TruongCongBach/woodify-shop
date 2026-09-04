import type { Metadata } from 'next'
import Link from 'next/link'
import NotFoundBackButton from './not-found-client'

export const metadata: Metadata = {
	title: 'Trang không tồn tại',
	description: 'Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.',
	robots: { index: false, follow: false },
}

export default function NotFound() {
	return (
		<div className="craft-grain flex min-h-[70vh] items-center justify-center bg-craft-cream px-4 py-16">
			<div className="max-w-lg w-full text-center">
				<div className="font-display text-8xl font-medium text-craft-copper/30 select-none">404</div>
				<h1 className="mt-3 font-display text-3xl font-medium text-craft-ink sm:text-4xl">
					Trang không tồn tại
				</h1>
				<p className="mt-4 text-base leading-7 text-stone-600">
					Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
					Hãy kiểm tra lại đường dẫn hoặc quay về các trang phổ biến dưới đây.
				</p>

				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<Link
						href="/"
						className="inline-flex min-h-12 flex-1 items-center justify-center bg-craft-copper px-6 text-sm font-bold text-white transition-colors hover:bg-craft-brown"
					>
						Về trang chủ
					</Link>
					<Link
						href="/category/ke-tivi"
						className="inline-flex min-h-12 flex-1 items-center justify-center border border-craft-brown px-6 text-sm font-bold text-craft-brown transition-colors hover:bg-craft-brown hover:text-white"
					>
						Xem bộ sưu tập
					</Link>
					<NotFoundBackButton />
				</div>

				<div className="mt-12 grid grid-cols-2 gap-4 border-t border-craft-line pt-8 text-sm">
					<Link href="/category/ke-tivi" className="text-stone-600 hover:text-craft-copper">
						Kệ tivi gỗ
					</Link>
					<Link href="/lien-he" className="text-stone-600 hover:text-craft-copper">
						Liên hệ xưởng
					</Link>
					<Link href="/ve-chung-toi" className="text-stone-600 hover:text-craft-copper">
						Về chúng tôi
					</Link>
					<span className="text-muted-foreground">© {new Date().getFullYear()} Nội thất Bách Thảo</span>
				</div>
			</div>
		</div>
	)
}
