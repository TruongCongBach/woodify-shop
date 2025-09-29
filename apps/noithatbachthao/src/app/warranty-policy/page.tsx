import React from 'react'
import { Metadata } from 'next'
import { Shield, Award, Clock, Wrench, CheckCircle, AlertTriangle, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Chính Sách Bảo Hành | Nội Thất Bách Thảo',
	description: 'Tìm hiểu chi tiết về chính sách bảo hành sản phẩm nội thất gỗ của Nội Thất Bách Thảo. Bảo hành dài hạn, sửa chữa miễn phí, cam kết chất lượng.',
	keywords: 'bảo hành nội thất, bảo hành đồ gỗ, sửa chữa nội thất, chính sách bảo hành',
}

export default function WarrantyPolicyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header Banner */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center mb-4">
						<Shield className="h-16 w-16" />
					</div>
					<h1 className="text-4xl font-bold mb-4">Chính Sách Bảo Hành</h1>
					<p className="text-xl opacity-90 max-w-2xl mx-auto">
						Cam kết chất lượng với dịch vụ bảo hành toàn diện và chuyên nghiệp
					</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					{/* Warranty Features */}
					<div className="grid md:grid-cols-3 gap-8 mb-16">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Bảo Hành Dài Hạn</h3>
							<p className="text-gray-600">Từ 12-36 tháng tùy theo loại sản phẩm</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Sửa Chữa Miễn Phí</h3>
							<p className="text-gray-600">Không tính phí sửa chữa trong thời gian bảo hành</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Phản Hồi Nhanh</h3>
							<p className="text-gray-600">Xử lý yêu cầu bảo hành trong 24-48 giờ</p>
						</div>
					</div>

					{/* Warranty Terms */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Thời Gian Bảo Hành</h2>
						<div className="space-y-6">
							<div className="border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
									<CheckCircle className="h-5 w-5 text-green-500 mr-2" />
									Sản Phẩm Gỗ Tự Nhiên (36 tháng)
								</h3>
								<ul className="text-gray-600 ml-7 space-y-1">
									<li>• Kệ tivi, tủ trang trí gỗ xoan, gỗ hương</li>
									<li>• Bàn ăn, bàn làm việc gỗ nguyên khối</li>
									<li>• Giường ngủ, tủ quần áo gỗ tự nhiên</li>
								</ul>
							</div>
							<div className="border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
									<CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
									Sản Phẩm Gỗ Công Nghiệp (24 tháng)
								</h3>
								<ul className="text-gray-600 ml-7 space-y-1">
									<li>• Kệ sách, kệ trang trí gỗ MDF cao cấp</li>
									<li>• Bàn nhỏ, kệ đầu giường</li>
									<li>• Các phụ kiện nội thất</li>
								</ul>
							</div>
							<div className="border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
									<CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
									Phụ Kiện & Linh Kiện (12 tháng)
								</h3>
								<ul className="text-gray-600 ml-7 space-y-1">
									<li>• Bản lề, ray trượt, khóa tủ</li>
									<li>• Chân đế, bánh xe</li>
									<li>• Các chi tiết kim loại</li>
								</ul>
							</div>
						</div>
					</div>

					{/* What's Covered */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Nội Dung Bảo Hành</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
									<CheckCircle className="h-5 w-5 mr-2" />
									Được Bảo Hành
								</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Lỗi kỹ thuật trong quá trình sản xuất</li>
									<li>• Bong tróc sơn, phu bề mặt</li>
									<li>• Nứt, vênh do độ ẩm tự nhiên</li>
									<li>• Hỏng bản lề, ray trượt, khóa</li>
									<li>• Lắp đặt không đúng kỹ thuật</li>
									<li>• Mối mọt (với gỗ tự nhiên)</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
									<AlertTriangle className="h-5 w-5 mr-2" />
									Không Bảo Hành
								</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Hư hại do sử dụng sai cách</li>
									<li>• Trầy xước do va đập</li>
									<li>• Hỏng do tác động ngoại lực</li>
									<li>• Phai màu do ánh nắng trực tiếp</li>
									<li>• Hư hại do hóa chất ăn mòn</li>
									<li>• Tự ý sửa chữa, thay đổi</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Warranty Process */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình Bảo Hành</h2>
						<div className="space-y-6">
							<div className="flex items-start">
								<div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Tiếp Nhận Yêu Cầu</h3>
									<p className="text-gray-600">Khách hàng gọi hotline hoặc gửi email kèm hình ảnh sản phẩm bị lỗi và thông tin bảo hành.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Kiểm Tra & Xác Định</h3>
									<p className="text-gray-600">Kỹ thuật viên đánh giá tình trạng, xác định nguyên nhân và đưa ra phương án xử lý.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Thực Hiện Bảo Hành</h3>
									<p className="text-gray-600">Sửa chữa tại nhà hoặc đưa về xưởng tùy theo mức độ hư hỏng. Thời gian từ 3-7 ngày.</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Hoàn Thành & Bàn Giao</h3>
									<p className="text-gray-600">Kiểm tra chất lượng, giao nhận với khách hàng và cập nhật thông tin bảo hành.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Required Documents */}
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
						<h2 className="text-xl font-bold text-blue-800 mb-4">Hồ Sơ Cần Có Khi Bảo Hành</h2>
						<ul className="space-y-2 text-blue-700">
							<li>• Phiếu bảo hành có đầy đủ thông tin và con dấu</li>
							<li>• Hóa đơn mua hàng (hóa đơn đỏ hoặc hóa đơn điện tử)</li>
							<li>• Hình ảnh chụp rõ vị trí hư hỏng của sản phẩm</li>
							<li>• Thông tin liên hệ và địa chỉ chính xác</li>
						</ul>
					</div>

					{/* Tips for Care */}
					<div className="bg-white rounded-lg shadow-md p-8 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Hướng Dẫn Bảo Quản</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Đồ Gỗ Tự Nhiên</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Tránh ánh nắng trực tiếp và nơi ẩm ướt</li>
									<li>• Lau chùi bằng khăn mềm, ít ẩm</li>
									<li>• Sử dụng chất bảo dưỡng gỗ định kỳ</li>
									<li>• Không đặt vật nóng trực tiếp lên bề mặt</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Phụ Kiện Kim Loại</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Bôi trơn bản lề, ray trượt 6 tháng/lần</li>
									<li>• Vệ sinh bằng dung dịch tẩy rửa nhẹ</li>
									<li>• Kiểm tra độ chặt của vít định kỳ</li>
									<li>• Báo ngay khi phát hiện dấu hiệu bất thường</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Contact for Warranty */}
					<div className="bg-white rounded-lg shadow-md p-8 text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Liên Hệ Bảo Hành</h2>
						<p className="text-gray-600 mb-6">Đội ngũ kỹ thuật viên chuyên nghiệp sẵn sàng hỗ trợ 24/7</p>
						<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
							<div className="flex items-center">
								<Phone className="h-5 w-5 text-blue-600 mr-2" />
								<div className="text-left">
									<span className="block font-semibold text-gray-800">Hotline Bảo Hành</span>
									<span className="text-blue-600 font-bold">0347 373 891</span>
								</div>
							</div>
							<div className="flex items-center">
								<Mail className="h-5 w-5 text-blue-600 mr-2" />
								<div className="text-left">
									<span className="block font-semibold text-gray-800">Email Hỗ Trợ</span>
									<span className="text-blue-600">baohanh@noithatbachthao.com</span>
								</div>
							</div>
						</div>
						<div className="mt-6 p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-blue-700">
								<strong>Thời gian làm việc:</strong> Thứ 2 - Thứ 6: 8:00 - 17:30 | Thứ 7: 8:00 - 12:00
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}