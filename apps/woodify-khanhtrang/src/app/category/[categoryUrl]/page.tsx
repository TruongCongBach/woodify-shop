import { notFound } from 'next/navigation'
import { categoriesMock } from '@/data/categoriesMock'
import CategoryPageClient from '@/app/category/[categoryUrl]/page.client'

type Props = {
	params: Promise<{ categoryUrl: string | string[] }>;
}

export default async function CategoryPage(props: Props) {
	const { categoryUrl } = await props.params;
	const slug = Array.isArray(categoryUrl)
		? categoryUrl[categoryUrl.length - 1]
		: categoryUrl || '';

	const category = categoriesMock.find(c => c.url === slug)

	if (!category) {
		notFound()
	}

	return <CategoryPageClient category={category}/>
}
