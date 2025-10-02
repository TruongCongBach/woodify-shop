import config from '@/config'

interface GenerateDescriptionParams {
	productName: string
	categoryName?: string
	attributes?: Array<{ key: string; value: string; unit?: string }>
}

interface GeneratedContent {
	shortDescription: string
	description: string
}

export async function generateProductDescription({
	productName,
	categoryName,
	attributes = []
}: GenerateDescriptionParams): Promise<GeneratedContent> {
	try {
		const response = await fetch('/api/ai/generate-description', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				productName,
				categoryName,
				attributes
			})
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || `API error: ${response.status}`)
		}

		const result = await response.json()
		return result

	} catch (error) {
		console.error('Error generating product description:', error)
		throw new Error(
			error instanceof Error 
				? error.message 
				: 'Không thể tạo mô tả sản phẩm. Vui lòng thử lại sau.'
		)
	}
}
