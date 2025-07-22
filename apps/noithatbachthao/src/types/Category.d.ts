interface Category {
	id: string
	name: string
	image?: string
	url: string
	description?: string
	showInNav?: boolean
	parentId?: string | null
}


interface CategoryTree extends Category {
	children?: CategoryTree[]
}


interface CategoryDataBase {
	id: string
	name: string
	image?: string
	url: string
	description?: string
	show_in_nav?: boolean
	parent_id?: string | null
}
