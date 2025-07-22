// Sub Categories Manager Component

import { Label } from '@woodify/ui/shadcn-ui/label'
import { SubCategorySelect } from './SubCategorySelect'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Badge } from '@woodify/ui/shadcn-ui/badge'
import { X } from 'lucide-react'

interface SubCategoriesManagerProps {
	selectedCategories: string[]
	categories: Category[]
	onChange: (categories: string[]) => void
}

export const SubCategoriesManager: React.FC<SubCategoriesManagerProps> = ({
	selectedCategories,
	categories,
	onChange,
}) => {
	return (
		<div className="space-y-4">
			<SubCategorySelect
				value={selectedCategories}
				onChange={onChange}
				options={categories}
			/>

			{/* Show selected categories */}
			{selectedCategories.length > 0 && (
				<div className="space-y-2">
					<Label className="text-sm font-medium">Danh mục con đã chọn:</Label>
					<div className="flex flex-wrap gap-2">
						{selectedCategories.map((categoryId) => {
							const category = categories.find(c => c.id === categoryId)
							return (
								<Badge key={categoryId} variant="secondary" className="px-2 py-1">
									{category?.name || categoryId}
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="h-4 w-4 ml-1 hover:bg-gray-200 rounded-full"
										onClick={() => onChange(selectedCategories.filter(id => id !== categoryId))}
									>
										<X className="h-3 w-3"/>
									</Button>
								</Badge>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
