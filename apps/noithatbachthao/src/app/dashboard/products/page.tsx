'use client'

import { Button } from '@woodify/ui/shadcn-ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@woodify/ui/shadcn-ui/table'
import { Skeleton } from '@woodify/ui/shadcn-ui/skeleton'
import Link from 'next/link'
import { useProducts } from '@/hooks/useProducts'
import ProductAlertConfirmDelete from '@/containers/product-page/product-alert-confirm-delete'
import { deleteProduct } from '@/services/product/delete-product'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProductListPage() {
	const { data: products, isLoading, mutate } = useProducts()
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const router = useRouter()


	const handleDelete = async () => {
		if (!selectedProductId) return
		try {
			setIsDeleting(true)
			await deleteProduct(selectedProductId)
			mutate()
		} catch (err) {
			console.error('Delete error:', err)
			alert('Xoá thất bại.')
		} finally {
			setIsDeleting(false)
			setSelectedProductId(null)
		}
	}


	return (
		<div className="p-6 space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<Link href="/dashboard/products/create">
					<Button>Add Product</Button>
				</Link>
			</div>

			<div className="border rounded-lg w-full">
				<Table>
					<TableHeader className="hidden md:table-header-group">
						<TableRow>
							<TableHead className="w-[80px]">Image</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead className="w-[140px] text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading &&
							[...Array(5)].map((_, i) => (
								<TableRow key={i}>
									<TableCell><Skeleton className="h-12 w-12 rounded-md"/></TableCell>
									<TableCell><Skeleton className="h-4 w-32"/></TableCell>
									<TableCell><Skeleton className="h-4 w-16"/></TableCell>
									<TableCell></TableCell>
								</TableRow>
							))
						}

						{products?.map((product: Product) => (
							<TableRow key={product.id} className="block md:table-row border-b md:border-b-0">
								<TableCell className="flex items-center justify-between md:table-cell">
									<span className="font-bold md:hidden mr-2">Image</span>
									<img
										src={product.defaultImage}
										alt={product.name}
										width={48}
										height={48}
										className="rounded-md object-cover"
									/>
								</TableCell>
								<TableCell className="block md:table-cell">
									<span className="font-bold md:hidden mr-2">Name:</span>
									{product.name}
								</TableCell>
								<TableCell className="block md:table-cell">
									<span className="font-bold md:hidden mr-2">Price:</span>
									{product.price} ₫
								</TableCell>
								<TableCell className="block md:table-cell text-right space-x-2">
									<Link href={`/dashboard/products/${product.id}`}>
										<Button size="sm" variant="outline">Edit</Button>
									</Link>
									<Button onClick={() => setSelectedProductId(product.id)} size="sm" variant="destructive">Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<ProductAlertConfirmDelete
				selectedProductId={selectedProductId}
				setSelectedProductId={setSelectedProductId}
				handleDelete={handleDelete}
				isDeleting={isDeleting}
			/>
		</div>
	)
}
