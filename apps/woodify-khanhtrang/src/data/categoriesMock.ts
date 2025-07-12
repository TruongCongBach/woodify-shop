export interface Category {
	id: string
	name: string
	image?: string
	url?: string
	sub?: Category[]
}

export const categoriesMock: Category[] = [
	{ url: 'ban-ghe', id: 'ban-ghe', name: 'Bàn Ghế Gỗ', image: 'https://picsum.photos/seed/cat1/100' },
	{ url: 'ke-tivi', id: 'ke-tivi', name: 'Kệ Tivi', image: 'https://picsum.photos/seed/cat2/100' },
	{ url: 'tu-tho', id: 'tu-tho', name: 'Tủ Thờ', image: 'https://picsum.photos/seed/cat3/100' },
	{ url: 'vach-tho', id: 'vach-tho', name: 'Vách Thờ', image: 'https://picsum.photos/seed/cat4/100' },
]
export default categoriesMock
