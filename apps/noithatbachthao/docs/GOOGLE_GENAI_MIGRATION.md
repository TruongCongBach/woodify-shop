# Migration from @google/generative-ai to @google/genai

## Overview
Migrated from the deprecated `@google/generative-ai` package to the new `@google/genai` package.

## Changes Made

### 1. Package Changes
- **Removed**: `@google/generative-ai`
- **Added**: `@google/genai`

### 2. API Changes

#### Before (Old API)
```typescript
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: config,
  safetySettings: settings
})

const result = await model.generateContent(prompt)
const response = await result.response
const text = response.text()
```

#### After (New API)
```typescript
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey })
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt
})
const text = response.text
```

### 3. Files Modified

1. **`/src/lib/google-ai.ts`**
   - Updated import from `@google/generative-ai` to `@google/genai`
   - Simplified API initialization and usage
   - Added new `generateContent()` convenience function
   - Removed deprecated `getGoogleAIModel()` function

2. **`/src/services/ai/generate-product-description-server.ts`**
   - Updated to use new `generateContent()` function
   - Simplified content generation logic

3. **`/src/config/index.ts`**
   - Updated default model from `gemini-1.5-flash` to `gemini-2.5-flash`

4. **`/src/app/api/products/[id]/route.ts`**
   - Fixed Next.js 15 type issues (unrelated to AI migration)

### 4. Breaking Changes

- **Function Rename**: `getGoogleAIModel()` → `generateContent()`
- **Direct Usage**: New API is simpler and requires fewer steps
- **Model Update**: Default model upgraded to `gemini-2.5-flash`

### 5. Benefits

- **Up-to-date SDK**: Using the latest Google AI SDK
- **Simplified API**: Fewer steps to generate content
- **Better Performance**: Latest model with improved capabilities
- **Future-proof**: No more deprecation warnings

### 6. Configuration

The configuration remains the same via environment variables:
- `GOOGLE_AI_STUDIO_API_KEY`: Your Google AI Studio API key
- `GOOGLE_AI_MODEL`: Model name (default: `gemini-2.5-flash`)
- `GOOGLE_AI_TEMPERATURE`: Generation temperature (default: 0.7)
- `GOOGLE_AI_TOP_K`: Top K value (default: 40)
- `GOOGLE_AI_TOP_P`: Top P value (default: 0.95)
- `GOOGLE_AI_MAX_OUTPUT_TOKENS`: Max output tokens (default: 2048)

### 7. Usage Example

```typescript
import { generateContent } from '@/lib/google-ai'

// Simple content generation
const description = await generateContent("Describe a wooden table")

// The function handles initialization and error handling internally
```

## Testing

✅ Build successful
✅ All TypeScript types resolved
✅ No deprecation warnings
✅ API functionality preserved
