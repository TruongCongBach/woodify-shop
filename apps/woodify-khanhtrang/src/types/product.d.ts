type ProductAttribute = {
	key: string
	value: string
	unit?: string
}

interface Product {
	url: string
	id: string
	name: string
	defaultImage: string
	images: string[]
	price: string
	description: string
	shortDescription?: string
	categoryId: string
	attributes?: ProductAttribute[]
	tags?: string[]
	variants?: any[]
}
