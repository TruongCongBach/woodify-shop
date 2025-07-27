'use client';
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Star,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Play,
  Check,
  Users,
  Leaf,
  Hammer,
  Trophy,
  Eye,
  Search,
  Filter
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Nghệ Thuật Gỗ Tự Nhiên",
      subtitle: "Kệ Tivi Premium Collection 2024",
      description: "Khám phá vẻ đẹp tinh tế của gỗ tự nhiên với thiết kế hiện đại, mang đến không gian sống đẳng cấp.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      cta: "Khám Phá Ngay"
    },
    {
      title: "Handcrafted Excellence",
      subtitle: "Thủ Công Cao Cấp",
      description: "Mỗi sản phẩm được chế tác tỉ mỉ bởi những nghệ nhân lành nghề với hơn 20 năm kinh nghiệm.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      cta: "Xem Quy Trình"
    },
    {
      title: "Sustainable Living",
      subtitle: "Bền Vững & Thân Thiện",
      description: "Cam kết sử dụng nguồn gỗ được chứng nhận FSC, góp phần bảo vệ môi trường.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      cta: "Tìm Hiểu Thêm"
    }
  ];

  const categories = [
    {
      name: "Minimalist",
      count: "24 sản phẩm",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
      color: "from-slate-500 to-slate-700"
    },
    {
      name: "Scandinavian",
      count: "18 sản phẩm",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      color: "from-blue-500 to-blue-700"
    },
    {
      name: "Vintage",
      count: "32 sản phẩm",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
      color: "from-yellow-600 to-amber-700"
    },
    {
      name: "Industrial",
      count: "15 sản phẩm",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Hạnh",
      role: "Kiến trúc sư nội thất",
      content: "Chất lượng gỗ tuyệt vời, thiết kế tinh tế. Đây là lựa chọn hoàn hảo cho những ai yêu thích phong cách hiện đại.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Trần Văn Dũng",
      role: "Chủ nhà hàng",
      content: "Dịch vụ chuyên nghiệp, giao hàng đúng hẹn. Kệ tivi đã làm thay đổi hoàn toàn không gian phòng khách của tôi.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Lê Thị Mai",
      role: "Blogger nội thất",
      content: "Sản phẩm chất lượng cao, giá cả hợp lý. Team tư vấn rất nhiệt tình và am hiểu sản phẩm.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "2500+", label: "Khách Hàng Hài Lòng", icon: <Users className="w-8 h-8" /> },
    { number: "98%", label: "Tỷ Lệ Hài Lòng", icon: <Trophy className="w-8 h-8" /> },
    { number: "15+", label: "Năm Kinh Nghiệm", icon: <Hammer className="w-8 h-8" /> },
    { number: "100%", label: "Gỗ Tự Nhiên", icon: <Leaf className="w-8 h-8" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-gray-100">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Hotline: 1900 1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@woodcraft.vn</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Miễn phí vận chuyển đơn hàng &gt; 2M</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                WoodCraft
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors relative group">
                Trang Chủ
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></div>
              </a>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors flex items-center space-x-1">
                  <span>Sản Phẩm</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Về Chúng Tôi</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Showroom</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Blog</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Liên Hệ</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Trang Chủ</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Sản Phẩm</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Về Chúng Tôi</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Showroom</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Blog</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Liên Hệ</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white space-y-8">
                  <div className="space-y-4">
                    <div className="text-amber-400 font-medium text-lg tracking-wider uppercase">
                      {slide.subtitle}
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                      {slide.cta}
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3">
                      <Play className="w-6 h-6" />
                      <span>Xem Video</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Bộ Sưu Tập</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Khám phá đa dạng phong cách thiết kế từ hiện đại đến cổ điển,
              phù hợp với mọi không gian sống
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-square">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      {category.count}
                    </p>
                    <div className="mt-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-200 opacity-0 group-hover:opacity-100">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Quy Trình Chế Tác</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ khâu tuyển chọn nguyên liệu đến hoàn thiện sản phẩm,
              mọi bước đều được thực hiện với sự tỉ mỉ và chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Tuyển Chọn Gỗ", desc: "Chọn lọc nguồn gỗ tự nhiên chất lượng cao từ các khu rừng được chứng nhận" },
              { step: "02", title: "Thiết Kế 3D", desc: "Tạo bản thiết kế chi tiết với công nghệ 3D modeling hiện đại" },
              { step: "03", title: "Gia Công Thủ Công", desc: "Chế tác bởi đội ngũ thợ thủ công lành nghề với kỹ thuật truyền thống" },
              { step: "04", title: "Hoàn Thiện & QC", desc: "Kiểm tra chất lượng nghiêm ngặt và hoàn thiện sản phẩm" }
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{process.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-amber-300 to-orange-300 -ml-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Khách Hàng Nói Gì</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hơn 2500+ khách hàng đã tin tưởng và hài lòng với sản phẩm của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  {`"${testimonial.content}"`}
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Sẵn Sàng Biến Đổi<br />Không Gian Của Bạn?
            </h2>
            <p className="text-xl md:text-2xl text-amber-100 leading-relaxed">
              Hãy để chúng tôi giúp bạn tạo nên một không gian sống đẳng cấp với những sản phẩm kệ tivi gỗ cao cấp
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-amber-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Tư Vấn Miễn Phí
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300">
                Xem Showroom
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                WoodCraft
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Chuyên cung cấp kệ tivi gỗ cao cấp với thiết kế hiện đại,
                chất lượng vượt trội và dịch vụ chuyên nghiệp.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'youtube', 'tiktok'].map((social) => (
                  <div key={social} className="w-12 h-12 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300">
                    <span className="text-white font-bold text-sm">{social[0].toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-400">Sản Phẩm</h3>
              <ul className="space-y-3 text-gray-400">
                {['Kệ Tivi Minimalist', 'Kệ Tivi Scandinavian', 'Kệ Tivi Vintage', 'Kệ Tivi Industrial', 'Kệ Tivi Custom'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-400">Dịch Vụ</h3>
              <ul className="space-y-3 text-gray-400">
                {['Tư Vấn Thiết Kế', 'Đo Đạc Tại Nhà', 'Lắp Đặt Miễn Phí', 'Bảo Hành 5 Năm', 'Sửa Chữa & Bảo Trì'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-400">Liên Hệ</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <span>123 Đường Nghệ Thuật Gỗ, Quận Tân Bình, TP.HCM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>1900 1234 (Miễn phí)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>hello@woodcraft.vn</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2024 WoodCraft Vietnam. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-amber-400 transition-colors">Chính Sách Bảo Mật</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Điều Khoản Sử Dụng</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
