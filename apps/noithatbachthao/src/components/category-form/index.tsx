'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Input } from '@woodify/ui/shadcn-ui/input'
import { Textarea } from '@woodify/ui/shadcn-ui/textarea'
import { Checkbox } from '@woodify/ui/shadcn-ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@woodify/ui/shadcn-ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@woodify/ui/shadcn-ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@woodify/ui/shadcn-ui/form'
import { ImageUpload, UploadedImage } from './ImageUpload'
import { SubCategoriesManager } from './SubCategoriesManager'


// Validation Schema
const categorySchema = z.object({
	name: z.string().min(1, 'Tên danh mục là bắt buộc'),
	url: z.string()
	.min(1, 'URL slug là bắt buộc')
	.regex(/^[a-z0-9-]+$/, 'URL slug chỉ được chứa chữ thường, số và dấu gạch ngang'),
	image: z.string().optional(),
	description: z.string().optional(),
	children: z.array(z.string()).optional(),
	showInNav: z.boolean(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

// Main CategoryForm Component
interface CategoryFormProps {
	initialValues?: Partial<CategoryFormData>
	categories: Category[]
	onSubmitAction: (data: CategoryFormData, selectedFile: File | undefined) => void
	onCancel?: () => void
	loading?: boolean
	isEditing?: boolean
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
	initialValues,
	categories,
	onSubmitAction,
	onCancel,
	loading = false,
	isEditing = false
}) => {
	const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)

	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			url: '',
			image: '',
			description: '',
			children: [],
			showInNav: false,
			...initialValues,
		}
	})

	// Auto generate URL slug from name
	const watchedName = form.watch('name')
	useEffect(() => {
		if (watchedName && !isEditing) {
			const slug = watchedName
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
			.replace(/[đĐ]/g, 'd')
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim()
			form.setValue('url', slug)
		}
	}, [watchedName, form, isEditing])

	const handleSubmit = useCallback((data: CategoryFormData) => {
		onSubmitAction(data, uploadedImage?.file)
	}, [onSubmitAction, uploadedImage])

	const handleImageChange = useCallback((image: UploadedImage | null) => {
		setUploadedImage(image)
	}, [])

	// Reset form when initialValues change
	useEffect(() => {
		if (initialValues) {
			form.reset({
				name: '',
				url: '',
				image: '',
				description: '',
				children: [],
				showInNav: false,
				...initialValues,
			})
		}
	}, [initialValues, form])

	// Cleanup preview URL on unmount
	useEffect(() => {
		return () => {
			if (uploadedImage?.preview && uploadedImage.preview.startsWith('blob:')) {
				URL.revokeObjectURL(uploadedImage.preview)
			}
		}
	}, [uploadedImage])

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					{isEditing ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
				</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<Tabs defaultValue="basic" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
							<TabsTrigger value="media">Hình ảnh</TabsTrigger>
							<TabsTrigger value="settings">Cài đặt</TabsTrigger>
						</TabsList>

						<TabsContent value="basic" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Thông tin cơ bản</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Tên danh mục *</FormLabel>
													<FormControl>
														<Input
															placeholder="VD: Bàn ghế phòng khách"
															{...field}
															disabled={loading}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="url"
											render={({ field }) => (
												<FormItem>
													<FormLabel>URL Slug *</FormLabel>
													<FormControl>
														<Input
															placeholder="VD: ban-ghe-phong-khach"
															{...field}
															disabled={loading}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mô tả</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Mô tả ngắn về danh mục..."
														{...field}
														disabled={loading}
														rows={4}
														className="resize-none"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="media" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Hình ảnh danh mục</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="image"
										render={() => (
											<FormItem>
												<FormControl>
													<ImageUpload
														onImageChange={handleImageChange}
														existingImage={initialValues?.image}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="settings" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Cài đặt hiển thị</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<FormField
										control={form.control}
										name="showInNav"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={loading}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														Hiển thị trong menu điều hướng
													</FormLabel>
													<p className="text-sm text-muted-foreground">
														Danh mục này sẽ xuất hiện trong menu chính của website
													</p>
												</div>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Danh mục con</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="children"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Chọn danh mục con</FormLabel>
												<FormControl>
													<SubCategoriesManager
														selectedCategories={field.value || []}
														categories={categories}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>

					<div className="flex justify-end gap-4 pt-6 border-t">
						{onCancel && (
							<Button
								type="button"
								variant="outline"
								onClick={onCancel}
								disabled={loading}
							>
								Hủy
							</Button>
						)}
						<Button type="submit" disabled={loading}>
							{loading ? 'Đang xử lý...' : (isEditing ? 'Cập nhật' : 'Tạo danh mục')}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}


