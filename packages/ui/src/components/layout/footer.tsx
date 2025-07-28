import { Facebook, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const FooterPage = () => {
  return (<footer className="bg-gray-900 text-white py-16">
		<div className="container mx-auto px-4">
			<div className="grid md:grid-cols-4 gap-8">
				<div className="space-y-6">
					<div className="text-3xl font-bold">
						<span className="text-white">Đại Lý Kệ</span>
						<span className="text-amber-400">Tivi</span>
					</div>
					<p className="text-gray-400 leading-relaxed">
						Nơi hội tụ những tác phẩm kệ tivi gỗ nghệ thuật, mang vẻ đẹp tự nhiên đến không gian sống của bạn.
					</p>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-bold text-amber-400">Danh Mục</h3>
					<ul className="space-y-2 text-gray-400">
						<li><a href="/category/ke-tivi" className="hover:text-amber-400 transition-colors">Kệ Tivi Hiện Đại</a></li>
						<li><a href="/category/ke-tivi" className="hover:text-amber-400 transition-colors">Kệ Tivi Tối Giản</a></li>
						<li><a href="/category/ke-tivi" className="hover:text-amber-400 transition-colors">Kệ Tivi Cổ Điển</a></li>
						<li><a href="/category/ke-tivi" className="hover:text-amber-400 transition-colors">Kệ Tivi Cao Cấp</a></li>
					</ul>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-bold text-amber-400">Dịch Vụ</h3>
					<ul className="space-y-2 text-gray-400">
						<li><a href="#" className="hover:text-amber-400 transition-colors">Tư Vấn Thiết Kế</a></li>
						<li><a href="#" className="hover:text-amber-400 transition-colors">Lắp Đặt Tại Nhà</a></li>
						<li><a href="#" className="hover:text-amber-400 transition-colors">Bảo Hành & Sửa Chữa</a></li>
						<li><a href="#" className="hover:text-amber-400 transition-colors">Chăm Sóc Khách Hàng</a></li>
					</ul>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-bold text-amber-400">Liên Hệ</h3>
					<div className="space-y-3 text-gray-400">
						<a href="tel:0347373891"
							 rel="noopener noreferrer"
							 className="flex items-center space-x-3">
							<Phone className="w-5 h-5 text-amber-400" />
							<span>034 7373 891</span>
						</a>
						<a href="https://www.facebook.com/noithatmynghegiadinh"
							 target="_blank"
							 rel="noopener noreferrer"
							 className="flex items-center space-x-3">
							<Facebook className="w-5 h-5 text-amber-400" />
							<span>Nội Thất Mỹ Nghệ Gia Đình</span>
						</a>
						<div className="flex items-center space-x-3">
							<MapPin className="w-5 h-5 text-amber-400" />
							<span>Xã Thư Lâm, TP Hà Nội</span>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
				<p>&copy; 2025 Đại Lý Kệ Tivi. Tất cả quyền được bảo lưu.</p>
			</div>
		</div>
	</footer>)
}
export default FooterPage
