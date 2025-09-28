import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính Sách Đổi Trả',
  description: 'Chính sách đổi trả hàng hóa của Nội Thất Bách Thảo - Quy định về việc đổi, trả sản phẩm nội thất gỗ',
  keywords: ['chính sách đổi trả', 'đổi trả nội thất', 'bảo hành nội thất gỗ', 'quy định đổi trả'],
};

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Intro */}
      <section className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Chính Sách Đổi Trả</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nội Thất Bách Thảo cam kết mang đến sự hài lòng tuyệt đối cho khách hàng.
          Chính sách đổi trả linh hoạt và minh bạch để đảm bảo quyền lợi của quý khách.
        </p>
      </section>

      {/* Full Content */}
      <div className="space-y-8 text-lg leading-relaxed text-gray-800">
        
        {/* Điều kiện đổi trả */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Điều Kiện Đổi Trả</h2>
          <div className="space-y-4">
            <p>
              <strong>Thời gian đổi trả:</strong> Trong vòng <span className="text-red-600 font-semibold">7 ngày</span> kể từ ngày nhận hàng đối với sản phẩm có lỗi từ nhà sản xuất.
            </p>
            <p>
              <strong>Điều kiện sản phẩm:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Sản phẩm còn nguyên vẹn, không bị hư hỏng do sử dụng</li>
              <li>Còn đầy đủ phụ kiện, bao bì, giấy tờ đi kèm</li>
              <li>Không có dấu hiệu sử dụng, trầy xước do khách hàng</li>
              <li>Sản phẩm không bị ảnh hưởng bởi nước, hóa chất</li>
            </ul>
          </div>
        </section>

        {/* Các trường hợp được đổi trả */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Các Trường Hợp Được Đổi Trả</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Lỗi từ nhà sản xuất:</strong> Sản phẩm bị lỗi kỹ thuật, hư hỏng từ quá trình sản xuất</li>
              <li><strong>Giao sai sản phẩm:</strong> Không đúng mẫu mã, kích thước như đã đặt hàng</li>
              <li><strong>Hư hỏng trong vận chuyển:</strong> Sản phẩm bị hỏng do quá trình vận chuyển</li>
              <li><strong>Thiếu phụ kiện:</strong> Sản phẩm thiếu linh kiện, phụ kiện theo tiêu chuẩn</li>
            </ul>
          </div>
        </section>

        {/* Các trường hợp không được đổi trả */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Các Trường Hợp Không Được Đổi Trả</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <ul className="list-disc list-inside space-y-2">
              <li>Sản phẩm đã qua sử dụng hoặc lắp đặt</li>
              <li>Hư hỏng do sử dụng sai cách, bảo quản không đúng</li>
              <li>Trầy xước, móp méo do khách hàng gây ra</li>
              <li>Sản phẩm đặt theo yêu cầu riêng (custom)</li>
              <li>Quá thời hạn quy định (7 ngày)</li>
              <li>Không còn hóa đơn, chứng từ mua hàng</li>
            </ul>
          </div>
        </section>

        {/* Quy trình đổi trả */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Quy Trình Đổi Trả</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">1</div>
              <div>
                <h3 className="font-semibold">Liên hệ thông báo</h3>
                <p>Gọi hotline hoặc nhắn tin thông báo việc đổi trả trong vòng 7 ngày</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">2</div>
              <div>
                <h3 className="font-semibold">Kiểm tra điều kiện</h3>
                <p>Nhân viên sẽ hướng dẫn kiểm tra tình trạng sản phẩm và xác nhận điều kiện đổi trả</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">3</div>
              <div>
                <h3 className="font-semibold">Vận chuyển</h3>
                <p>Chúng tôi sẽ đến lấy hàng tại nhà khách hàng (trong khu vực hỗ trợ)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">4</div>
              <div>
                <h3 className="font-semibold">Xử lý và hoàn tiền</h3>
                <p>Sau khi kiểm tra, chúng tôi sẽ đổi sản phẩm mới hoặc hoàn tiền trong 3-5 ngày làm việc</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chi phí đổi trả */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Chi Phí Đổi Trả</h2>
          <div className="bg-yellow-50 p-6 rounded-lg space-y-3">
            <p><strong>Lỗi từ nhà sản xuất:</strong> Nội Thất Bách Thảo chịu toàn bộ chi phí vận chuyển</p>
            <p><strong>Khách hàng đổi ý:</strong> Khách hàng chịu chi phí vận chuyển 2 chiều</p>
            <p><strong>Hoàn tiền:</strong> Phí giao dịch ngân hàng (nếu có) sẽ được trừ vào số tiền hoàn lại</p>
          </div>
        </section>

        {/* Thông tin liên hệ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Thông Tin Liên Hệ</h2>
          <div className="bg-gray-100 p-6 rounded-lg space-y-3">
            <p><strong>Hotline hỗ trợ:</strong> <a href="tel:0347373891" className="text-blue-600 hover:underline">0347373891</a></p>
            <p><strong>Email:</strong> <a href="mailto:support@noithatbachthao.com" className="text-blue-600 hover:underline">support@noithatbachthao.com</a></p>
            <p><strong>Thời gian hỗ trợ:</strong> 8:00 - 18:00 (Thứ 2 - Thứ 7)</p>
            <p><strong>Địa chỉ (cũ):</strong> Châu Phong, Liên Hà, Hà Nội</p>
            <p><strong>Địa chỉ (mới):</strong> Châu Phong, Thư Lâm, Hà Nội</p>
          </div>
        </section>

        {/* Cam kết */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">Cam Kết Của Chúng Tôi</h2>
          <p className="text-blue-800 leading-relaxed">
            Nội Thất Bách Thảo luôn đặt quyền lợi và sự hài lòng của khách hàng lên hàng đầu. 
            Chúng tôi cam kết xử lý mọi yêu cầu đổi trả một cách nhanh chóng, minh bạch và công bằng. 
            Mọi thắc mắc về chính sách đổi trả, quý khách vui lòng liên hệ để được tư vấn chi tiết.
          </p>
        </section>

      </div>
    </div>
  );
}
