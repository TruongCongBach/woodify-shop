'use client'

import React from 'react'

export const PageFooter = () => (
	<footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
		<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
			{/* Logo & contact */}
			<div>
				<a href="/" className="flex items-center">
					<img src="/logo-white.png" alt="Logo" className="h-20 w-auto"/>
					<div className="text-center">
						<span className="ml-2 text-xl font-bold">Khánh Trang</span><br/>
						<span className="ml-2 text-xs font-bold">Đồ Gỗ Nội Thất</span>
					</div>
				</a>
				<p className="text-sm">Địa chỉ: 123 Phố Gỗ, Hải Phòng</p>
					<a href={`tel:098.830.3534`} className="text-sm mt-1"><span className="font-bold">SĐT</span>: 098.830.3534</a>
				<br/>
				<a href={`https://zalo.me/0988303534`} className="text-sm mt-1"><span className="font-bold">ZALO</span>: 098.830.3534</a>
			</div>

			{/* Danh mục */}
			<div>
				<h3 className="text-white font-semibold mb-3">Danh mục</h3>
				<ul className="space-y-2 text-sm">
					<li><a href="/ban-ghe" className="hover:text-white">Bàn ghế</a></li>
					<li><a href="/tu-tho" className="hover:text-white">Tủ thờ</a></li>
					<li><a href="/ke-tivi" className="hover:text-white">Kệ Tivi</a></li>
					<li><a href="/vach-tho" className="hover:text-white">Vách thờ</a></li>
				</ul>
			</div>

			{/* Chính sách */}
			<div>
				<h3 className="text-white font-semibold mb-3">Hỗ trợ khách hàng</h3>
				<ul className="space-y-2 text-sm">
					<li><a href="/chinh-sach-bao-hanh" className="hover:text-white">Chính sách bảo hành</a></li>
					<li><a href="/chinh-sach-van-chuyen" className="hover:text-white">Vận chuyển</a></li>
				</ul>
			</div>

			{/* Liên hệ & mạng xã hội */}
			<div>
				<h3 className="text-white font-semibold mb-3">Liên hệ & mạng xã hội</h3>

				<ul className="text-sm space-y-1 mb-4">
					<li>SĐT / Zalo: <a href="tel:0988303534" className="hover:text-white font-medium">098.830.3534</a></li>
				</ul>

				<div className="flex items-center space-x-3">
					<a href="https://zalo.me/0988303534" target="_blank" rel="noopener noreferrer"
						 className="bg-gray-700 hover:bg-white hover:text-gray-900 p-2 rounded transition text-xs">
						Zalo
					</a>
					<a href="https://www.tiktok.com/@dogokhanhtrang1" target="_blank" rel="noopener noreferrer"
						 className="bg-gray-700 hover:bg-white hover:text-gray-900 p-2 rounded transition text-xs">
						TikTok
					</a>
				</div>
			</div>
		</div>

		{/* Line */}
		<div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
			&copy; {new Date().getFullYear()} Nội Thất Khánh Trang. All rights reserved.
		</div>
	</footer>
)
