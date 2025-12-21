export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-3 bg-amber-600/10 backdrop-blur-sm rounded-full border border-amber-400/20 mb-6">
              <span className="text-amber-700 font-semibold text-sm">✨ Câu Chuyện Của Chúng Tôi</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Về Chúng Tôi
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Nội Thất Bách Thảo mang đến những sản phẩm nội thất gỗ tự nhiên bền bỉ,
              tinh tế và sang trọng. Chúng tôi tin rằng mỗi món đồ nội thất không chỉ là vật dụng,
              mà còn là dấu ấn thể hiện phong cách sống và gu thẩm mỹ riêng của từng gia đình Việt.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Story Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
              <div className="text-lg leading-relaxed text-gray-700 space-y-6">
                <p>
                  Nội Thất Bách Thảo ra đời với mong muốn đồng hành cùng khách hàng trong việc kiến tạo
                  không gian sống ấm áp, tiện nghi và mang đậm dấu ấn cá nhân. Chúng tôi chú trọng vào việc
                  lựa chọn nguồn gỗ tự nhiên chất lượng, xử lý kỹ lưỡng để đảm bảo độ bền, độ an toàn và
                  vẻ đẹp nguyên bản của từng sản phẩm.
                </p>

              </div>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                <div className="text-amber-600 text-2xl mb-3">🏆</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chất Lượng Hàng Đầu</h3>
                <p className="text-gray-600">Gỗ tự nhiên tuyển chọn, bền đẹp với thời gian.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="text-blue-600 text-2xl mb-3">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thiết Kế Tinh Tế</h3>
                <p className="text-gray-600">Tối giản, sang trọng, hài hòa với mọi không gian sống.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="text-green-600 text-2xl mb-3">❤️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tận Tâm Phục Vụ</h3>
                <p className="text-gray-600">Luôn đặt sự hài lòng của khách hàng làm trung tâm.</p>
              </div>
            </div>

            {/* Products & Vision Cards */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-amber-600 mr-2">🛋️</span>
                  Sản Phẩm Của Chúng Tôi
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Chúng tôi chuyên cung cấp kệ tivi gỗ xoan, gỗ hương đá, bàn ghế, tủ kệ và nhiều sản phẩm
                  nội thất gia đình khác. Mỗi sản phẩm đều được chế tác thủ công tỉ mỉ bởi những người thợ
                  lành nghề, kết hợp cùng công nghệ sản xuất hiện đại để mang lại sự hoàn hảo trong từng chi tiết.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">🎯</span>
                  Tầm Nhìn
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nội Thất Bách Thảo hướng tới việc trở thành thương hiệu nội thất gỗ uy tín,
                  là lựa chọn hàng đầu của các gia đình Việt khi tìm kiếm sự bền vững, sang trọng
                  và thân thiện với môi trường.
                </p>
              </div>

              {/* Commitments */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-green-600 mr-2">🤝</span>
                  Cam Kết Với Khách Hàng
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Sản phẩm đúng chất lượng gỗ đã cam kết</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Giá thành hợp lý, minh bạch</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Chính sách bảo hành và hậu mãi chu đáo</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Dịch vụ giao hàng nhanh chóng, an toàn</p>
                  </div>
                </div>
              </div>

              {/* Final Message */}
              <div className="text-center bg-amber-50 rounded-2xl p-8 border border-amber-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Với <strong className="text-amber-700">Nội Thất Bách Thảo</strong>, chúng tôi không chỉ mang đến sản phẩm,
                  mà còn trao gửi sự tận tâm và niềm tin. Mỗi ngôi nhà sẽ trở thành tổ ấm ấm cúng,
                  tiện nghi và mang đậm dấu ấn riêng của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
