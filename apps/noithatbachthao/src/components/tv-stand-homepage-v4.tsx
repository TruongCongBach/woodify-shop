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
  Award,
  Crown,
  Gem,
  Sparkles,
  Camera,
  Share2,
  BookOpen,
  Handshake,
  TreePine,
  Hammer,
  Eye,
  Clock,
  Gift
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentShowcase, setCurrentShowcase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const showcaseProducts = [
    {
      id: 1,
      name: "Kệ Tivi Gỗ Hương Đỏ Hoàng Gia",
      description: "Tuyệt tác điêu khắc thủ công với họa tiết rồng phượng truyền thống",
      price: "45,000,000",
      originalPrice: "55,000,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      badge: "ĐỘC QUYỀN",
      craftTime: "45 ngày",
      material: "Gỗ Hương Đỏ",
      style: "Hoàng Gia",
      details: ["Khắc tay hoàn toàn", "Sơn PU 12 lớp", "Phụ kiện đồng thau"]
    },
    {
      id: 2,
      name: "Kệ Tivi Gỗ Gụ Cổ Điển Sang Trọng",
      description: "Nghệ thuật woodworking đỉnh cao với đường nét tinh xảo",
      price: "38,000,000",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      badge: "BESTSELLER",
      craftTime: "35 ngày",
      material: "Gỗ Gụ Ta",
      style: "Cổ Điển",
      details: ["Ghép góc truyền thống", "Chạm khắc thủ công", "Hoàn thiện cao cấp"]
    },
    {
      id: 3,
      name: "Kệ Tivi Gỗ Cẩm Lai Phúc Lộc Thọ",
      description: "Biểu tượng thịnh vượng với họa tiết Phúc - Lộc - Thọ",
      price: "52,000,000",
      originalPrice: "62,000,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      badge: "LIMITED",
      craftTime: "60 ngày",
      material: "Gỗ Cẩm Lai",
      style: "Phong Thủy",
      details: ["Thiết kế theo phong thủy", "Họa tiết ý nghĩa", "Bảo tồn văn hóa"]
    }
  ];

  const craftProcess = [
    {
      step: "01",
      title: "Tuyển Chọn Gỗ Quý",
      description: "Chọn lọc từng thanh gỗ quý hiếm, tuổi đời hàng chục năm",
      icon: <TreePine className="w-8 h-8" />,
      time: "3-5 ngày"
    },
    {
      step: "02",
      title: "Thiết Kế Bản Vẽ",
      description: "Vẽ chi tiết từng đường nét, tính toán tỷ lệ hoàn hảo",
      icon: <BookOpen className="w-8 h-8" />,
      time: "7-10 ngày"
    },
    {
      step: "03",
      title: "Chế Tác Thủ Công",
      description: "Nghệ nhân lành nghề thực hiện từng chi tiết tỉ mỉ",
      icon: <Hammer className="w-8 h-8" />,
      time: "30-45 ngày"
    },
    {
      step: "04",
      title: "Hoàn Thiện Cao Cấp",
      description: "Sơn PU nhiều lớp, đánh bóng mirror tạo độ bền vượt trội",
      icon: <Sparkles className="w-8 h-8" />,
      time: "5-7 ngày"
    }
  ];

  const testimonials = [
    {
      name: "Ông Nguyễn Văn Minh",
      role: "Chủ tịch HĐQT Công ty BĐS Minh Khang",
      content: "Sản phẩm thực sự là tác phẩm nghệ thuật. Chất lượng vượt ngoài mong đợi, xứng đáng với từng đồng chi trả.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      purchase: "Kệ Tivi Gỗ Hương Đỏ - 45 triệu"
    },
    {
      name: "Bà Trần Thị Hoa",
      role: "Giám đốc Spa & Resort Luxury",
      content: "Tôi đã tìm mãi mới có được sản phẩm ưng ý như vậy. Thợ tư vấn rất chuyên nghiệp, giao hàng đúng hẹn.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      purchase: "Kệ Tivi Gỗ Gụ - 38 triệu"
    },
    {
      name: "Ông Lê Quang Dũng",
      role: "Kiến trúc sư nội thất cao cấp",
      content: "Là người làm trong ngành, tôi rất khó tính về chất lượng. Nhưng sản phẩm ở đây thật sự làm tôi ấn tượng.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      purchase: "Kệ Tivi Gỗ Cẩm Lai - 52 triệu"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % showcaseProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [showcaseProducts.length]);

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl shadow-lg sticky top-0">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between py-3 text-sm border-b border-amber-100">
            <div className="flex items-center space-x-6 text-gray-700">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span className="font-medium">Hotline VIP: 0123.456.789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>Miễn phí tư vấn & thiết kế 3D</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-amber-700 font-medium">
              <Crown className="w-4 h-4" />
              <span>Showroom: 456 Đường Nghệ Thuật Gỗ, Q1, HCM</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Nội Thất
                </span>
                <span className="text-gray-800 ml-2">Hoàng Gia</span>
              </div>
              <div className="hidden lg:block w-px h-8 bg-amber-300"></div>
              <div className="hidden lg:block text-sm text-gray-600">
                <div className="font-semibold text-amber-700">Thủ Công Cao Cấp</div>
                <div className="text-xs">Since 1995</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'Trang Chủ', href: '#' },
                { name: 'Bộ Sưu Tập', href: '#showcase' },
                { name: 'Quy Trình Chế Tác', href: '#process' },
                { name: 'Showroom', href: '#' },
                { name: 'Về Chúng Tôi', href: '#' },
                { name: 'Liên Hệ', href: '#' }
              ].map((item) => (
                <a key={item.name} href={item.href} className="relative text-gray-700 hover:text-amber-700 font-semibold transition-colors group">
                  {item.name}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-3 text-gray-600 hover:text-amber-600 transition-colors relative group">
                <Heart className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</div>
              </button>
              <button className="p-3 text-gray-600 hover:text-amber-600 transition-colors relative group">
                <ShoppingCart className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">1</div>
              </button>

              <button
                className="lg:hidden p-3 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-amber-100 bg-white/95 backdrop-blur-xl">
              <nav className="flex flex-col space-y-4">
                {['Trang Chủ', 'Bộ Sưu Tập', 'Quy Trình Chế Tác', 'Showroom', 'Về Chúng Tôi', 'Liên Hệ'].map((item) => (
                  <a key={item} href="#" className="text-gray-700 hover:text-amber-700 font-semibold text-lg">{item}</a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="relative z-10 min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-sm font-bold flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>LUXURY COLLECTION 2024</span>
                  </div>
                  <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                    🔥 HOT
                  </div>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent">
                    Nghệ Thuật
                  </span>
                  <br />
                  <span className="text-gray-900">Gỗ Việt</span>
                </h1>

                <div className="text-2xl text-gray-700 leading-relaxed space-y-2">
                  <p className="font-medium">Tuyệt tác kệ tivi gỗ quý hiếm</p>
                  <p className="text-lg text-amber-700">Thủ công truyền thống • Chất lượng hoàng gia</p>
                </div>
              </div>

              {/* Current Product Quick Info */}
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-amber-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-700">ĐANG TRƯNG BÀY</span>
                  </div>
                  <div className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                    {showcaseProducts[currentShowcase].badge}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {showcaseProducts[currentShowcase].name}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {showcaseProducts[currentShowcase].description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-amber-50 rounded-xl p-3">
                    <div className="text-sm text-amber-700 font-semibold">Chất liệu</div>
                    <div className="text-xs text-gray-600">{showcaseProducts[currentShowcase].material}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3">
                    <div className="text-sm text-amber-700 font-semibold">Thời gian</div>
                    <div className="text-xs text-gray-600">{showcaseProducts[currentShowcase].craftTime}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3">
                    <div className="text-sm text-amber-700 font-semibold">Phong cách</div>
                    <div className="text-xs text-gray-600">{showcaseProducts[currentShowcase].style}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-red-600">
                      {showcaseProducts[currentShowcase].price}₫
                    </div>
                    {showcaseProducts[currentShowcase].originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        {showcaseProducts[currentShowcase].originalPrice}₫
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Tiết kiệm</div>
                    <div className="text-lg font-bold text-green-600">
                      {showcaseProducts[currentShowcase].originalPrice &&
                        `${(parseInt(showcaseProducts[currentShowcase].originalPrice.replace(/,/g, '')) - parseInt(showcaseProducts[currentShowcase].price.replace(/,/g, ''))).toLocaleString()}₫`
                      }
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Đặt Hàng Ngay</span>
                  </button>
                  <button className="flex-1 border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3">
                    <Eye className="w-6 h-6" />
                    <span>Xem Chi Tiết</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between text-center">
                <div className="flex items-center space-x-2">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">29+ Năm</div>
                    <div className="text-sm text-gray-600">Kinh nghiệm</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Gem className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">5000+</div>
                    <div className="text-sm text-gray-600">Tác phẩm</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Handshake className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Hài lòng</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Showcase */}
            <div className="relative">
              <div className="relative z-10">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  <img
                    src={showcaseProducts[currentShowcase].image}
                    alt={showcaseProducts[currentShowcase].name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Floating Action Buttons */}
                  <div className="absolute top-6 right-6 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                      <Camera className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                      <Share2 className="w-6 h-6 text-gray-700" />
                    </button>
                    <button className="p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                      <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <button className="p-6 bg-white/90 hover:bg-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-gray-700 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Product Navigation */}
                <div className="flex justify-center mt-8 space-x-4">
                  {showcaseProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentShowcase(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentShowcase 
                          ? 'bg-amber-600 w-12' 
                          : 'bg-gray-300 hover:bg-amber-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl -z-10 opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-3/4 h-3/4 bg-gradient-to-tr from-orange-200 to-red-200 rounded-3xl -z-20 opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Process */}
      <section id="process" className="relative z-10 py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-bold mb-8 text-lg">
              <Hammer className="w-6 h-6 inline mr-2" />
              QUY TRÌNH CHẾ TÁC
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Từ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Nguyên Liệu</span>
              <br />Đến <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tác Phẩm</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Mỗi sản phẩm trải qua hành trình tỉ mỉ, từ việc tuyển chọn gỗ quý đến hoàn thiện cuối cùng,
              tất cả đều được thực hiện bởi những bàn tay nghệ nhân tài hoa.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {craftProcess.map((process, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < craftProcess.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-50 z-0"></div>
                )}

                <div className="relative z-10 text-center group-hover:scale-105 transition-transform duration-300">
                  {/* Step Circle */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-amber-500/50 transition-shadow duration-300">
                      <span className="text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-lg"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex justify-center text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                      {process.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300">
                      {process.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {process.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-amber-400 text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{process.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process CTA */}
          <div className="text-center mt-20">
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-3 mx-auto">
              <Play className="w-7 h-7" />
              <span>Xem Video Quy Trình Chế Tác</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="showcase" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 bg-amber-100 text-amber-800 rounded-full font-bold mb-6">
              <Gem className="w-5 h-5 inline mr-2" />
              BỘ SUU TẬP ĐỈNH CAO
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Tuyệt Tác <span className="text-amber-600">Hoàng Gia</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những kiệt tác được tuyển chọn khắt khe, mang đậm dấu ấn văn hóa Việt Nam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {showcaseProducts.map((product, index) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:-translate-y-4">
                  {/* Product Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Premium Badge */}
                    <div className="absolute top-6 left-6">
                      <div className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                        product.badge === 'ĐỘC QUYỀN' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                        product.badge === 'BESTSELLER' ? 'bg-gradient-to-r from-green-600 to-teal-600' :
                        'bg-gradient-to-r from-red-600 to-orange-600'
                      }`}>
                        {product.badge}
                      </div>
                    </div>

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Premium Actions */}
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-3 px-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                          <Eye className="w-5 h-5" />
                          <span>Xem 3D</span>
                        </button>
                        <button className="p-3 bg-white/90 hover:bg-white rounded-xl transition-all duration-300 hover:scale-105">
                          <Heart className="w-5 h-5 text-gray-700 hover:text-red-500" />
                        </button>
                        <button className="p-3 bg-white/90 hover:bg-white rounded-xl transition-all duration-300 hover:scale-105">
                          <Share2 className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-8">
                    {/* Product Details */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="text-center bg-amber-50 rounded-lg p-3">
                        <div className="text-xs text-amber-700 font-semibold">{product.material}</div>
                      </div>
                      <div className="text-center bg-amber-50 rounded-lg p-3">
                        <div className="text-xs text-amber-700 font-semibold">{product.craftTime}</div>
                      </div>
                      <div className="text-center bg-amber-50 rounded-lg p-3">
                        <div className="text-xs text-amber-700 font-semibold">{product.style}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-8">
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-red-600">{product.price}₫</div>
                        {product.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">{product.originalPrice}₫</div>
                        )}
                      </div>
                      {product.originalPrice && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Tiết kiệm</div>
                          <div className="text-lg font-bold text-green-600">
                            {(parseInt(product.originalPrice.replace(/,/g, '')) - parseInt(product.price.replace(/,/g, ''))).toLocaleString()}₫
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center space-x-3">
                        <ShoppingCart className="w-6 h-6" />
                        <span>Đặt Hàng Ngay</span>
                      </button>
                      <button className="w-full border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3">
                        <Phone className="w-6 h-6" />
                        <span>Tư Vấn Miễn Phí</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 bg-amber-200 text-amber-800 rounded-full font-bold mb-6">
              <Crown className="w-5 h-5 inline mr-2" />
              KHÁCH HÀNG VIP ĐÁNH GIÁ
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Lời Chứng Thực <span className="text-amber-600">Uy Tín</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những phản hồi chân thực từ các khách hàng doanh nhân, kiến trúc sư hàng đầu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 hover:-translate-y-2">
                {/* Stars */}
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 text-center italic">
                  {`"${testimonial.content}"`}
                </blockquote>

                {/* Customer Info */}
                <div className="text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 shadow-lg"
                  />
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-amber-700 font-semibold mb-2">{testimonial.role}</div>
                  <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 inline-block">
                    Đã mua: {testimonial.purchase}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-30 0c0 16.569 13.431 30 30 30s30-13.431 30-30-13.431-30-30-30-30 13.431-30 30z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-bold text-lg">
                <Sparkles className="w-6 h-6 inline mr-3" />
                ưu đãi đặc biệt - chốt deal ngay hôm nay
              </div>

              <h2 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Sở Hữu Ngay
                </span>
                <br />
                <span className="text-white">Tác Phẩm Độc Bản</span>
              </h2>

              <p className="text-2xl text-gray-300 leading-relaxed">
                🎁 <strong className="text-amber-400">Miễn phí thiết kế 3D</strong> •
                🚚 <strong className="text-amber-400">Miễn phí vận chuyển</strong> •
                🛠️ <strong className="text-amber-400">Miễn phí lắp đặt</strong>
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-4">
                <Phone className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span>Gọi Ngay: 0123.456.789</span>
              </button>

              <div className="text-center">
                <div className="text-lg text-gray-400">hoặc</div>
              </div>

              <button className="group border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-4">
                <Mail className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span>Nhận Tư Vấn Miễn Phí</span>
              </button>
            </div>

            <div className="pt-8 text-gray-400">
              <p className="text-lg">
                ⏰ <strong>Chỉ trong tháng này</strong> - Giảm ngay <strong className="text-amber-400">20%</strong> cho đơn hàng đầu tiên
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Nội Thất
                </span>
                <span className="text-white ml-2">Hoàng Gia</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                29 năm chế tác những tuyệt tác gỗ cao cấp, mang đến vẻ đẹp hoàn hảo cho không gian sống Việt Nam.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'YouTube', 'Zalo'].map((social) => (
                  <div key={social} className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                    <span className="text-white font-bold text-sm">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-400">Sản Phẩm Cao Cấp</h3>
              <ul className="space-y-3 text-gray-400">
                {['Kệ Tivi Gỗ Hương', 'Kệ Tivi Gỗ Gụ', 'Kệ Tivi Gỗ Cẩm Lai', 'Kệ Tivi Gỗ Trắc', 'Kệ Tivi Custom'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-400">Dịch Vụ VIP</h3>
              <ul className="space-y-3 text-gray-400">
                {['Thiết Kế 3D Miễn Phí', 'Tư Vấn Phong Thủy', 'Giao Hàng Toàn Quốc', 'Lắp Đặt Chuyên Nghiệp', 'Bảo Hành Trọn Đời'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center space-x-2">
                      <Crown className="w-4 h-4" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-400">Liên Hệ VIP</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Showroom Hoàng Gia</div>
                    <div>456 Đường Nghệ Thuật Gỗ, Quận 1, TP.HCM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">Hotline VIP</div>
                    <div>0123.456.789 (Miễn phí)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div>vip@noithathoanggia.vn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2024 Nội Thất Hoàng Gia. Tất cả quyền được bảo lưu. •
                <span className="text-amber-400 font-semibold"> Thương hiệu được bảo hộ bởi luật sở hữu trí tuệ Việt Nam</span>
              </p>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-amber-400 transition-colors">Chính Sách Bảo Mật</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Điều Khoản Dịch Vụ</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Chính Sách Bảo Hành</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
