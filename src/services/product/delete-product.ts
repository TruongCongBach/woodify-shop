// src/services/product-service.ts

import { supabase } from '@/lib/supabase'

export async function deleteProduct(id: string): Promise<void> {
	// Xóa các thuộc tính sản phẩm trước
	const { error: attrError } = await supabase
	.from('product_attributes')
	.delete()
	.eq('product_id', id)

	if (attrError) throw attrError

	// Sau đó xóa sản phẩm chính
	const { error: prodError } = await supabase
	.from('products')
	.delete()
	.eq('id', id)

	if (prodError) throw prodError
}
