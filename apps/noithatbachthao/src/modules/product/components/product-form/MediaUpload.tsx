
// Media Upload Component
import React, { useCallback, useState } from 'react'
import { Image, Upload, Video, X } from 'lucide-react'
import { Label } from '@woodify/ui/shadcn-ui/label'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Badge } from '@woodify/ui/shadcn-ui/badge'

export interface UploadedMedia {
	type: 'image' | 'video'
	files: File[]
	previews: string[]
}

interface MediaUploadProps {
	onMediaChange: (media: UploadedMedia) => void
	existingMedia?: MediaItem[]
	maxFiles?: number
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
	onMediaChange,
	existingMedia = [],
	maxFiles = 10
}) => {
	const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia>({
		type: 'image',
		files: [],
		previews: []
	})
	const [dragActive, setDragActive] = useState(false)
	const fileInputRef = React.useRef<HTMLInputElement>(null)

	const handleFiles = useCallback((files: FileList | File[]) => {
		const fileArray = Array.from(files)
		const validFiles = fileArray.filter(file =>
			file.type.startsWith('image/') || file.type.startsWith('video/')
		).slice(0, maxFiles)

		if (validFiles.length === 0) return

		const newPreviews: string[] = []
		const processedFiles: File[] = []
		let processedCount = 0

		validFiles.forEach(file => {
			const reader = new FileReader()
			reader.onload = (e) => {
				newPreviews.push(e.target?.result as string)
				processedFiles.push(file)
				processedCount++

				if (processedCount === validFiles.length) {
					const mediaType = validFiles[0].type.startsWith('image/') ? 'image' : 'video'
					const newMedia: UploadedMedia = {
						type: mediaType,
						files: processedFiles,
						previews: newPreviews
					}
					setUploadedMedia(newMedia)
					onMediaChange(newMedia)
				}
			}
			reader.readAsDataURL(file)
		})
	}, [maxFiles, onMediaChange])

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setDragActive(false)
		if (e.dataTransfer.files) {
			handleFiles(e.dataTransfer.files)
		}
	}, [handleFiles])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('sss')
		if (e.target.files) {
			handleFiles(e.target.files)
		}
	}, [handleFiles])

	const removeFile = useCallback((index: number) => {
		const newFiles = uploadedMedia.files.filter((_, i) => i !== index)
		const newPreviews = uploadedMedia.previews.filter((_, i) => i !== index)

		const updatedMedia = {
			...uploadedMedia,
			files: newFiles,
			previews: newPreviews
		}
		setUploadedMedia(updatedMedia)
		onMediaChange(updatedMedia)
	}, [uploadedMedia, onMediaChange])

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
					Kéo thả files hoặc click để chọn
				</p>
				<p className="text-xs text-gray-500 mb-4">
					Hỗ trợ hình ảnh và video (tối đa {maxFiles} files)
				</p>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept="image/*,video/*"
					onChange={handleInputChange}
					className="hidden"
					id="media-upload"
				/>
				<Label htmlFor="media-upload">
					<Button
						onClick={() => fileInputRef.current?.click()}
						type="button" variant="outline" className="cursor-pointer">
						Chọn Files
					</Button>
				</Label>
			</div>

			{/* Preview uploaded files */}
			{uploadedMedia.files.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{uploadedMedia.previews.map((preview, index) => (
						<div key={index} className="relative group">
							<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
								{uploadedMedia.files[index].type.startsWith('image/') ? (
									<img
										src={preview}
										alt={`Upload ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								) : (
									<video
										src={preview}
										className="w-full h-full object-cover"
										controls
									/>
								)}
							</div>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => removeFile(index)}
							>
								<X className="h-4 w-4" />
							</Button>
							<div className="absolute bottom-2 left-2">
								<Badge variant="secondary" className="text-xs">
									{uploadedMedia.files[index].type.startsWith('image/') ? (
										<Image className="h-3 w-3 mr-1" />
									) : (
										<Video className="h-3 w-3 mr-1" />
									)}
									{uploadedMedia.type}
								</Badge>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Show existing media */}
			{existingMedia.length > 0 && (
				<div>
					<h4 className="text-sm font-medium mb-2">Media hiện tại:</h4>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{existingMedia.map((media, index) => (
							<div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
								{media.type === 'image' ? (
									<img
										src={media.src}
										alt={media.alt || `Media ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								) : (
									<video
										src={media.src}
										className="w-full h-full object-cover"
										controls
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

