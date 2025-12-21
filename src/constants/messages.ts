// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Trường này là bắt buộc',
  INVALID_URL: 'URL không hợp lệ',
  INVALID_EMAIL: 'Email không hợp lệ',
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  MIN_LENGTH: (min: number) => `Tối thiểu ${min} ký tự`,
  MAX_LENGTH: (max: number) => `Tối đa ${max} ký tự`,
  INVALID_PRICE: 'Giá phải là số dương',
} as const

// UI Messages
export const UI_MESSAGES = {
  LOADING: 'Đang tải...',
  PROCESSING: 'Đang xử lý...',
  SUCCESS: 'Thành công!',
  ERROR: 'Có lỗi xảy ra',
  NO_DATA: 'Không có dữ liệu',
  CONFIRM_DELETE: 'Bạn có chắc chắn muốn xóa?',
  SAVE_SUCCESS: 'Lưu thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  DELETE_SUCCESS: 'Xóa thành công',
} as const

// Button Labels
export const BUTTON_LABELS = {
  SAVE: 'Lưu',
  UPDATE: 'Cập nhật',
  DELETE: 'Xóa',
  CANCEL: 'Hủy',
  CONFIRM: 'Xác nhận',
  CLOSE: 'Đóng',
  VIEW_ALL: 'Xem tất cả',
  LOAD_MORE: 'Tải thêm',
  RETRY: 'Thử lại',
} as const
