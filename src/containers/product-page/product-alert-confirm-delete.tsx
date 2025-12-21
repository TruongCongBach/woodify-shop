import {
	AlertDialog, AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription,
	AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/ui/shadcn-ui/alert-dialog'

type Props = {
	selectedProductId: string | null
	setSelectedProductId: (id: string | null) => void
	handleDelete: () => Promise<void>
	isDeleting?: boolean
}
const ProductAlertConfirmDelete = ({
	selectedProductId,
	setSelectedProductId,
	handleDelete,
	isDeleting = false,
}: Props) => {
	return (<AlertDialog open={!!selectedProductId} onOpenChange={() => setSelectedProductId(null)}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Bạn có chắc muốn xoá sản phẩm này?</AlertDialogTitle>
				<AlertDialogDescription>
					Thao tác không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị mất.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Huỷ</AlertDialogCancel>
				<AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
					{isDeleting ? 'Đang xoá...' : 'Xác nhận xoá'}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>)
}
export default ProductAlertConfirmDelete
