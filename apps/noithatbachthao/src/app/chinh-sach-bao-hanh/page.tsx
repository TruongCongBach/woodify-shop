'use client'
import React from 'react'
import { PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function WarrantyPolicyPage() {
	return (
		<section className="container mx-auto px-4 py-8 space-y-10">
			<header className="flex items-center space-x-3">
				<ShieldCheckIcon className="h-8 w-8 text-primary" />
				<h1 className="text-3xl font-semibold">Chính sách bảo hành</h1>
			</header>

			<div className="divide-y divide-gray-200 space-y-6">
				<div className="py-6">
					<h2 className="text-xl font-semibold">⏳ Thời gian bảo hành</h2>
					<ul className="mt-2 list-disc list-inside text-gray-700">
						<li>Bàn ghế phòng khách — <span className="text-green-600 font-medium">10 năm</span></li>
						<li>Bàn ghế ăn — <span className="text-green-600 font-medium">5 năm</span></li>
						<li>Các sản phẩm khác — Theo thỏa thuận</li>
					</ul>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">🔧 Điều kiện bảo hành</h2>
					<ul className="mt-2 list-disc list-inside text-gray-700">
						<li>Sản phẩm còn trong thời hạn bảo hành & có hóa đơn/đơn hàng.</li>
						<li>Không tự tháo rời, hư hỏng do ngoại lực hoặc mối mọt tự nhiên.</li>
						<li>Cam kết đổi mới hoặc đền gấp 10× nếu không đúng cam kết về gỗ.</li>
					</ul>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">📦 Phạm vi và phương thức</h2>
					<p className="mt-2 text-gray-700">
						Miễn phí sửa chữa các lỗi kỹ thuật (bong keo, tụt mộng, chốt lỏng…). Khách
						được kiểm tra hàng trước khi nhận; nếu không hài lòng, có thể hoàn trả miễn phí.
					</p>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">📞 Liên hệ hỗ trợ</h2>
					<p className="mt-2 text-gray-700">
						Mọi yêu cầu bảo hành vui lòng liên hệ: &nbsp;
						<a href="tel:0988303534" className="text-primary font-medium">098.830.3534</a> (Hotline/Zalo/TikTok)
					</p>
				</div>
			</div>

			<div className="pt-8 text-center">
				<a
					href="/lien-he"
					className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark transition"
				>
					<PhoneIcon className="h-5 w-5" />
					<span>Liên hệ tư vấn bảo hành</span>
				</a>
			</div>
		</section>

	)
}
