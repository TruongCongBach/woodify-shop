// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="container mx-auto px-4 py-16 text-center">
			<h1 className="text-3xl font-bold mb-4">404 – Không tìm thấy trang</h1>
			<p className="mb-6">Xin lỗi, trang bạn truy cập không tồn tại.</p>
			<Link href="/" className="text-primary hover:underline">
				Quay về trang chủ
			</Link>
		</div>
	);
}
