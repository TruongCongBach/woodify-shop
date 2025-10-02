'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Input } from '@woodify/ui/shadcn-ui/input'
import { Textarea } from '@woodify/ui/shadcn-ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@woodify/ui/shadcn-ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@woodify/ui/shadcn-ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@woodify/ui/shadcn-ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@woodify/ui/shadcn-ui/form'
import { MediaUpload, UploadedMedia } from './MediaUpload'
import { AttributesManager } from './AttributesManager'
import { DefaultImageSelector } from './DefaultImageSelector'
import { TagsInput } from './TagsInput'
import { AIDescriptionGenerator } from './AIDescriptionGenerator'

import { toast } from 'sonner'
import { checkProductUrlExists } from '@/utils/check-product-url-exists'
import { slugify } from '@/utils/slugify'

// Validation Schema
const productSchema = z.object({
	name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
	url: z.string().min(1, 'URL là bắt buộc'),
	price: z.string().min(1, 'Giá bán là bắt buộc'),
	originalPrice: z.string().optional(),
	description: z.string().optional(),
	shortDescription: z.string().optional(),
	categoryId: z.string().min(1, 'Danh mục là bắt buộc'),
	defaultImage: z.string().optional(),
	attributes: z.array(z.object({
		key: z.string().min(1, 'Key is required'),
		value: z.string().min(1, 'Value is required'),
		unit: z.string().optional(),
	})).optional(),
	tags: z.array(z.string()).optional(),
})

export type ProductFormData = z.infer<typeof productSchema>

// Main ProductForm Component
interface ProductFormProps {
	product?: Product
	categories: Category[]
	onSubmitAction: (data: ProductFormData, media: UploadedMedia) => void
	onCancel?: () => void
	loading?: boolean
}

export const ProductForm: React.FC<ProductFormProps> = ({
	product,
	categories,
	onSubmitAction,
	onCancel,
	loading = false,
}) => {
	const [isGeneratingUrl, setIsGeneratingUrl] = useState(false)
	const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia>({
		type: 'image',
		files: [],
		previews: [],
	})

	const form = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: product?.name || '',
			url: product?.url || '',
			price: product?.price ? `${product?.price}` : '',
			originalPrice: product?.originalPrice ? `${product.originalPrice}` : '',
			description: product?.description || '',
			shortDescription: product?.shortDescription || '',
			categoryId: product?.categoryId || '',
			defaultImage: product?.defaultImage || '',
			attributes: product?.attributes || [],
			tags: product?.tags || [],
		},
	})

	const availableImages = useMemo(() => {
		const existingImages = product?.media?.filter(m => m.type === 'image').map(m => m.src) || []
		const newImages = uploadedMedia.previews.filter((_, index) =>
			uploadedMedia.files[index]?.type.startsWith('image/'),
		)
		return [...existingImages, ...newImages]
	}, [product?.media, uploadedMedia])

	const handleSubmit = useCallback((data: ProductFormData) => {
		onSubmitAction(data, uploadedMedia)
	}, [onSubmitAction, uploadedMedia])

	const handleMediaChange = useCallback((media: UploadedMedia) => {
		setUploadedMedia(media)
	}, [])

	const handleGenerateUrl = async () => {
		const name = form.getValues('name')
		if (!name) {
			toast.error('Vui lòng nhập tên sản phẩm trước khi tạo URL.')
			return
		}

		setIsGeneratingUrl(true)
		try {
			let finalUrl = slugify(name)
			let counter = 2
			// Check if the URL exists, excluding the current product's ID if we are editing
			while (await checkProductUrlExists(finalUrl, product?.id)) {
				finalUrl = `${slugify(name)}-${counter}`
				counter++
			}

			form.setValue('url', finalUrl, { shouldValidate: true })
			toast.success('Đã tạo URL thành công!')
		} catch (error) {
			console.error('Error generating URL:', error)
			toast.error('Đã xảy ra lỗi khi tạo URL. Vui lòng thử lại.')
		} finally {
			setIsGeneratingUrl(false)
		}
	}

	const handleDescriptionGenerated = useCallback((shortDescription: string, description: string) => {
		if (shortDescription) {
			form.setValue('shortDescription', shortDescription, { shouldValidate: true })
		}
		if (description) {
			form.setValue('description', description, { shouldValidate: true })
		}
	}, [form])

	const getCategoryName = () => {
		const categoryId = form.watch('categoryId')
		return categories.find(cat => cat.id === categoryId)?.name || ''
	}

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					{product ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}
				</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<Tabs defaultValue="basic" className="w-full">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
							<TabsTrigger value="media">Media</TabsTrigger>
							<TabsTrigger value="attributes">Thuộc tính</TabsTrigger>
							<TabsTrigger value="seo">SEO & Tags</TabsTrigger>
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
													<FormLabel>Tên sản phẩm</FormLabel>
													<FormControl>
														<Input placeholder="Nhập tên sản phẩm" {...field} />
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
													<FormLabel>URL</FormLabel>
													<div className="flex items-center gap-2">
														<FormControl>
															<Input placeholder="product-url" {...field} />
														</FormControl>
														<Button
															type="button"
															variant="outline"
															onClick={handleGenerateUrl}
															disabled={!form.watch('name') || isGeneratingUrl}
														>
															{isGeneratingUrl ? 'Đang tạo...' : 'Tạo URL'}
														</Button>
													</div>
													<FormMessage/>
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Giá bán</FormLabel>
													<FormControl>
														<Input placeholder="0" {...field} />
													</FormControl>
													<FormMessage/>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="originalPrice"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Giá gốc (Tùy chọn)</FormLabel>
													<FormControl>
														<Input placeholder="0" {...field} />
													</FormControl>
													<FormMessage/>
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="categoryId"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Danh mục</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Chọn danh mục"/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{categories.map((category) => (
																<SelectItem key={category.id} value={category.id}>
																	{category.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage/>
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="shortDescription"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mô tả ngắn</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Mô tả ngắn gọn về sản phẩm"
														className="resize-none"
														rows={3}
														{...field}
													/>
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
												<FormLabel>Mô tả chi tiết</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Mô tả chi tiết về sản phẩm"
														className="resize-none"
														rows={6}
														{...field}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>

									<AIDescriptionGenerator
										productName={form.watch('name') || ''}
										categoryName={getCategoryName()}
										attributes={form.watch('attributes') || []}
										onDescriptionGenerated={handleDescriptionGenerated}
										disabled={loading}
									/>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="media" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Upload Media</CardTitle>
								</CardHeader>
								<CardContent>
									<MediaUpload
										onMediaChange={handleMediaChange}
										existingMedia={product?.media}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Chọn ảnh mặc định</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="defaultImage"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<DefaultImageSelector
														images={availableImages}
														selectedImage={field.value || ''}
														onSelect={field.onChange}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="attributes" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Thuộc tính sản phẩm</CardTitle>
								</CardHeader>
								<CardContent>
									<AttributesManager
										attributes={form.watch('attributes') || []}
										onChange={(attributes) => form.setValue('attributes', attributes)}
									/>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="seo" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Tags</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="tags"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tags sản phẩm</FormLabel>
												<FormControl>
													<TagsInput
														tags={field.value || []}
														onChange={field.onChange}
													/>
												</FormControl>
												<p className="text-sm text-muted-foreground">
													Lưu ý: Các tag như <b className="text-red-500">Mới</b>, <b className="text-yellow-500">Giảm giá</b>, <b className="text-green-500">Freeship</b> sẽ có màu sắc đặc biệt.
												</p>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>

					<div className="flex justify-end gap-4 pt-6 border-t">
						{onCancel && (
							<Button type="button" variant="outline" onClick={onCancel}>
								Hủy
							</Button>
						)}
						<Button type="submit" disabled={loading}>
							{loading ? 'Đang xử lý...' : (product ? 'Cập nhật' : 'Tạo sản phẩm')}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default ProductForm
