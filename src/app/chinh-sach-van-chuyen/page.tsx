import { Metadata } from 'next'
import config from '@/config'

export const metadata: Metadata = {
  title: 'Chính Sách Vận Chuyển - Nội Thất Bách Thảo',
  description: 'Chính sách vận chuyển và giao hàng toàn quốc tại Nội Thất Bách Thảo.',
  alternates: {
    canonical: `${config.domainUrl}/chinh-sach-van-chuyen`,
  },
}

export default function ChinhSachVanChuyenPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Chính Sách Vận Chuyển</h1>
          </header>
          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Giao hàng toàn quốc</h2>
            <ul className="space-y-4 text-lg">
              <li>• Miễn phí vận chuyển nội thành Hà Nội (đơn &gt; 10tr)</li>
              <li>• Ship COD toàn quốc</li>
              <li>• Thời gian giao: 3-7 ngày</li>
              <li>• Đóng gói chuyên nghiệp, bảo hiểm hàng hóa</li>
            </ul>
            <p className="mt-8 text-gray-600">Liên hệ để được báo giá vận chuyển chính xác.</p>
          </div>
        </div>
      </div>
    </div>
  )
}