import config from '@/config'
import { generateSalesResponse } from './ai-service'
import { getProductById, getQueryAttributes, searchProducts } from './product-service'
import { getSession, updateAttributes } from './session-service'
import type { ChatbotResponse, ChatbotTemplatePayload, QueryAttributes } from './types'

export async function processMessage(userId: string, messageText: string): Promise<ChatbotResponse> {
	const lowerText = messageText.toLowerCase()

	if (lowerText.includes('xin chào') || lowerText.includes('hi') || lowerText.includes('hello')) {
		return { type: 'text', content: 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay? Bạn muốn tìm sản phẩm nào?' }
	}

	getSession(userId)
	const newAttrs = await getQueryAttributes(messageText)
	const currentAttrs = updateAttributes(userId, newAttrs ?? {})

	const { products, recommendations } = await searchProducts(messageText, currentAttrs)

	if (products.length > 0) {
		if (currentAttrs.intent === 'gallery') {
			const galleryResponse = formatImageGallery(products)
			const salesText = await generateSalesResponse(`Cho tôi xem ảnh ${currentAttrs.productType ?? ''}`, products)
			return {
				type: 'combo',
				text: salesText,
				carousel: galleryResponse,
			}
		}

		const salesText = await generateSalesResponse(messageText, products)
		return {
			type: 'combo',
			text: salesText,
			carousel: formatProductCarousel(products),
		}
	}

	if (recommendations.length > 0) {
		const topRec = recommendations[0]
		return {
			type: 'combo',
			text: topRec.reason,
			carousel: formatProductCarousel(topRec.products),
		}
	}

	if (lowerText.includes('giá') || lowerText.includes('tìm') || lowerText.includes('mua') || lowerText.includes('xem')) {
		const prefixes = ['tìm kiếm', 'tìm mua', 'tìm', 'mua', 'giá của', 'giá', 'cho xem', 'xem']
		let cleanQuery = lowerText
		for (const prefix of prefixes) {
			if (cleanQuery.startsWith(prefix)) {
				cleanQuery = cleanQuery.replace(prefix, '').trim()
				break
			}
		}

		if (cleanQuery.length >= 2) {
			const keywords = cleanQuery.split(' ').filter(word => word.length >= 2)
			for (const keyword of keywords) {
				const retry = await searchProducts(keyword)
				if (retry.products.length > 0) {
					const salesText = await generateSalesResponse(messageText, retry.products)
					return {
						type: 'combo',
						text: salesText,
						carousel: formatProductCarousel(retry.products),
					}
				}
			}
		}
	}

	const advice = currentAttrs.productType ? `mẫu ${currentAttrs.productType}` : 'sản phẩm'
	return {
		type: 'text',
		content: `Dạ hiện tại shop em chưa có đúng ${advice} mà mình cần rồi ạ. Tuy nhiên bên em có nhận đặt đóng theo kích thước và chất liệu riêng để phù hợp nhất với không gian nhà mình. Anh/chị có muốn tham khảo các mẫu sẵn có hoặc để lại số điện thoại em gọi tư vấn trực tiếp không ạ?`,
	}
}

export async function handlePostback(userId: string, payload: string): Promise<ChatbotResponse> {
	if (payload.startsWith('CONTACT_')) {
		const productId = payload.replace('CONTACT_', '')
		const product = await getProductById(productId)

		if (product) {
			const priceValue = typeof product.price === 'number' ? product.price : Number(product.price)
			const priceStr = Number.isFinite(priceValue) ? `${priceValue.toLocaleString('vi-VN')} đ` : 'Liên hệ'
			const detailText = `🌟 Thông tin mẫu: ${product.name}\n\n` +
				`💰 Giá: ${priceStr}\n` +
				`📝 Mô tả: ${product.description ?? 'Đang cập nhật'}\n\n` +
				'Anh/chị thấy mẫu này thế nào ạ? Nếu cần tư vấn thêm về kích thước hoặc chất liệu khác, đừng ngần ngại nhắn em nhé!'

			return { type: 'text', content: detailText }
		}
	}

	return { type: 'text', content: 'Dạ xin lỗi, em chưa tìm thấy thông tin của mẫu này. Anh/chị thử lại sau hoặc để lại số điện thoại em gọi tư vấn trực tiếp nhé!' }
}

function formatImageGallery(products: ProductDataBase[]): ChatbotTemplatePayload {
	const images: Array<{ src: string; title: string; id: string }> = []

	products.forEach(product => {
		if (product.default_image) {
			images.push({
				src: product.default_image,
				title: product.name,
				id: product.id,
			})
		}
	})

	for (const product of products) {
		if (images.length >= 10) break
		if (Array.isArray(product.media)) {
			for (const media of product.media) {
				if (images.length >= 10) break
				if (media?.src && !images.some(img => img.src === media.src)) {
					images.push({
						src: media.src,
						title: product.name,
						id: product.id,
					})
				}
			}
		}
	}

	const galleryItems = images.slice(0, 10).map(img => ({
		title: img.title,
		image_url: img.src,
		buttons: [{
			type: 'postback',
			title: 'Xem ngay',
			payload: `CONTACT_${img.id}`,
		}],
	}))

	return {
		type: 'template',
		payload: {
			template_type: 'generic',
			image_aspect_ratio: 'horizontal',
			elements: galleryItems,
		},
	}
}

function formatProductCarousel(products: ProductDataBase[]): ChatbotTemplatePayload {
	const websiteUrl = process.env.WEBSITE_URL || config.domainUrl || 'https://www.noithatbachthao.com'
	const productPath = process.env.PRODUCT_PATH || '/product'

	const elements = products.map(product => {
		let fullUrl: string | null = null
		if (product.url && product.url.trim() !== '') {
			const urlStr = product.url.trim()
			fullUrl = urlStr.startsWith('http://') || urlStr.startsWith('https://')
				? urlStr
				: `${websiteUrl}${productPath}/${urlStr}`
		}

		const priceValue = typeof product.price === 'number' ? product.price : Number(product.price)
		const priceText = Number.isFinite(priceValue) ? `${priceValue.toLocaleString('vi-VN')} đ` : 'Liên hệ'
		const descriptionText = product.description ? ` - ${product.description.substring(0, 50)}...` : ''

		const element: Record<string, unknown> = {
			title: product.name,
			image_url: product.default_image || 'https://via.placeholder.com/300',
			subtitle: `${priceText}${descriptionText}`,
		}

		if (fullUrl) {
			element.default_action = {
				type: 'web_url',
				url: fullUrl,
				webview_height_ratio: 'tall',
			}
		}

		const buttons: Array<Record<string, unknown>> = []
		if (fullUrl) {
			buttons.push({
				type: 'web_url',
				url: fullUrl,
				title: 'Xem chi tiết',
			})
		}

		buttons.push({
			type: 'postback',
			title: 'Liên hệ mua',
			payload: `CONTACT_${product.id}`,
		})

		element.buttons = buttons
		return element
	})

	return {
		type: 'template',
		payload: {
			template_type: 'generic',
			elements,
		},
	}
}
