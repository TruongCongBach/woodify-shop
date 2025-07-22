import { getProductByCategoryId } from "@/services/getProductByCategoryId";
import useSWR from "swr";
import { transformProductToFormData } from '@/utils/transformProductToFormData'

export const useProductByCategoryId = (categoryId: string) => {
	const fn = useSWR(
		categoryId ? `/api/products/category/${categoryId}` : null,
		() => getProductByCategoryId(categoryId, {
			page: 1,
			pageSize: 10, // You can adjust this as needed
		})
	);

	if (fn.error) {
		console.error('Error fetching products by category ID:', fn.error);
		throw fn.error;
	}

	return {
		...fn,
		data: fn.data?.map(transformProductToFormData) || [],
	}
}
