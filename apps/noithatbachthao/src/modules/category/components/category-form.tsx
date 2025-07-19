'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@woodify/ui/shadcn-ui/form'
import { Input } from '@woodify/ui/shadcn-ui/input'
import { Textarea } from '@woodify/ui/shadcn-ui/textarea'
import { SubCategorySelect } from '@/modules/category/components/sub-category-select'
import { Button } from '@woodify/ui/shadcn-ui/button'

const categorySchema = z.object({
	name: z.string().min(1, 'Bắt buộc'),
	url: z.string().min(1, 'Bắt buộc'),
	image: z.string().optional(),
	description: z.string().optional(),
	children: z.array(z.string()).optional(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
	initialValues?: CategoryFormData
	categories: {id: string; name: string}[]
	onSubmitAction: (data: CategoryFormData, selectedFile: File | undefined) => void
	onCancel?: () => void
	loading?: boolean
	isEditing?: boolean
}

export function CategoryForm({
	initialValues,
	categories,
	onSubmitAction,
	onCancel,
	loading = false,
	isEditing = false,
}: CategoryFormProps) {
	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			url: '',
			image: '',
			description: '',
			children: [],
		},
	})

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | undefined>()

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		setSelectedFile(file)
		setPreviewUrl(URL.createObjectURL(file))
	}

	useEffect(() => {
		if (initialValues) {
			form.reset(initialValues)
			if (initialValues.image) {
				setPreviewUrl(initialValues.image)
			}
		}
	}, [initialValues, form])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit((data) => onSubmitAction(data, selectedFile))} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên danh mục</FormLabel>
							<FormControl>
								<Input placeholder="VD: Bàn ghế phòng khách" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL Slug</FormLabel>
							<FormControl>
								<Input placeholder="VD: ban-ghe" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={() => (
						<FormItem>
							<FormLabel>Hình ảnh</FormLabel>
							<FormControl>
								<div className="space-y-2">
									{previewUrl && (
										<img
											src={previewUrl}
											alt="Preview"
											className="h-24 rounded border object-cover"
										/>
									)}
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
									/>
								</div>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mô tả</FormLabel>
							<FormControl>
								<Textarea placeholder="Mô tả ngắn..." {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="children"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Danh mục con</FormLabel>
							<FormControl>
								<SubCategorySelect
									value={field.value || []}
									onChange={field.onChange}
									options={categories}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<Button type="submit" disabled={loading}>
						{isEditing ? 'Cập nhật' : 'Tạo mới'}
					</Button>
					{isEditing && onCancel && (
						<Button type="button" variant="ghost" onClick={onCancel}>
							Huỷ
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
