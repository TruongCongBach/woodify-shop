import { generateContent } from '@/lib/google-ai'
import { createProductDescriptionPrompt } from '@/utils'

interface GenerateDescriptionParams {
	productName: string
	categoryName?: string
	attributes?: Array<{ key: string; value: string; unit?: string }>
}

interface GeneratedContent {
	shortDescription: string
	description: string
}

export async function generateProductDescriptionServer({
	productName,
	categoryName,
	attributes = []
}: GenerateDescriptionParams): Promise<GeneratedContent> {
	try {
		// Create prompt using the builder
		const prompt = createProductDescriptionPrompt({
			productName,
			categoryName,
			attributes
		})

		// Generate content using new API
		const generatedText = await generateContent(prompt)

		// Check if we got a valid response
		if (!generatedText) {
			throw new Error('No content generated')
		}

		// Parse the response
		return parseAIResponse(generatedText)

	} catch (error) {
		console.error('Error generating product description:', error)
		throw new Error('Không thể tạo mô tả sản phẩm. Vui lòng thử lại sau.')
	}
}

function parseAIResponse(generatedText: string): GeneratedContent {
	// Try to parse JSON from the response
	try {
		const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
		if (jsonMatch) {
			const parsedContent = JSON.parse(jsonMatch[0])
			return {
				shortDescription: parsedContent.shortDescription || '',
				description: parsedContent.description || ''
			}
		}
	} catch (parseError) {
		console.warn('Failed to parse JSON, extracting manually:', parseError)
	}

	// Fallback: extract descriptions manually if JSON parsing fails
	const shortDescMatch = generatedText.match(/"shortDescription":\s*"([^"]*)"/)
	const descMatch = generatedText.match(/"description":\s*"([^"]*)"/)

	return {
		shortDescription: shortDescMatch ? shortDescMatch[1] : '',
		description: descMatch ? descMatch[1] : generatedText.trim()
	}
}
