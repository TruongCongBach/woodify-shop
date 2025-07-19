// Default Image Selector Component
import { Star } from 'lucide-react'

interface DefaultImageSelectorProps {
	images: string[]
	selectedImage: string
	onSelect: (image: string) => void
}

export const DefaultImageSelector: React.FC<DefaultImageSelectorProps> = ({
	images,
	selectedImage,
	onSelect
}) => {
	if (images.length === 0) {
		return (
			<div className="text-sm text-gray-500">
				Vui lòng upload hình ảnh trước để chọn ảnh mặc định
			</div>
		)
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{images.map((image, index) => (
				<div
					key={index}
					className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
						selectedImage === image
							? 'border-blue-500 ring-2 ring-blue-200'
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => onSelect(image)}
				>
					<img
						src={image}
						alt={`Option ${index + 1}`}
						className="w-full h-full object-cover"
					/>
					{selectedImage === image && (
						<div className="absolute top-2 right-2">
							<Star className="h-5 w-5 text-blue-500 fill-current" />
						</div>
					)}
				</div>
			))}
		</div>
	)
}
