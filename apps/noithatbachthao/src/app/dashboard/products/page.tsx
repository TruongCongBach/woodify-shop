'use client'

import { useProducts } from '@/modules/product/hooks/useProducts'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@woodify/ui/shadcn-ui/table'
import { Skeleton } from '@woodify/ui/shadcn-ui/skeleton'
import Link from 'next/link'

export default function ProductListPage() {
	const { data: products, isLoading } = useProducts()


	return (
		<div className="p-6 space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<Link href="/dashboard/products/create">
					<Button>Add Product</Button>
				</Link>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80px]">Image</TableHead>
						<TableHead>Name</TableHead>
						<TableHead className="hidden md:table-cell">Description</TableHead>
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
								<TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-64"/></TableCell>
								<TableCell><Skeleton className="h-4 w-16"/></TableCell>
								<TableCell></TableCell>
							</TableRow>
						))
					}

					{products?.map((product) => (
						<TableRow key={product.id}>
							<TableCell>
								<img
									src={product.defaultImage}
									alt={product.name}
									width={48}
									height={48}
									className="rounded-md object-cover"
								/>
							</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell className="hidden md:table-cell truncate">{product.shortDescription || '-'}</TableCell>
							<TableCell>{product.price} ₫</TableCell>
							<TableCell className="text-right space-x-2">
								<Link href={`/dashboard/products/${product.id}`}>
									<Button size="sm" variant="outline">Edit</Button>
								</Link>
								{/* TODO: Add Delete logic here */}
								<Button size="sm" variant="destructive">Delete</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
