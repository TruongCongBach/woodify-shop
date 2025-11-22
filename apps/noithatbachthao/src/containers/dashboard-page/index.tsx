'use client'

import Link from 'next/link'
import { Button } from '@woodify/ui/shadcn-ui/button'
import { Package, FolderTree, Plus } from 'lucide-react'

/**
 * Dashboard page container
 * Responsibility: Orchestrate dashboard sections
 * Extensible: Easy to add new dashboard widgets/sections (Open/Closed Principle)
 */
export default function DashboardPageContainer() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
					<p className="text-gray-600">Quản lý sản phẩm và danh mục</p>
				</div>

				{/* Quick Actions Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Categories Section */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="bg-blue-100 p-3 rounded-lg">
									<FolderTree className="w-6 h-6 text-blue-600" />
								</div>
								<div>
									<h2 className="text-xl font-bold text-gray-900">Danh mục</h2>
									<p className="text-sm text-gray-600">Quản lý danh mục sản phẩm</p>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<Link href="/dashboard/categories">
								<Button variant="outline" className="w-full justify-start">
									<FolderTree className="w-4 h-4 mr-2" />
									Xem tất cả danh mục
								</Button>
							</Link>
							<Link href="/dashboard/categories/create">
								<Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
									<Plus className="w-4 h-4 mr-2" />
									Tạo danh mục mới
								</Button>
							</Link>
						</div>
					</div>

					{/* Products Section */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="bg-green-100 p-3 rounded-lg">
									<Package className="w-6 h-6 text-green-600" />
								</div>
								<div>
									<h2 className="text-xl font-bold text-gray-900">Sản phẩm</h2>
									<p className="text-sm text-gray-600">Quản lý sản phẩm</p>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<Link href="/dashboard/products">
								<Button variant="outline" className="w-full justify-start">
									<Package className="w-4 h-4 mr-2" />
									Xem tất cả sản phẩm
								</Button>
							</Link>
							<Link href="/dashboard/products/create">
								<Button className="w-full justify-start bg-green-600 hover:bg-green-700">
									<Plus className="w-4 h-4 mr-2" />
									Tạo sản phẩm mới
								</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* Info Section - Extensible for future widgets */}
				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						Chào mừng đến với Dashboard
					</h3>
					<p className="text-gray-700">
						Sử dụng các công cụ bên trên để quản lý danh mục và sản phẩm của bạn. Dashboard
						này có thể được mở rộng với thêm các tính năng như thống kê, biểu đồ, và báo
						cáo.
					</p>
				</div>
			</div>
		</div>
	)
}
