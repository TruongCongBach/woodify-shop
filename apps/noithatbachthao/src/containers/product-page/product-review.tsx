// components/ProductReview.tsx
'use client'

import React from 'react'

interface ProductReviewProps {
	reviews: Review[]
}

export const ProductReview: React.FC<ProductReviewProps> = ({ reviews }) => {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Đánh giá của khách hàng</h2>
			{reviews.length === 0 ? (
				<p className="text-gray-500">Chưa có đánh giá nào.</p>
			) : (
				<div className="space-y-4">
					{reviews.map(r => (
						<div key={r.id} className="border-b pb-3">
							<div className="text-sm font-medium">{r.author}</div>
							<div className="text-yellow-500 text-sm">
								{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}
							</div>
							<p className="text-gray-700">{r.comment}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
