import { supabase } from '@/lib/supabase'

/**
 * Lấy danh sách khóa attribute (tên thuộc tính) theo categoryId
 */
export async function getAttributeByCategory(categoryId: string): Promise<any> {
  const { data, error } = await supabase
    .from('product_attributes')
    .select('key, id, unit, value')
    .eq('category_id', categoryId)
    .order('key', { ascending: true })

  if (error) {
    console.error('Error fetching attribute keys by category:', error)
    throw error
  }

  return data
}
