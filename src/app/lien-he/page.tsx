import { Metadata } from 'next'
import config from '@/config'

export const metadata: Metadata = {
  title: 'Liên Hệ - Nội Thất Bách Thảo',
  description: 'Liên hệ với Nội Thất Bách Thảo để được tư vấn sản phẩm nội thất gỗ cao cấp.',
  alternates: {
    canonical: `${config.domainUrl}/lien-he`,
  },
}

export default function LienHePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Liên Hệ</h1>
            <p className="text-xl text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </header>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
              <ul className="space-y-4 text-lg">
                <li>📞 Hotline: 0347.373.891</li>
                <li>📧 Email: info@noithatbachthao.com</li>
                <li>📍 Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
            <div>
              <form className="space-y-4">
                <input placeholder="Họ tên" className="w-full p-4 border rounded-lg" />
                <input type="email" placeholder="Email" className="w-full p-4 border rounded-lg" />
                <textarea placeholder="Tin nhắn" rows={5} className="w-full p-4 border rounded-lg" />
                <button type="submit" className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold">Gửi Tin Nhắn</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}