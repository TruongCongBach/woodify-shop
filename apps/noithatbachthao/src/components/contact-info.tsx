import { FacebookIcon, MapPin, Phone } from 'lucide-react'

interface ContactInfoItem {
	icon: React.ReactNode
	title: string
	value: string
	href?: string
	color: 'blue' | 'green' | 'red'
}

const colorClasses = {
	blue: {
		bg: 'bg-blue-100',
		hoverBg: 'group-hover:bg-blue-200',
		text: 'text-blue-600',
		border: 'hover:border-blue-300',
		hoverBgSection: 'hover:bg-blue-50',
	},
	green: {
		bg: 'bg-green-100',
		hoverBg: 'group-hover:bg-green-200',
		text: 'text-green-600',
		border: 'hover:border-green-300',
		hoverBgSection: 'hover:bg-green-50',
	},
	red: {
		bg: 'bg-red-100',
		hoverBg: '',
		text: 'text-red-600',
		border: '',
		hoverBgSection: '',
	},
}

const contactItems: ContactInfoItem[] = [
	{
		icon: <FacebookIcon className="w-6 h-6" />,
		title: 'Facebook Fanpage',
		value: 'Nội Thất Bách Thảo',
		href: 'https://www.facebook.com/noithatmynghegiadinh',
		color: 'blue',
	},
	{
		icon: <Phone className="w-6 h-6" />,
		title: 'Số Điện Thoại',
		value: '0347 373 891',
		href: 'tel:0347373891',
		color: 'green',
	},
	{
		icon: <MapPin className="w-6 h-6" />,
		title: 'Địa Chỉ',
		value: 'Xã Thư Lâm, TP Hà Nội',
		color: 'red',
	},
]

/**
 * Contact information display component
 * Single Responsibility: Display contact information only
 */
export function ContactInfo() {
	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Thông Tin Liên Hệ</h2>
				<p className="text-gray-600 mb-6">
					Bạn có thể kết nối trực tiếp với chúng tôi qua số điện thoại, fanpage hoặc ghé
					thăm xưởng sản xuất để xem sản phẩm thực tế.
				</p>

				<div className="space-y-4">
					{contactItems.map((item, index) => {
						const colors = colorClasses[item.color]
						const Component = item.href ? 'a' : 'div'
						const linkProps = item.href
							? {
									href: item.href,
									...(item.href.startsWith('http') && {
										target: '_blank',
										rel: 'noopener noreferrer',
									}),
							  }
							: {}

						return (
							<Component
								key={index}
								{...linkProps}
								className={`flex items-center p-4 bg-white rounded-xl border border-gray-200 ${
									item.href ? `${colors.border} ${colors.hoverBgSection} transition-colors group` : ''
								}`}
							>
								<div
									className={`${colors.bg} p-3 rounded-full mr-4 ${colors.hoverBg} transition-colors`}
								>
									<div className={colors.text}>{item.icon}</div>
								</div>
								<div>
									<p className="font-semibold text-gray-900">{item.title}</p>
									<p className="text-gray-600 text-sm">{item.value}</p>
								</div>
							</Component>
						)
					})}
				</div>
			</div>

			{/* Map */}
			<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
				<div className="p-6 border-b border-gray-100">
					<h3 className="text-xl font-bold text-gray-900">Vị Trí Trên Bản Đồ</h3>
					<p className="text-gray-600 text-sm mt-1">Ghé thăm showroom của chúng tôi</p>
				</div>
				<div className="h-80 bg-gray-200">
					<iframe
						referrerPolicy="no-referrer-when-downgrade"
						title="Bản đồ Nội Thất Bách Thảo"
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7441.882403599502!2d105.81023698024018!3d21.154738117009583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1752338914733!5m2!1svi!2s"
						width="100%"
						height="100%"
						className="border-0"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	)
}
