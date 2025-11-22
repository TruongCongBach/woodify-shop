import { Metadata } from 'next'
import config from '@/config'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Hành - Nội Thất Bách Thảo',
  description: 'Chính sách bảo hành sản phẩm nội thất gỗ tại Nội Thất Bách Thảo.',
  alternates: {
    canonical: `${config.domainUrl}/chinh-sach-bao-hanh`,
  },
}

export default function ChinhSachBaoHanhPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Chính Sách Bảo Hành</h1>
          </header>
          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Bảo hành 5 năm cho khung gỗ</h2>
            <ul className="space-y-4 text-lg">
              <li>• Khung gỗ tự nhiên: 60 tháng</li>
              <li>• Vải bọc, đệm: 12 tháng</li>
              <li>• Phụ kiện kim khí: 12 tháng</li>
              <li>• Lắp đặt miễn phí nội thành Hà Nội</li>
              <li>• Hỗ trợ vận chuyển toàn quốc</li>
            </ul>
            <p className="mt-8 text-gray-600">Chi tiết vui lòng liên hệ hotline 0347.373.891</p>
          </div>
        </div>
      </div>
    </div>
  )
}