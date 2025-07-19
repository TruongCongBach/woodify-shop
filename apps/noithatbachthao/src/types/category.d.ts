interface Category {
	id: string
	name: string
	image?: string
	url: string
	description?: string
}


interface CategoryTree extends Category {
	children?: CategoryTree[]
}
