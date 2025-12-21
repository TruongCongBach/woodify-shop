# AI Product Description Generator

Tính năng tự động tạo mô tả sản phẩm sử dụng Google Gemini AI với SDK chính thức `@google/generative-ai`.

## Dependencies

```bash
pnpm add @google/generative-ai --filter noithatbachthao
```

## Cấu hình

Thêm các biến môi trường sau vào file `.env.local`:

```bash
# Required
GOOGLE_AI_STUDIO_API_KEY=your_google_ai_studio_api_key_here

# Optional (defaults provided)
GOOGLE_AI_MODEL=gemini-1.5-flash
GOOGLE_AI_TEMPERATURE=0.7
GOOGLE_AI_TOP_K=40
GOOGLE_AI_TOP_P=0.95
GOOGLE_AI_MAX_OUTPUT_TOKENS=2048
```

## Cách lấy Google AI Studio API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Tạo API key mới
4. Copy API key và thêm vào file `.env.local`

## Cách sử dụng

1. Trong form tạo/chỉnh sửa sản phẩm, nhập tên sản phẩm
2. Chọn danh mục (tùy chọn)
3. Thêm các thuộc tính sản phẩm (tùy chọn)
4. Nhấn nút "Tạo mô tả với AI" trong tab "Thông tin cơ bản"
5. AI sẽ tự động tạo mô tả ngắn và mô tả chi tiết

## Tính năng

- ✅ **Singleton Pattern**: Google AI instance được tái sử dụng hiệu quả
- ✅ **Configurable**: Tất cả AI parameters có thể config qua environment variables
- ✅ **Prompt Builder**: Structured prompt generation với reusable functions
- ✅ **Model Optimization**: Gemini 1.5 Flash với cấu hình tối ưu
- ✅ **Type Safety**: Full TypeScript support với proper error handling
- ✅ **Tự động tạo mô tả ngắn** (150 ký tự)
- ✅ **Tự động tạo mô tả chi tiết** (200-500 từ)
- ✅ **Tích hợp thông tin danh mục và thuộc tính**
- ✅ **Phong cách viết phù hợp với thị trường nội thất Việt Nam**
- ✅ **UI/UX thân thiện** với icon và màu sắc đặc biệt
- ✅ **Error handling và loading states**
- ✅ **Safety settings** để đảm bảo nội dung phù hợp

## Cấu trúc Files

```
src/
├── components/product-form/
│   ├── AIDescriptionGenerator.tsx         # Component UI chính
│   └── index.tsx                          # Tích hợp vào ProductForm
├── lib/
│   └── google-ai.ts                       # Singleton Google AI service
├── services/ai/
│   ├── generate-product-description.ts           # Client-side service
│   └── generate-product-description-server.ts   # Server-side service
├── utils/
│   └── ai-prompt-builder.ts               # Structured prompt generation
├── app/api/ai/generate-description/
│   └── route.ts                           # API endpoint
└── config/
    └── index.ts                           # Cấu hình Google AI với full config
```

## API Response Format

```json
{
  "shortDescription": "Mô tả ngắn gọn về sản phẩm...",
  "description": "Mô tả chi tiết đầy đủ về sản phẩm, tính năng, chất liệu và ưu điểm..."
}
```

## Bảo mật

- API key được lưu trữ trên server-side
- Client chỉ gọi API endpoint nội bộ
- Không expose API key ra ngoài client

## Error Handling

- Kiểm tra tên sản phẩm trước khi gọi API
- Thông báo lỗi chi tiết cho user
- Fallback parsing nếu JSON response không hợp lệ
- Loading states để UX tốt hơn
