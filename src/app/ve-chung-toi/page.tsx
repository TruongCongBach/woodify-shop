import { Metadata } from 'next'
import config from '@/config'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi - Nội Thất Bách Thảo',
  description: 'Giới thiệu về Nội Thất Bách Thảo - Chuyên nội thất gỗ cao cấp handmade từ gỗ tự nhiên.',
  alternates: {
    canonical: `${config.domainUrl}/ve-chung-toi`,
  },
}

export default function VeChungToiPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Về Chúng Tôi</h1>
            <p className="text-xl text-gray-600">Nội Thất Bách Thảo - Nơi nghệ thuật gặp gỡ sự tinh tế</p>
          </header>
          <div className="prose prose-lg max-w-none">
            <p>Nội Thất Bách Thảo chuyên cung cấp các sản phẩm nội thất gỗ cao cấp, được chế tác thủ công từ những loại gỗ tự nhiên quý hiếm. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng cao nhất.</p>
            <p>Đội ngũ nghệ nhân của chúng tôi sử dụng kỹ thuật truyền thống kết hợp công nghệ hiện đại để tạo ra những kiệt tác nội thất độc đáo, phù hợp với mọi phong cách sống.</p>
            {/* Add more content */}
          </div>
        </div>
      </div>
    </div>
  )
}