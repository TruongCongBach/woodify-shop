type FAQItem = { question: string; answer: string }

// Derive 3-5 FAQs from product data. Pure function, deterministic per product.
// No DB, no AI, no schema migration.
export function getProductFAQs(product: Product): FAQItem[] {
	const faqs: FAQItem[] = []
	const attrs = product.attributes ?? []

	// 1. Chất liệu — scan description for first wood/material mention
	const firstParagraph = (product.description ?? '').split(/\n+/)[0] ?? ''
	const materialMatch = firstParagraph.match(/gỗ\s+([\p{L}\s]{2,30})/u)
	if (materialMatch) {
		faqs.push({
			question: `${product.name} làm từ chất liệu gì?`,
			answer: `${product.name} được chế tác từ gỗ ${materialMatch[1].trim()}, tuyển chọn tại xưởng Nội thất Bách Thảo ở Thư Lâm, Hà Nội.`,
		})
	}

	// 2. Kích thước — join attributes matching dimension keys
	const dimKeys = ['chiều dài', 'chiều rộng', 'chiều cao', 'kích thước', 'dài', 'rộng', 'cao', 'sâu']
	const dims = attrs.filter((a) => dimKeys.some((k) => a.key.toLowerCase().includes(k)))
	if (dims.length) {
		const dimStr = dims
			.map((a) => `${a.key} ${a.value}${a.unit ? ` ${a.unit}` : ''}`)
			.join(', ')
		faqs.push({
			question: `Kích thước của ${product.name}?`,
			answer: `Kích thước tham khảo: ${dimStr}. Xưởng nhận đặt theo kích thước riêng phù hợp với không gian của bạn — vui lòng liên hệ để được tư vấn.`,
		})
	}

	// 3. Bảo hành
	faqs.push({
		question: `Chính sách bảo hành cho ${product.name}?`,
		answer:
			'Sản phẩm được bảo hành dài hạn cho kết cấu và bề mặt gỗ. Chi tiết phạm vi, thời gian và quy trình bảo hành xem tại trang Chính sách bảo hành.',
	})

	// 4. Đặt theo yêu cầu
	faqs.push({
		question: `Có thể đặt ${product.name} theo kích thước riêng?`,
		answer:
			'Có. Xưởng nhận đặt theo kích thước, chất liệu và hoàn thiện theo yêu cầu. Vui lòng liên hệ 034 7373 891 hoặc gửi yêu cầu qua form Liên hệ để được báo giá.',
	})

	// 5. Vận chuyển
	faqs.push({
		question: `Vận chuyển ${product.name} như thế nào?`,
		answer:
			'Đóng gói cẩn thận, giao hàng toàn quốc. Hỗ trợ lắp đặt tại Hà Nội. Thời gian và chi phí vận chuyển cho từng khu vực xem tại trang Chính sách vận chuyển.',
	})

	return faqs.slice(0, 5)
}
