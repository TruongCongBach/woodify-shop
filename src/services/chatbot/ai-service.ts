import config from '@/config'
import { generateContent } from '@/lib/google-ai'
import type { QueryAttributes } from './types'

const FALLBACK_INTENT: QueryAttributes['intent'] = 'search'

export async function parseQueryWithAI(query: string): Promise<QueryAttributes | null> {
	if (!config.googleAI.apiKey) {
		console.warn('[AI] Skipping Gemini: No API key provided')
		return null
	}

	const prompt = `
	Bạn là một trợ lý bán hàng nội thất chuyên nghiệp.
	Hãy phân tích câu hỏi của khách hàng sau đây và trích xuất thông tin sản phẩm dưới dạng JSON.

	Câu hỏi: "${query}"

	Yêu cầu:
	1. intent: Mục đích của khách:
	   - "gallery": Nếu khách muốn xem ảnh, xem mẫu, cho xem hình, xem ảnh đi, gửi ảnh tham khảo...
	   - "search": Nếu khách muốn tìm sản phẩm, hỏi giá, hỏi thông tin... (mặc định)
	2. productType: Loại sản phẩm (ví dụ: kệ, sofa, bàn, ghế, mõ...). Trả về null nếu không rõ.
	3. dimensions: Mảng các chuỗi kích thước tìm thấy (ví dụ: ["2m4", "2.2m"]).
	4. material: Chất liệu sản phẩm (ví dụ: hương đá, gỗ xoan, sồi...). Trả về null nếu không rõ.
	5. priceRange: Đối tượng gồm {min, max} nếu khách đề cập đến giá (ví dụ: "5 đến 7 triệu" -> {min: 5000000, max: 7000000}). Trả về null nếu không có.

	Chỉ trả về JSON duy nhất, không thêm văn bản khác.
	Ví dụ kết quả: {"intent": "search", "productType": "kệ", "dimensions": ["2m"], "material": "gỗ xoan", "priceRange": {"min": 5000000, "max": 7000000}}
	`

	try {
		const text = await generateContent(prompt)
		const jsonStr = text.replace(/```json|```/g, '').trim()
		const parsed = JSON.parse(jsonStr) as Partial<QueryAttributes>

		return {
			intent: parsed.intent ?? FALLBACK_INTENT,
			productType: parsed.productType ?? null,
			dimensions: Array.isArray(parsed.dimensions) ? parsed.dimensions : [],
			material: parsed.material ?? null,
			priceRange: parsed.priceRange ?? null,
		}
	} catch (error) {
		console.error('[AI] Gemini Parsing Error:', error)
		return null
	}
}

export async function generateSalesResponse(query: string, products: ProductDataBase[]): Promise<string> {
	if (!config.googleAI.apiKey) {
		return `Dạ, em tìm thấy ${products.length} mẫu phù hợp với yêu cầu của mình ạ. Mời anh/chị tham khảo:`
	}

	const productNames = products.map(product => product.name).join(', ')
	const prompt = `
	Bạn là một nhân viên tư vấn bán hàng nội thất nhiệt tình, lịch sự và chuyên nghiệp tại "Nội Thất Bách Thảo".

	Khách hàng hỏi: "${query}"
	Danh sách sản phẩm tìm được: ${productNames}

	Yêu cầu:
	1. Viết một lời chào và giới thiệu ngắn gọn, thân thiện.
	2. Khẳng định rằng shop có những mẫu đúng như yêu cầu (về loại sản phẩm, kích thước...).
	3. Trả lời khéo léo, mang tính chất tư vấn để khách hàng cảm thấy được quan tâm và muốn chốt mua.
	4. Độ dài: Tối đa 2-3 câu.
	5. QUAN TRỌNG: Chỉ trả về nội dung tin nhắn gửi cho khách, không thêm bất kỳ văn bản giải thích, tiêu đề hay lời bình phẩm nào.

	Ví dụ: "Dạ chào anh/chị ạ! Bên em đang có sẵn những mẫu kệ tivi dài 2 mét cực kỳ sang trọng và bền đẹp, rất phù hợp với phòng khách nhà mình. Mời anh/chị xem qua các mẫu bên dưới nhé!"
	`

	try {
		const responseText = await generateContent(prompt)
		return responseText.trim()
	} catch (error) {
		console.error('[AI] Gemini Response Error:', error)
		const fallbackName = products[0]?.name?.split(' ')[0] ?? 'sản phẩm'
		return `Dạ, bên em có những mẫu ${fallbackName} rất đẹp phù hợp với yêu cầu của mình ạ. Anh/chị xem qua nhé:`
	}
}
