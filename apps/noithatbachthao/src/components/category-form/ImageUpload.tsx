
// Image Upload Component
import React, { useCallback, useState } from 'react'
import { Image as ImageIcon, Upload, X } from 'lucide-react'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Badge } from '@woodify/ui/shadcn-ui/badge'

export interface UploadedImage {
	file: File
	preview: string
}

interface ImageUploadProps {
	onImageChange: (image: UploadedImage | null) => void
	existingImage?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
	onImageChange,
	existingImage
}) => {
	const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
	const [dragActive, setDragActive] = useState(false)
	const fileInputRef = React.useRef<HTMLInputElement>(null)

	const handleFile = useCallback((file: File) => {
		// Validate file type
		if (!file.type.startsWith('image/')) {
			alert('Vui lòng chọn file hình ảnh')
			return
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			alert('Kích thước file không được vượt quá 5MB')
			return
		}

		const reader = new FileReader()
		reader.onload = (e) => {
			const newImage: UploadedImage = {
				file,
				preview: e.target?.result as string
			}
			setUploadedImage(newImage)
			onImageChange(newImage)
		}
		reader.readAsDataURL(file)
	}, [onImageChange])

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setDragActive(false)
		const file = e.dataTransfer.files[0]
		if (file) {
			handleFile(file)
		}
	}, [handleFile])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			handleFile(file)
		}
	}, [handleFile])

	const removeImage = useCallback(() => {
		setUploadedImage(null)
		onImageChange(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}, [onImageChange])

	const displayImage = uploadedImage?.preview || existingImage

	return (
		<div className="space-y-4">
			<div
				className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					dragActive
						? 'border-blue-400 bg-blue-50'
						: 'border-gray-300 hover:border-gray-400'
				}`}
				onDrop={handleDrop}
				onDragOver={(e) => {
					e.preventDefault()
					setDragActive(true)
				}}
				onDragLeave={() => setDragActive(false)}
			>
				<Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
				<p className="text-sm text-gray-600 mb-2">
					Kéo thả hình ảnh hoặc click để chọn
				</p>
				<p className="text-xs text-gray-500 mb-4">
					Hỗ trợ JPG, PNG, GIF (tối đa 5MB)
				</p>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleInputChange}
					className="hidden"
				/>
				<Button
					type="button"
					variant="outline"
					onClick={() => fileInputRef.current?.click()}
				>
					Chọn Hình Ảnh
				</Button>
			</div>

			{/* Preview uploaded image */}
			{displayImage && (
				<div className="relative group">
					<div className="aspect-square w-32 rounded-lg overflow-hidden bg-gray-100">
						<img
							src={displayImage}
							alt="Preview"
							className="w-full h-full object-cover"
						/>
					</div>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={removeImage}
					>
						<X className="h-4 w-4" />
					</Button>
					<div className="absolute bottom-2 left-2">
						<Badge variant="secondary" className="text-xs">
							<ImageIcon className="h-3 w-3 mr-1" />
							Hình ảnh
						</Badge>
					</div>
				</div>
			)}
		</div>
	)
}
