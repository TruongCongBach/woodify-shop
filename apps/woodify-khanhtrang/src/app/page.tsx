'use client'

import React from 'react'
import { HeroSlider } from '@woodify/ui/shadcn-ui/HeroSlider'
import { ProductSection } from '@/components/product-section'
import { ProductCarousel } from '@/components/product-carousel'
import PRODUCTS_KE_TIVI from '@/data/products-ke-tivi'
import { getProducts } from '@/modules/product/services/products/getProducts'


export const runtime = 'edge'

const slides = [
	{
		image: 'https://picsum.photos/1200/600?random=1',
		title: 'Bàn ghế phòng khách',
		subtitle: 'Bền – Đẹp – Tiện nghi',
		cta: 'Xem ngay',
		ctaHref: '/ban-ghe',
	},
	{
		image: 'https://picsum.photos/1200/600?random=2',
		title: 'Tủ thờ cao cấp',
		subtitle: 'Tinh xảo từng chi tiết',
		cta: 'Khám phá',
		ctaHref: '/tu-tho',
	},
	{
		image: 'https://picsum.photos/1200/600?random=3',
		title: 'Vách thờ nghệ thuật',
		cta: 'Tìm hiểu',
		ctaHref: '/vach-tho',
	},
]

const allProducts: Product[] = [{"id":"1","name":"Bàn ghế A","defaultImage":"https://picsum.photos/400/300?random=4","price":"3200000","description":"Bộ bàn ghế chất liệu gỗ sồi tự nhiên","categoryId":"ban-ghe","attributes":[],"url":"/product/1","tags":["new"],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=4"}]},{"id":"2","name":"Tủ thờ B","defaultImage":"https://picsum.photos/400/300?random=5","price":"5500000","description":"Tủ thờ chạm trổ tinh xảo, gỗ gõ đỏ","categoryId":"tu-tho","attributes":[],"url":"/product/2","tags":["sale"],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=5"}]},{"id":"3","name":"Vách thờ C","defaultImage":"https://picsum.photos/400/300?random=6","price":"4800000","description":"Vách thờ gỗ công nghiệp MDF phủ veneer","categoryId":"vach-tho","attributes":[],"url":"/product/3","tags":[],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=6"}]},{"id":"4","name":"Tủ thờ Hưng Gia","defaultImage":"https://picsum.photos/400/300?random=7","price":"7600000","description":"Tủ thờ kiểu dáng truyền thống, gỗ hương","categoryId":"tu-tho","attributes":[],"url":"/product/4","tags":["freeship"],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=7"}]},{"id":"5","name":"Bàn ghế Minh Quốc","defaultImage":"https://picsum.photos/400/300?random=8","price":"9100000","description":"Bàn ghế phong cách Minh Quốc hiện đại","categoryId":"ban-ghe","attributes":[],"url":"/product/5","tags":["new","sale"],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=8"}]},{"id":"6","name":"Vách ngăn CNC","defaultImage":"https://picsum.photos/400/300?random=9","price":"2500000","description":"Vách ngăn CNC hiện đại, dễ thi công","categoryId":"vach-tho","attributes":[],"url":"/product/6","tags":["sale"],"media":[{"type":"image","src":"https://picsum.photos/400/300?random=9"}]}]

const featuredProducts = allProducts
const keTivis = PRODUCTS_KE_TIVI.filter(p => p.categoryId === 'ke-tivi').slice(0, 8)
const featuredAltProducts = allProducts.filter(p => p.categoryId !== 'ban-ghe')

export default async function Home() {
	const a = await getProducts()
	console.log(a)
	return (
		<div>
			<HeroSlider slides={slides} />

			<div className="max-w-7xl mx-auto px-4 py-10 space-y-16 bg-gray-100/70">
				<ProductCarousel
					products={featuredProducts}
					title="Sản phẩm nổi bật"
					viewAllHref="/san-pham"
				/>

				<ProductSection
					title="Kệ tivi gỗ"
					products={keTivis}
					viewAllHref="/category/ke-tivi"
				/>

				<ProductSection
					title="Sản phẩm khác"
					products={featuredAltProducts}
					viewAllHref="/san-pham"
				/>
			</div>
		</div>
	)
}
