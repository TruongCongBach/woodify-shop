// Attributes Manager Component
import { useCallback } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Card, CardContent } from '@woodify/ui/shadcn-ui/card'
import { Label } from '@woodify/ui/shadcn-ui/label'
import { Input } from '@woodify/ui/shadcn-ui/input'

interface AttributesManagerProps {
	attributes: ProductAttribute[]
	onChange: (attributes: ProductAttribute[]) => void
}

export const AttributesManager: React.FC<AttributesManagerProps> = ({
	attributes,
	onChange
}) => {
	const addAttribute = useCallback(() => {
		onChange([...attributes, { key: '', value: '', unit: '' }])
	}, [attributes, onChange])

	const removeAttribute = useCallback((index: number) => {
		onChange(attributes.filter((_, i) => i !== index))
	}, [attributes, onChange])

	const updateAttribute = useCallback((index: number, field: keyof ProductAttribute, value: string) => {
		const updated = attributes.map((attr, i) =>
			i === index ? { ...attr, [field]: value } : attr
		)
		onChange(updated)
	}, [attributes, onChange])

	return (
		<div className="space-y-4">
			{attributes.map((attribute, index) => (
				<Card key={index}>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<Label htmlFor={`attr-key-${index}`}>Tên thuộc tính</Label>
								<Input
									id={`attr-key-${index}`}
									value={attribute.key}
									onChange={(e) => updateAttribute(index, 'key', e.target.value)}
									placeholder="VD: Kích thước"
								/>
							</div>
							<div>
								<Label htmlFor={`attr-value-${index}`}>Giá trị</Label>
								<Input
									id={`attr-value-${index}`}
									value={attribute.value}
									onChange={(e) => updateAttribute(index, 'value', e.target.value)}
									placeholder="VD: 30"
								/>
							</div>
							<div className="flex gap-2">
								<div className="flex-1">
									<Label htmlFor={`attr-unit-${index}`}>Đơn vị</Label>
									<Input
										id={`attr-unit-${index}`}
										value={attribute.unit || ''}
										onChange={(e) => updateAttribute(index, 'unit', e.target.value)}
										placeholder="VD: cm"
									/>
								</div>
								<div className="flex items-end">
									<Button
										type="button"
										variant="outline"
										size="icon"
										onClick={() => removeAttribute(index)}
										className="text-red-600 hover:text-red-700"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}

			<Button
				type="button"
				variant="outline"
				onClick={addAttribute}
				className="w-full"
			>
				<Plus className="h-4 w-4 mr-2" />
				Thêm thuộc tính
			</Button>
		</div>
	)
}
