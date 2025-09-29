// app/not-found.tsx
'use client'
import Link from 'next/link';
import { Home, Search, ArrowLeft, Package } from 'lucide-react';
import { Button } from '@woodify/ui/shadcn-ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	const handleGoBack = () => {
		// Check if there's history to go back to
		if (typeof window !== 'undefined' && window.history.length > 1) {
			router.back();
		} else {
			// Fallback to home page if no history
			router.push('/');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
			<div className="max-w-md w-full text-center">
				{/* 404 Illustration */}
				<div className="mb-8">
					<div className="relative">
						<div className="text-9xl font-bold text-gray-200 select-none">404</div>
						<div className="absolute inset-0 flex items-center justify-center">
							<Package className="h-20 w-20 text-amber-500" />
						</div>
					</div>
				</div>

				{/* Error Message */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Oops! Trang không tồn tại
					</h1>
					<p className="text-gray-600 text-lg leading-relaxed">
						Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
						Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<Button
						asChild
						size="lg"
						className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md hover:shadow-lg"
					>
						<Link href="/">
							<Home className="h-5 w-5 mr-2" />
							Về Trang Chủ
						</Link>
					</Button>

					<div className="flex space-x-3">
						<Button
							asChild
							variant="outline"
							className="flex-1 h-12"
						>
							<Link href="/category/ke-tivi">
								<Search className="h-4 w-4 mr-2" />
								Xem Sản Phẩm
							</Link>
						</Button>

						<Button
							onClick={handleGoBack}
							variant="outline"
							className="flex-1 h-12"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Quay Lại
						</Button>
					</div>
				</div>

				{/* Popular Links */}
				<div className="mt-12 pt-8 border-t border-gray-200">
					<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
						Trang phổ biến
					</h3>
					<div className="grid grid-cols-2 gap-3 text-sm">
						<Link
							href="/category/ke-tivi"
							className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
						>
							Kệ Tivi
						</Link>
						<Link
							href="/category/sofa"
							className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
						>
							Sofa Gỗ
						</Link>
						<Link
							href="/about-us"
							className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
						>
							Về Chúng Tôi
						</Link>
						<Link
							href="/contact-us"
							className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
						>
							Liên Hệ
						</Link>
					</div>
				</div>

				{/* Brand Footer */}
				<div className="mt-8 text-center">
					<p className="text-xs text-gray-400">
						© 2024 Nội Thất Bách Thảo - Chất lượng từ gỗ tự nhiên
					</p>
				</div>
			</div>
		</div>
	);
}
