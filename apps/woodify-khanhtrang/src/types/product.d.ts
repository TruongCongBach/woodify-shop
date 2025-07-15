type ProductAttribute = {
	key: string
	value: string
	unit?: string
}

type MediaItem = {
	src: string
	type: 'image' | 'video'
	alt?: string
}

interface Product {
	url: string
	id: string
	name: string
	defaultImage: string
	media: MediaItem[]
	price: string
	description: string
	shortDescription?: string
	categoryId: string
	attributes?: ProductAttribute[]
	tags?: string[]
}
