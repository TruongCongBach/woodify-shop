export class MediaUploadError extends Error {
  constructor(message: string) {
    super(`Lỗi upload media: ${message}`)
    this.name = 'MediaUploadError'
  }
}
