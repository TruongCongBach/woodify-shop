export const categoriesMock: Category[] = [
	{
		url: 'noi-that-phong-khach',
		id: 'noi-that-phong-khach',
		name: 'Nội Thất Phòng Khách',
		image: 'https://picsum.photos/seed/cat1/100',
	},
	{ url: 'ban-ghe-go', id: 'ban-ghe-go', name: 'Bàn Ghế Gỗ', image: 'https://picsum.photos/seed/cat2/100' },
	{ url: 'ke-tivi', id: 'ke-tivi', name: 'Kệ Tivi', image: 'https://picsum.photos/seed/cat3/100' },
	{
		url: 'do-tho', id: 'do-tho', name: 'Đồ Thờ', image: 'https://picsum.photos/seed/cat4/100',
		sub: [
			{
				url: 'vach-tho', id: 'vach-tho', name: 'Vách Ban Thờ', image: 'https://picsum.photos/seed/cat3/100',
				description: 'vách ngăn thờ trang nghiêm và hoa văn truyền thống, hòa hợp với nội thất phòng thờ.',
			},
			{
				url: 'ban-tho', id: 'ban-tho', name: 'Bàn Thờ', image: 'https://picsum.photos/seed/cat3/100',
				description: 'Tủ thờ gỗ cao cấp, thiết kế theo phong thủy, mang nét trang nghiêm cho không gian thờ.',
			},
			{
				url: 'tu-com',
				id: 'tu-com',
				name: 'Tủ Cơm',
				image: 'https://picsum.photos/seed/cat3/100',
				description: 'Tủ cơm gỗ tự nhiên, thiết kế tinh xảo, phù hợp với không gian thờ cúng.',
			},

		],
	},
]
export default categoriesMock
