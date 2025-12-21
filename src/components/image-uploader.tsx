'use client'

import { useState, ChangeEvent, useEffect } from 'react'

interface ImageUploaderProps {
	multiple?: boolean
	defaultUrls?: string[] // URLs khi edit (ảnh cũ)
	onChange: (files: File[]) => void
}

export function ImageUploader({ multiple = false, defaultUrls = [], onChange }: ImageUploaderProps) {
	const [previews, setPreviews] = useState<string[]>([])

	useEffect(() => {
		if (defaultUrls.length > 0) {
			setPreviews(defaultUrls)
		}
	}, [defaultUrls])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		if (!files.length) return

		const urls = files.map((file) => URL.createObjectURL(file))
		setPreviews(urls)
		onChange(files)
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2 flex-wrap">
				{previews.map((url, index) => (
					<img
						key={index}
						src={url}
						alt={`preview-${index}`}
						className="w-24 h-24 rounded object-cover border"
					/>
				))}
			</div>
			<input type="file" accept="image/*" multiple={multiple} onChange={handleChange} />
		</div>
	)
}
