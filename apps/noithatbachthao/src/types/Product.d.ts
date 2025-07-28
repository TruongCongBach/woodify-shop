interface ProductAttribute  {
	key: string
	value: string
	unit?: string
}

interface MediaItem {
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
	originalPrice: string
}

interface ProductDataBase {
	id: string
	name: string
	url: string
	default_image?: string
	price?: string
	original_price?: string
	description?: string
	short_description?: string
	category_id: string
	media?: MediaItem[]
	attributes?: ProductAttribute[]
	tags?: string[]
}
