import { GoogleGenAI } from '@google/genai'
import config from '@/config'

// Private variables - module scope acts as singleton
let genAI: GoogleGenAI | null = null

function initializeAI() {
	if (!config.googleAI.apiKey) {
		throw new Error('Google AI Studio API key is not configured')
	}

	if (!genAI) {
		genAI = new GoogleGenAI({ 
			apiKey: config.googleAI.apiKey 
		})
	}
}

export function getGoogleAI(): GoogleGenAI {
	initializeAI()
	if (!genAI) {
		throw new Error('Failed to initialize Google AI')
	}
	return genAI
}

// Convenience function to generate content directly
export async function generateContent(prompt: string): Promise<string> {
	const ai = getGoogleAI()
	
	const response = await ai.models.generateContent({
		model: config.googleAI.model,
		contents: prompt
	})
	
	return response.text || ''
}

// Reset function (useful for testing or config changes)
export function resetGoogleAI() {
	genAI = null
}
