'use client'
import React from 'react'
import {
	TruckIcon,
	PhoneIcon
} from '@heroicons/react/24/outline'

export default function ShippingPolicyPage() {
	return (
		<section className="container mx-auto px-4 py-8 space-y-10">
			<header className="flex items-center space-x-3">
				<TruckIcon className="h-8 w-8 text-primary" />
				<h1 className="text-3xl font-semibold">Chính sách vận chuyển</h1>
			</header>

			<div className="divide-y divide-gray-200 space-y-6">
				<div className="py-6">
					<h2 className="text-xl font-semibold">📍 Phạm vi giao hàng</h2>
					<p className="mt-2 text-gray-700">
						Giao hàng toàn quốc (64 tỉnh, kể cả vùng sâu, ngõ hẻm nhỏ).
					</p>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">💸 Miễn phí vận chuyển</h2>
					<ul className="mt-2 list-disc list-inside text-gray-700">
						<li>Đơn hàng dưới 10 triệu: miễn phí trong bán kính 30km.</li>
						<li>50–100 triệu: miễn phí trong bán kính 200km.</li>
						<li>Trên 100 triệu: miễn phí toàn quốc (Quốc lộ 1A).</li>
					</ul>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">📏 Vùng ngoài miễn phí</h2>
					<p className="mt-2 text-gray-700">
						Áp dụng phí theo km cho vùng xa: ví dụ bàn ghế phòng khách ~2 triệu + 12.000VNĐ/km.
					</p>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">🔁 Quy trình giao nhận</h2>
					<p className="mt-2 text-gray-700">
						Khách kiểm tra hàng trước khi thanh toán. Nếu không hài lòng, có thể trả lại miễn phí. Sau thanh toán, áp dụng chính sách bảo hành nếu lỗi kỹ thuật.
					</p>
				</div>

				<div className="py-6">
					<h2 className="text-xl font-semibold">📞 Liên hệ hỗ trợ</h2>
					<p className="mt-2 text-gray-700">
						Vấn đề vận chuyển xin liên hệ:
						<a href="tel:0988303534" className="text-primary font-medium ml-1">0988303534</a>
						(Hotline / Zalo / TikTok)
					</p>
				</div>
			</div>

			<div className="pt-8 text-center">
				<a
					href="/contact-us"
					className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark transition"
				>
					<PhoneIcon className="h-5 w-5" />
					<span>Liên hệ tư vấn vận chuyển</span>
				</a>
			</div>
		</section>
	)
}
