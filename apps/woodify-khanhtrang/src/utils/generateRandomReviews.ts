// utils/randomReview.ts


const authors = ['Nguyễn Minh', 'Trần Anh', 'Lê Thị Hoa', 'Phạm Văn Long', 'Vũ Linh', 'Phạm Mai']
const comments = [
	'Sản phẩm quá tuyệt! Chất lượng vượt mong đợi.',
	'Đã dùng được một thời gian, rất hài lòng!',
	'Giao hàng nhanh chóng, đóng gói cẩn thận.',
	'Thiết kế đẹp và rất chắc chắn, đáng tiền.',
	'Nhân viên tư vấn nhiệt tình, dịch vụ tốt.',
	'Màu sắc và kích thước như mô tả.',
]

export function generateRandomReviews(count: number): Review[] {
	const reviews: Review[] = []

	for (let i = 0; i < count; i++) {
		const id = Date.now() + i
		const author = authors[Math.floor(Math.random() * authors.length)]
		const rating = Math.floor(Math.random() * 3) + 3
		const comment = comments[Math.floor(Math.random() * comments.length)]

		reviews.push({ id, author, rating, comment })
	}

	return reviews
}
