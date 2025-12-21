import React from 'react'
import { Metadata } from 'next'
import { Truck, Package, Clock, Shield, CheckCircle, MapPin } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Chính Sách Vận Chuyển | Nội Thất Bách Thảo',
	description: 'Tìm hiểu chi tiết về chính sách vận chuyển, phí ship và thời gian giao hàng của Nội Thất Bách Thảo. Giao hàng toàn quốc, bảo hành vận chuyển.',
	keywords: 'chính sách vận chuyển, phí ship nội thất, giao hàng nội thất, vận chuyển đồ gỗ',
}

export default function ShippingPolicyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header Banner */}
			<div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center mb-4">
						<Truck className="h-16 w-16" />
					</div>
					<h1 className="text-4xl font-bold mb-4">Chính Sách Vận Chuyển</h1>
					<p className="text-xl opacity-90 max-w-2xl mx-auto">
						Cam kết giao hàng an toàn, nhanh chóng và đáng tin cậy trên toàn quốc
					</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					{/* Service Features */}
					<div className="grid md:grid-cols-3 gap-8 mb-16">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Package className="h-12 w-12 text-amber-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Đóng Gói Chuyên Nghiệp</h3>
							<p className="text-gray-600">Sử dụng vật liệu đóng gói cao cấp, bảo vệ sản phẩm tối ưu</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Clock className="h-12 w-12 text-amber-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Giao Hàng Nhanh Chóng</h3>
							<p className="text-gray-600">Thời gian giao hàng từ 3-7 ngày tùy theo khu vực</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Shield className="h-12 w-12 text-amber-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Bảo Hành Vận Chuyển</h3>
							<p className="text-gray-600">Bồi thường 100% nếu sản phẩm bị hư hại do vận chuyển</p>
						</div>
					</div>

					{/* Shipping Areas */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
							<MapPin className="h-6 w-6 text-amber-600 mr-2" />
							Khu Vực Giao Hàng
						</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Nội Thành Hà Nội</h3>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Thời gian: 1-2 ngày
									</li>
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Phí ship: 50,000 - 150,000 VNĐ
									</li>
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Miễn phí với đơn hàng từ 5 triệu
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Các Tỉnh Thành Khác</h3>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Thời gian: 3-7 ngày
									</li>
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Phí ship: 100,000 - 500,000 VNĐ
									</li>
									<li className="flex items-center">
										<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										Miễn phí với đơn hàng từ 10 triệu
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Shipping Process */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình Giao Hàng</h2>
						<div className="space-y-6">
							<div className="flex items-start">
								<div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Xác Nhận Đơn Hàng</h3>
									<p className="text-gray-600">Sau khi đặt hàng, chúng tôi sẽ liên hệ xác nhận thông tin và địa chỉ giao hàng trong vòng 2 giờ.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Chuẩn Bị Hàng</h3>
									<p className="text-gray-600">Sản phẩm được kiểm tra chất lượng và đóng gói cẩn thận với vật liệu bảo vệ chuyên dụng.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Vận Chuyển</h3>
									<p className="text-gray-600">Đối tác vận chuyển uy tín nhận hàng và bắt đầu quá trình giao hàng. Khách hàng nhận mã tracking.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Giao Hàng & Lắp Đặt</h3>
									<p className="text-gray-600">Nhân viên giao hàng đến địa chỉ, hỗ trợ lắp đặt và kiểm tra sản phẩm cùng khách hàng.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Important Notes */}
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
						<h2 className="text-xl font-bold text-amber-800 mb-4">Lưu Ý Quan Trọng</h2>
						<ul className="space-y-2 text-amber-700">
							<li>• Khách hàng vui lòng có mặt tại địa chỉ giao hàng trong khung thời gian đã hẹn</li>
							<li>• Kiểm tra kỹ sản phẩm trước khi ký nhận, phản hồi ngay nếu có vấn đề</li>
							<li>• Với sản phẩm lớn, cần đảm bảo đường đi, cầu thang phù hợp để vận chuyển</li>
							<li>• Phí vận chuyển có thể thay đổi tùy theo trọng lượng và kích thước thực tế</li>
							<li>• Thời gian giao hàng có thể chậm hơn trong các dịp lễ, tết</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className="bg-white rounded-lg shadow-md p-8 mt-8 text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Cần Hỗ Trợ?</h2>
						<p className="text-gray-600 mb-6">Liên hệ với chúng tôi để được tư vấn chi tiết về chính sách vận chuyển</p>
						<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
							<div className="flex items-center">
								<span className="font-semibold text-gray-800">Hotline:</span>
								<span className="ml-2 text-amber-600 font-bold">0347 373 891</span>
							</div>
							<div className="flex items-center">
								<span className="font-semibold text-gray-800">Email:</span>
								<span className="ml-2 text-amber-600">noithatbachthao@gmail.com</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}