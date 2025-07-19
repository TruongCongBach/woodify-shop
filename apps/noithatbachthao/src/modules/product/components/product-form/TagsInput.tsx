// Tags Input Component
import { useCallback, useState } from 'react'
import { Badge } from '@woodify/ui/shadcn-ui/badge'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { X } from 'lucide-react'
import { Input } from '@woodify/ui/shadcn-ui/input'

interface TagsInputProps {
	tags: string[]
	onChange: (tags: string[]) => void
}

export const TagsInput: React.FC<TagsInputProps> = ({ tags, onChange }) => {
	const [inputValue, setInputValue] = useState('')

	const addTag = useCallback((tag: string) => {
		const trimmedTag = tag.trim()
		if (trimmedTag && !tags.includes(trimmedTag)) {
			onChange([...tags, trimmedTag])
		}
		setInputValue('')
	}, [tags, onChange])

	const removeTag = useCallback((tagToRemove: string) => {
		onChange(tags.filter(tag => tag !== tagToRemove))
	}, [tags, onChange])

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addTag(inputValue)
		}
	}, [addTag, inputValue])

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-2">
				{tags.map((tag, index) => (
					<Badge key={index} variant="secondary" className="px-2 py-1">
						{tag}
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-4 w-4 ml-1 hover:bg-gray-200 rounded-full"
							onClick={() => removeTag(tag)}
						>
							<X className="h-3 w-3" />
						</Button>
					</Badge>
				))}
			</div>
			<Input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Nhập tag và nhấn Enter hoặc dấu phẩy"
			/>
		</div>
	)
}
