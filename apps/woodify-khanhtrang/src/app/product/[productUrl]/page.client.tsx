'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink, BreadcrumbList,
	BreadcrumbSeparator,
} from '@woodify/ui/components/breadcrumb'
import { ProductGallery } from '@/components/product-gallery'
import { ProductCard } from '@/components/product-card'
import { productsMock } from '@/data/productsMock'
import { categoriesMock } from '@/data/categoriesMock'
import { formatPrice } from '@/utils/formatPrice'
import { HomeIcon } from '@heroicons/react/24/outline'

const reviews = [
	{ id: 1, author: 'Nguyễn A', rating: 5, comment: 'Rất đẹp!' },
	{ id: 2, author: 'Trần B', rating: 4, comment: 'Sản phẩm chắc chắn, đóng gói cẩn thận.' },
]

export default function ProductPageClient() {
	const { productId } = useParams() as {productId: string}
	const product = productsMock.find(p => p.id === productId)
	const [qty, setQty] = useState(1)

	if (!product) {
		return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold">Sản phẩm không tồn
			tại.</div>
	}

	const category = categoriesMock.find(c => c.id === product.categoryId)
	const relatedProducts = productsMock
	.filter(p => p.id !== product.id && p.categoryId === product.categoryId)
	.slice(0, 4)

	return (
		<div className="container mx-auto px-4 py-8 space-y-12">
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="flex gap-x-2 items-center">
							<HomeIcon className="h-4 w-4" />Home
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator/>
					<BreadcrumbItem>
						<BreadcrumbLink href={`/product/${product.url}`}>{product.name}</BreadcrumbLink>
					</BreadcrumbItem>

				</BreadcrumbList>
			</Breadcrumb>

			{/* Gallery + Info */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<ProductGallery images={product.images}/>
				<div className="space-y-5">
					<h1 className="text-3xl font-bold">{product.name}</h1>
					<p className="text-2xl text-red-600 font-semibold">{formatPrice(product.price)}</p>
					<div className="flex items-center space-x-3">
						<label htmlFor="qty" className="text-sm font-medium">Số lượng:</label>
						<input
							id="qty"
							type="number"
							min={1}
							value={qty}
							onChange={e => setQty(Number(e.target.value))}
							className="w-20 border rounded px-2 py-1"
						/>
					</div>
					<button className="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark transition">
						Thêm vào giỏ hàng
					</button>
				</div>
			</div>

			{/* Description */}
			<div className="border-t pt-6">
				<h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
				<p className="text-gray-700">{product.description}</p>
			</div>

			{/* Reviews */}
			<div>
				<h2 className="text-xl font-semibold mb-4">Đánh giá của khách hàng</h2>
				{reviews.length === 0 ? (
					<p className="text-gray-500">Chưa có đánh giá nào.</p>
				) : (
					<div className="space-y-4">
						{reviews.map(r => (
							<div key={r.id} className="border-b pb-3">
								<div className="text-sm font-medium">{r.author}</div>
								<div className="text-yellow-500 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
								<p className="text-gray-700">{r.comment}</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Related products */}
			{relatedProducts.length > 0 && (
				<div>
					<h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{relatedProducts.map(p => (
							<ProductCard key={p.id} product={p}/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
