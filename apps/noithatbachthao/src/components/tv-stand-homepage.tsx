'use client';
import React, { useState } from 'react';
import {
  Menu,
  X,
  Star,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Award,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Kệ Tivi Gỗ Sồi Cao Cấp",
      price: "2,500,000",
      originalPrice: "3,000,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 24,
      sale: true
    },
    {
      id: 2,
      name: "Kệ Tivi Minimalist Walnut",
      price: "1,800,000",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 31,
      sale: false
    },
    {
      id: 3,
      name: "Kệ Tivi Gỗ Teak Vintage",
      price: "3,200,000",
      originalPrice: "3,800,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 18,
      sale: true
    },
    {
      id: 4,
      name: "Kệ Tivi Scandinavian Style",
      price: "2,100,000",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 42,
      sale: false
    }
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "Chất Lượng Cao Cấp",
      description: "100% gỗ tự nhiên, gia công tỉ mỉ bởi thợ thủ công lành nghề"
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Giao Hàng Miễn Phí",
      description: "Miễn phí vận chuyển và lắp đặt tại nhà trong nội thành"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bảo Hành 5 Năm",
      description: "Cam kết bảo hành chất lượng và hỗ trợ kỹ thuật lâu dài"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-purple-600" />,
      title: "Đổi Trả 30 Ngày",
      description: "Chính sách đổi trả linh hoạt, hoàn tiền 100% nếu không hài lòng"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-amber-800">
                WoodTV <span className="text-amber-600">Store</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Trang Chủ</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Sản Phẩm</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Về Chúng Tôi</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Liên Hệ</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Trang Chủ</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Sản Phẩm</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Về Chúng Tôi</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Liên Hệ</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Kệ Tivi Gỗ
                  <span className="block text-amber-600">Cao Cấp</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Nâng tầm không gian sống với bộ sưu tập kệ tivi gỗ tự nhiên,
                  thiết kế hiện đại và chất lượng vượt trội.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                  Khám Phá Ngay
                </button>
                <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Xem Bộ Sưu Tập
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">500+</div>
                  <div className="text-gray-600">Sản Phẩm</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">1000+</div>
                  <div className="text-gray-600">Khách Hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">4.8★</div>
                  <div className="text-gray-600">Đánh Giá</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=500&fit=crop"
                  alt="Kệ Tivi Gỗ Cao Cấp"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-amber-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất với dịch vụ tốt nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập kệ tivi gỗ được khách hàng yêu thích nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.sale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-amber-600">{product.price}₫</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{product.originalPrice}₫</div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Thêm Vào Giỏ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2">
              <span>Xem Tất Cả Sản Phẩm</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">Về WoodTV Store</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Với hơn 10 năm kinh nghiệm trong ngành nội thất gỗ, chúng tôi tự hào là
                  địa chỉ tin cậy cho những ai yêu thích vẻ đẹp tự nhiên và chất lượng cao cấp.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng từ nguồn gỗ tự nhiên chất lượng cao,
                  gia công bởi đội ngũ thợ thủ công lành nghề với kỹ thuật truyền thống kết hợp
                  công nghệ hiện đại.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">10+ Năm</div>
                  <div className="text-gray-600">Kinh Nghiệm</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
                  <div className="text-gray-600">Gỗ Tự Nhiên</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop"
                alt="Xưởng sản xuất"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                WoodTV <span className="text-amber-400">Store</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Nơi hội tụ những sản phẩm kệ tivi gỗ cao cấp, mang đến vẻ đẹp tự nhiên cho ngôi nhà bạn.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">yt</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Sản Phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Kệ Tivi Gỗ Sồi</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Kệ Tivi Gỗ Walnut</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Kệ Tivi Gỗ Teak</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Kệ Tivi Minimalist</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Hỗ Trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Chính Sách Bảo Hành</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Hướng Dẫn Sử Dụng</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Câu Hỏi Thường Gặp</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Chăm Sóc Khách Hàng</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Liên Hệ</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>0123 456 789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>info@woodtvstore.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WoodTV Store. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
