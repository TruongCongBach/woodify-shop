interface ProductInfo {
	productName: string
	categoryName?: string
	attributes?: Array<{ key: string; value: string; unit?: string }>
}

interface PromptConfig {
	shortDescriptionMaxLength: number
	descriptionWordRange: { min: number; max: number }
	style: {
		tone: string
		focus: string
		market: string
	}
}

const DEFAULT_PROMPT_CONFIG: PromptConfig = {
	shortDescriptionMaxLength: 150,
	descriptionWordRange: { min: 200, max: 500 },
	style: {
		tone: 'Thân thiện, chuyên nghiệp',
		focus: 'Tập trung vào lợi ích cho khách hàng',
		market: 'Phù hợp với thị trường nội thất Việt Nam'
	}
}

export function createProductDescriptionPrompt(
	productInfo: ProductInfo,
	config: PromptConfig = DEFAULT_PROMPT_CONFIG
): string {
	const { productName, categoryName, attributes = [] } = productInfo
	
	const attributesText = attributes.length > 0 
		? attributes.map(attr => `${attr.key}: ${attr.value}${attr.unit ? ` ${attr.unit}` : ''}`).join(', ')
		: ''

	const productInfoSection = [
		`- Tên sản phẩm: ${productName}`,
		categoryName ? `- Danh mục: ${categoryName}` : '',
		attributesText ? `- Thuộc tính: ${attributesText}` : ''
	].filter(Boolean).join('\n')

	const descriptionRequirements = [
		`1. Mô tả ngắn (shortDescription): 1-2 câu ngắn gọn, súc tích, thu hút khách hàng (tối đa ${config.shortDescriptionMaxLength} ký tự)`,
		`2. Mô tả chi tiết (description): Mô tả đầy đủ về sản phẩm, tính năng, chất liệu, ưu điểm (${config.descriptionWordRange.min}-${config.descriptionWordRange.max} từ)`
	].join('\n')

	const styleGuidelines = [
		`- ${config.style.tone}`,
		`- ${config.style.focus}`,
		`- Sử dụng từ ngữ bán hàng hiệu quả`,
		`- ${config.style.market}`
	].join('\n')

	return `
Tôi cần tạo mô tả sản phẩm nội thất bằng tiếng Việt cho:
${productInfoSection}

Hãy tạo:
${descriptionRequirements}

Phong cách viết:
${styleGuidelines}

Trả về kết quả theo định dạng JSON chính xác:
{
  "shortDescription": "...",
  "description": "..."
}
`.trim()
}

export function createCustomPrompt(
	productInfo: ProductInfo,
	customInstructions: string
): string {
	const { productName, categoryName, attributes = [] } = productInfo
	
	const attributesText = attributes.length > 0 
		? attributes.map(attr => `${attr.key}: ${attr.value}${attr.unit ? ` ${attr.unit}` : ''}`).join(', ')
		: ''

	const productInfoSection = [
		`- Tên sản phẩm: ${productName}`,
		categoryName ? `- Danh mục: ${categoryName}` : '',
		attributesText ? `- Thuộc tính: ${attributesText}` : ''
	].filter(Boolean).join('\n')

	return `
Thông tin sản phẩm:
${productInfoSection}

Yêu cầu:
${customInstructions}

Trả về kết quả theo định dạng JSON:
{
  "shortDescription": "...",
  "description": "..."
}
`.trim()
}
