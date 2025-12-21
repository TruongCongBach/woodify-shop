'use client'
import { useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/shadcn-ui/table'
import { Button } from '@/ui/shadcn-ui/button'
import { Skeleton } from '@/ui/shadcn-ui/skeleton'
import { Card } from '@/ui/shadcn-ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/ui/shadcn-ui/dialog'
import { Checkbox } from '@/ui/shadcn-ui/checkbox'
import { deleteCategory } from '@/services/category'
import { useCategories } from '@/hooks/useCategories'

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
				<div className="border rounded-lg w-full">
					<Table>
						<TableHeader className="hidden md:table-header-group">
							<TableRow>
								<TableHead className="w-[180px]">Hiện thị trên Menu</TableHead>
								<TableHead>Tên danh mục</TableHead>
								<TableHead className="hidden md:table-cell">Mô tả</TableHead>
								<TableHead className="text-right w-[160px]">Hành động</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories?.map((cat) => (
								<TableRow key={cat.id} className="block md:table-row border-b md:border-b-0">
									<TableCell className="flex items-center justify-between md:table-cell md:text-center">
										<span className="font-bold md:hidden mr-2">Hiện thị trên Menu:</span>
										<Checkbox defaultChecked={cat.showInNav}/>
									</TableCell>
									<TableCell className="block md:table-cell">
										<span className="font-bold md:hidden mr-2">Tên danh mục:</span>
										{cat.name}
									</TableCell>
									<TableCell className="block md:table-cell">
										<span className="font-bold md:hidden mr-2">Mô tả:</span>
										{cat.description}
									</TableCell>
									<TableCell className="block md:table-cell text-right space-x-2">
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
														Bạn có chắc chắn muốn xóa danh mục <b>{cat.name}</b> không? Hành động này không thể hoàn tác.
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
				</div>
			)}
		</Card>
	)
}
