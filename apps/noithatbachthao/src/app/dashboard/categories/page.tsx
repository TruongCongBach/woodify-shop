'use client'

import { useState } from 'react'
import { useCategories } from '@/modules/category/hooks/useCategories'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@woodify/ui/shadcn-ui/table'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Skeleton } from '@woodify/ui/shadcn-ui/skeleton'
import { Card } from '@woodify/ui/shadcn-ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteCategory } from '@/modules/category/services'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@woodify/ui/shadcn-ui/dialog'

export default function CategoriesPage() {
	const { data: categories, isLoading, mutate } = useCategories()
	const router = useRouter()
	const [openDialogId, setOpenDialogId] = useState<string | null>(null)
	const [loadingId, setLoadingId] = useState<string | null>(null)

	const handleDelete = async (id: string) => {
		try {
			setLoadingId(id)
			await deleteCategory(id)
			toast.success('Đã xóa danh mục thành công')
			mutate()
		} catch (err) {
			console.error(err)
			toast.error('Xóa danh mục thất bại')
		} finally {
			setLoadingId(null)
			setOpenDialogId(null)
		}
	}

	return (
		<Card className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">Danh sách danh mục</h1>
				<Button onClick={() => router.push('/dashboard/categories/create')}>
					+ Thêm danh mục
				</Button>
			</div>

			{isLoading ? (
				<div className="space-y-3">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên danh mục</TableHead>
							<TableHead>Mô tả</TableHead>
							<TableHead className="text-right">Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories?.map((cat) => (
							<TableRow key={cat.id}>
								<TableCell>{cat.name}</TableCell>
								<TableCell>{cat.description}</TableCell>
								<TableCell className="text-right space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => router.push(`/dashboard/categories/${cat.id}`)}
									>
										Sửa
									</Button>

									<Dialog open={openDialogId === cat.id} onOpenChange={(open) => setOpenDialogId(open ? cat.id : null)}>
										<DialogTrigger asChild>
											<Button
												variant="destructive"
												size="sm"
											>
												Xóa
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Xác nhận xóa</DialogTitle>
												<DialogDescription>
													Bạn có chắc chắn muốn xóa danh mục "{cat.name}" không? Hành động này không thể hoàn tác.
												</DialogDescription>
											</DialogHeader>
											<DialogFooter className="gap-2">
												<Button variant="outline" onClick={() => setOpenDialogId(null)}>
													Hủy
												</Button>
												<Button
													variant="destructive"
													disabled={loadingId === cat.id}
													onClick={() => handleDelete(cat.id)}
												>
													{loadingId === cat.id ? 'Đang xóa...' : 'Xác nhận xóa'}
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</Card>
	)
}
