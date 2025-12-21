'use client'

import React, { useState } from 'react'
import { Button } from '@/ui/shadcn-ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn-ui/card'
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { generateProductDescription } from '@/services/ai/generate-product-description'

interface AIDescriptionGeneratorProps {
	productName: string
	categoryName?: string
	attributes?: Array<{ key: string; value: string; unit?: string }>
	onDescriptionGenerated: (shortDescription: string, description: string) => void
	disabled?: boolean
}

export const AIDescriptionGenerator: React.FC<AIDescriptionGeneratorProps> = ({
	productName,
	categoryName,
	attributes = [],
	onDescriptionGenerated,
	disabled = false
}) => {
	const [isGenerating, setIsGenerating] = useState(false)

	const handleGenerateDescription = async () => {
		if (!productName.trim()) {
			toast.error('Vui lòng nhập tên sản phẩm trước khi tạo mô tả.')
			return
		}

		setIsGenerating(true)
		
		try {
			const result = await generateProductDescription({
				productName: productName.trim(),
				categoryName,
				attributes
			})

			if (result.shortDescription || result.description) {
				onDescriptionGenerated(result.shortDescription, result.description)
				toast.success('Đã tạo mô tả sản phẩm thành công!')
			} else {
				throw new Error('Không nhận được mô tả từ AI')
			}
		} catch (error) {
			console.error('Error generating description:', error)
			toast.error(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tạo mô tả.')
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<Card className="border-amber-200 bg-amber-50/50">
			<CardHeader className="pb-3">
				<CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
					<Sparkles className="h-4 w-4" />
					AI Mô tả sản phẩm
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<p className="text-xs text-amber-700">
						Sử dụng AI để tự động tạo mô tả ngắn và mô tả chi tiết dựa trên tên sản phẩm, danh mục và thuộc tính.
					</p>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleGenerateDescription}
						disabled={disabled || isGenerating || !productName.trim()}
						className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
					>
						{isGenerating ? (
							<>
								<Loader2 className="h-4 w-4 mr-2 animate-spin" />
								Đang tạo mô tả...
							</>
						) : (
							<>
								<Sparkles className="h-4 w-4 mr-2" />
								Tạo mô tả với AI
							</>
						)}
					</Button>
					
					{!productName.trim() && (
						<p className="text-xs text-amber-600 italic">
							* Vui lòng nhập tên sản phẩm để sử dụng tính năng này
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default AIDescriptionGenerator
